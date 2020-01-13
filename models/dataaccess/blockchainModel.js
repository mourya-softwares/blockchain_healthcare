const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const BlockChainSchema = new Schema(
  {
    index: Number,
    transaction: [
      {
        doctor: String,
        patient: String,
        details: String,
        timestamp: { type: Date, default: Date.now() }
      }
    ],
    previousBlockHash: String,
    proof: Number
  },
  { timestamps: true }
);

module.exports = mongoose.model("BlockChainModel", BlockChainSchema);
