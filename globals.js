var express = require("express");
var app = express();
var httpServer = require("http").Server(app);
var io = require("socket.io")(httpServer);
var router = express.Router();
//let cluster = require("cluster");

exports.router = router;
exports.app = app;
/*exports.cluster = () => {
  return cluster;
};*/
exports.io = io;
exports.httpServer = httpServer;
