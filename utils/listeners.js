const actions = require("../constants/actions");
//const cluster = require("../globals").cluster();
const Transaction = require("../models/transaction");
const BlockChain = require("../models/chain");
const chainRepo = require("../dal/chainRepo");

const listeners = (socket, chain) => {
  socket.on(actions.ADD_TRANSACTION, (doctor, patient, details) => {
    const transaction = new Transaction(doctor, patient, details);
    chain.newTransaction(transaction);
    /*  console.info(
      `Added transaction: ${JSON.stringify(
        transaction.getDetails(),
        null,
        "\t"
      )}`
    );*/
  });

  socket.on(actions.END_MINING, async ({ newChain, newBlock }) => {
    console.log("End Mining encountered");
    process.env.Break = true;
    const blockChain = new BlockChain();
    blockChain.parseChain(newChain);
    var validity = blockChain.checkValidity();
    if (validity.success && blockChain.getLength() >= chain.getLength()) {
      chain.blocks = blockChain.blocks;
      await chainRepo.addBlock(newBlock);
      //TODO: save newBlock in db
    } else {
      console.log("altered Block", validity.alteredBlock);
    }
  });

  return socket;
};

module.exports = listeners;
