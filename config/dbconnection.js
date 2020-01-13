const mongoose = require("mongoose");

const dbRoute = process.env.MONGO_API;

mongoose.connect(dbRoute, { useUnifiedTopology: true, useNewUrlParser: true });

const db = mongoose.connection;
db.once("open", () => console.log("connected to the database"));
db.on("error", console.error.bind(console, "MongoDB connection error:"));

exports.db = {
  get: function() {
    return db;
  }
};
