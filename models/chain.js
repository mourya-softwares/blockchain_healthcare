let Block = require("./block");
const actions = require("../constants/actions");
let Transaction = require("./transaction");
const chainRepo = require("../dal/chainRepo");
//const globals = require("../globals");
//const cluster = globals.cluster();

const { generateProof, isProofValid } = require("../utils/proof");

const GenesisBlock = new Block(0, new Transaction(), 1, 0); // The first block of the blockchain

class BlockChain {
  constructor(blocks, io) {
    this.blocks = blocks || [GenesisBlock];
    this.nodes = [];
    this.io = io;
  }

  async getChain() {
    let results = await chainRepo.getChain({});
    if (results.success)
      this.blocks = results.results.map(obj => {
        let block = new Block();
        block.parseBlock(obj.toJSON());
        return block;
      });
    else this.blocks = GenesisBlock;
    return this.blocks;
  }

  addNode(node) {
    this.nodes.push(node);
  }

  mineBlock(block, chain) {
    this.blocks.push(block);
    console.log("Mined Successfully");
    this.io.emit(actions.END_MINING, {
      newChain: this.toArray(),
      newBlock: block
    });
  }

  async newTransaction(transaction) {
    console.info("Starting mining block...");
    const chain = await this.getChain();
    const previousBlock = await this.lastBlock();
    process.env.BREAK = false;
    const block = new Block(
      previousBlock.getIndex() + 1,
      transaction,
      previousBlock.getProof(),
      previousBlock.hashValue()
    );
    console.log("generate proof");
    const { proof, dontMine } = await generateProof(previousBlock.getProof());
    block.setProof(proof);
    console.log("proof done");
    if (dontMine !== "true") {
      this.mineBlock(block);
    }
  }

  async lastBlock() {
    if (this.blocks && this.blocks.length > 0) {
      return this.blocks[this.blocks.length - 1];
    }
    let result = await chainRepo.addBlock(GenesisBlock);
    result.success && (this.blocks = [GenesisBlock]);
    return GenesisBlock;
  }

  getLength() {
    return this.blocks.length;
  }

  checkValidity() {
    const { blocks } = this;
    let previousBlock = blocks[0];
    for (let index = 1; index < blocks.length; index++) {
      const currentBlock = blocks[index];
      if (currentBlock.getPreviousBlockHash() !== previousBlock.hashValue()) {
        return { success: false, alteredBlock: currentBlock };
      }
      if (!isProofValid(previousBlock.getProof(), currentBlock.getProof())) {
        return { success: false, alteredBlock: currentBlock };
      }
      if (currentBlock.index !== previousBlock.index + 1) {
        return { success: false, alteredBlock: currentBlock };
      }
      previousBlock = currentBlock;
    }
    return { success: true };
  }

  parseChain(blocks) {
    this.blocks = blocks.map(block => {
      const parsedBlock = new Block(0);
      parsedBlock.parseBlock(block);
      return parsedBlock;
    });
  }
  toArray() {
    return this.blocks.map(block => {
      return block.getDetails();
    });
  }
  printBlocks() {
    this.blocks.forEach(block => console.log(block));
  }
}

module.exports = BlockChain;
