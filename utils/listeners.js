const actions = require("../constants/actions");

const Transaction = require("../models/transaction");
const BlockChain = require("../models/chain");

const listeners = (socket, chain) => {
  socket.on(actions.ADD_TRANSACTION, (doctor, patient, details) => {
    const transaction = new Transaction(doctor, patient, details);
    chain.newTransaction(transaction);
    console.info(
      `Added transaction: ${JSON.stringify(
        transaction.getDetails(),
        null,
        "\t"
      )}`
    );
  });

  socket.on(actions.END_MINING, newChain => {
    console.log("End Mining encountered");
    process.env.Break = true;
    const blockChain = new BlockChain();
    blockChain.parseChain(newChain);
    if (
      blockChain.checkValidity() &&
      blockChain.getLength() >= chain.getLength()
    ) {
      chain.blocks = blockChain.blocks;
    }
  });

  return socket;
};

module.exports = listeners;
