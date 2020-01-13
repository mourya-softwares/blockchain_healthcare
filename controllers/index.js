const globals = require("../globals");
const listeners = require("../utils/listeners");
const client = require("socket.io-client");
const actions = require("../constants/actions");
const jwtAuth = require("../auth/jwtAuth");
const UserModel = require("../models/dataaccess/usermodel");
const io = globals.io;
let blockChain = require("../utils/initializeBlockChain").blockChain;
exports.login = function(req, res, next) {
  UserModel.findOne(
    { name: req.body.username, password: req.body.password },
    (err, data) => {
      if (err || !data)
        return res.json({ success: false, message: "invalid credentials" });
      jwtAuth.assignJWT(req, res);
      return res.json({ name: data.name, id: data.userId });
    }
  );
};

exports.register = function(req, res, next) {
  let userModel = new UserModel({
    userId: 1,
    name: req.body.name,
    username: req.body.username,
    password: req.body.password,
    role: 1
  });
  userModel.save(err => {
    if (err) return res.json({ success: false, error: err });
    return res.json({
      success: true,
      name: req.body.name
    });
  });
};

exports.logout = function(req, res, next) {
  res.clearCookie("token");
  res.json({ success: true, message: "Successfully Logout!" });
};

exports.printChain = function(req, res) {
  let b = blockChain.get();
  b.printBlocks();
  res.status(200).end();
};

exports.addNode = function(req, res) {
  var result = jwtAuth.verifyJWT(req, res);
  if (result.status == 200) {
    const { host, port } = req.body;
    const node = `http://${host}:${port}`;
    const socketNode = listeners(client(node), blockChain.get());
    blockChain.addNode(socketNode);
    res.json({ status: "Added node Back" }).end();
  } else {
    res.json(result).end();
  }
};

exports.addTransaction = function(req, res) {
  /*Todo handle jwt auth*/
  let result = jwtAuth.verifyJWT(req, res);
  if (result.status !== 200) return res.json(result);
  const { doctor, patient, details } = req.body;
  io.emit(actions.ADD_TRANSACTION, doctor, patient, details);
  res.json({ message: "transaction success" }).end();
};

exports.getChain = function(req, res) {
  res.json(blockChain.get().toArray()).end();
};
