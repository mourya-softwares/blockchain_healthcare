const Transaction = require("./transaction");

class Block {
	constructor(index, transaction, previousProof, previousBlockHash){
		this.index = index;
		this.transaction = transaction;
		this.previousBlockHash = previousBlockHash;
		this.previousProof = previousProof;
		this.timestamp = Date.now();
	}
	hashValue(){
		const {index, proof, transaction, timestamp} = this;
		const blockString = `${index}-${proof}-${JSON.stringify(transaction)}-${timestamp}`;
		const hashFunction = crypto.createHash('sha256');
		hashFunction.update(blockString);
		return hashFunction.digest('hex');
	}
	setProof(proof){
		this.proof = proof;
	}
	getProof(proof){
		return this.proof;
	}
	getIndex(){
		return this.index;
	}
	getPreviousBlockHash(){
		return this.previousBlockHash;
	}
	getDetails(){
		const {index, proof, previousBlockHash, transactions, timestamp} = this;
		return {
			index, 
			proof, 
			previousBlockHash, 
			transactions: transactions.map(transaction => transaction.getDetails()), 
			timestamp
		}
	}
	parseBlock(block){
		this.index = block.index;
		this.proof = block.proof;
		this.previousBlockHash = block.previousBlockHash;
		this.timestamp = block.timestamp;
		this.transactions = block.transactions.map(transaction => {
			const parsedTransaction = new Transaction();
			parsedTransaction.parseTransaction(transaction);
			return parsedTransaction;
		})
	}
	printTransaction(){
		this.transactions.forEach(transaction => console.log(transaction));
	}
}

module.exports = Block;