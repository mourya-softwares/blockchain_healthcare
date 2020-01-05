var express = require("express");
var app = express();
var httpServer = require('http').Server(app);
var io = require('socket.io')(httpServer);
var router = express.Router();
let BlockChain = require("./models/chain");
let blockChain = new BlockChain(null, io);

exports.router = router;
exports.app = app;
exports.io = io;
exports.httpServer = httpServer;
exports.blockChain = blockChain;