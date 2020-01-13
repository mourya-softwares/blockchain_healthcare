const io = require("../globals").io;
let BlockChain = require("../models/chain");
let blockChain = new BlockChain(null, io);

exports.blockChain = {
  get: function() {
    return blockChain;
  },
  addNode: function(socketNode) {
    blockChain.addNode(socketNode);
    console.log(blockChain);
  }
};
