const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    userId: Number,
    name: String,
    password: String,
    role: Number,
    registeredOn: { type: Date, default: Date.now() }
  },
  { timestamps: true }
);

module.exports = mongoose.model("UserModel", UserSchema);
