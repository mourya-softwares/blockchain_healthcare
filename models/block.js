const Transaction = require("./transaction");
const crypto = require("crypto");
class Block {
  constructor(index, transaction, proof, previousBlockHash) {
    this.index = index;
    this.transaction = transaction;
    this.previousBlockHash = previousBlockHash;
    this.proof = proof;
    this.timestamp = Date.now();
  }
  hashValue() {
    const { index, proof, transaction, timestamp } = this;
    const blockString = `${index}-${proof}-${JSON.stringify(
      transaction
    )}-${timestamp}`;
    const hashFunction = crypto.createHash("sha256");
    hashFunction.update(blockString);
    return hashFunction.digest("hex");
  }
  setProof(proof) {
    this.proof = proof;
  }
  getProof() {
    return this.proof;
  }
  getIndex() {
    return this.index;
  }
  getPreviousBlockHash() {
    return this.previousBlockHash;
  }
  getDetails() {
    const { index, proof, previousBlockHash, transaction, timestamp } = this;
    return {
      index,
      proof,
      previousBlockHash,
      transaction: transaction.getDetails(),
      timestamp
    };
  }
  parseBlock(block) {
    this.index = block.index;
    this.proof = block.proof;
    this.previousBlockHash = block.previousBlockHash;
    this.timestamp = block.timestamp;
    const parsedTransaction = new Transaction();
    parsedTransaction.parseTransaction(block.transaction);
    this.transaction = parsedTransaction;
  }
  printTransaction() {
    console.log(this.transaction);
  }
}

module.exports = Block;
