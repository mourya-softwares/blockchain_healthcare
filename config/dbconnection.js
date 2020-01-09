const mongoose = require("mongoose");

const dbRoute =
  "mongodb+srv://vijay:vijaymourya@cluster0-nsvjo.mongodb.net/test?retryWrites=true&w=majority";

mongoose.connect(dbRoute, { useUnifiedTopology: true, useNewUrlParser: true });

const db = mongoose.connection;
db.once("open", () => console.log("connected to the database"));
db.on("error", console.error.bind(console, "MongoDB connection error:"));

exports.db = {
  get: function() {
    return db;
  }
};
