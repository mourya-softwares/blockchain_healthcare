let Block = require("./block");
const actions = require("../constants/actions");
let Transaction = require("./transaction");
const { generateProof, isProofValid } = require("../utils/proof");

class BlockChain {
  constructor(blocks, io) {
    this.blocks = blocks || [new Block(0, new Transaction(), 1, 0)];
    this.nodes = [];
    this.io = io;
  }

  addNode(node) {
    this.nodes.push(node);
  }

  mineBlock(block) {
    this.blocks.push(block);
    console.log("Mined Successfully");
    this.io.emit(actions.END_MINING, this.toArray());
  }

  async newTransaction(transaction) {
    console.log("transaction started", process.env.BREAK, "break");
    console.info("Starting mining block...");
    const previousBlock = this.lastBlock();
    process.env.BREAK = false;
    const block = new Block(
      previousBlock.getIndex() + 1,
      transaction,
      previousBlock.getProof(),
      previousBlock.hashValue()
    );
    console.log("generate proof");
    const { proof, dontMine } = await generateProof(previousBlock.getProof());
    console.log("set proof");
    block.setProof(proof);
    console.log("proof done");
    if (dontMine !== "true") {
      this.mineBlock(block);
    }
  }

  lastBlock() {
    return this.blocks[this.blocks.length - 1];
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
        return false;
      }
      if (!isProofValid(previousBlock.getProof(), currentBlock.getProof())) {
        return false;
      }
      previousBlock = currentBlock;
    }
    return true;
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
      console.warn(block);
      return block.getDetails();
    });
  }
  printBlocks() {
    this.blocks.forEach(block => console.log(block));
  }
}

module.exports = BlockChain;
