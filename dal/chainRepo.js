const BlockChainModel = require("../models/mongoose/blockchainModel");

exports.getChain = async function(query = {}, fields = {}) {
  try {
    let results = await BlockChainModel.find(query, fields);
    if (!results) {
      return { success: false };
    }
    return { success: true, results };
  } catch (err) {
    return { success: false, error: err };
  }
};

exports.addBlock = async function({
  index,
  transaction,
  previousBlockHash,
  proof,
  timestamp
}) {
  try {
    let blockChainModel = new BlockChainModel({
      index,
      transaction,
      previousBlockHash,
      proof,
      timestamp
    });
    let result = await blockChainModel.save();
    if (result.errors) return { success: false, error: result.errors };
    return {
      success: true
    };
  } catch (err) {
    return {
      success: false,
      error: err
    };
  }
};
