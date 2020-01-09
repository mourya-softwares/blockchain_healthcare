const globals = require("../globals");
const listeners = require("../utils/listeners");
const client = require("socket.io-client");
const actions = require("../constants/actions");
const jwtAuth = require("../auth/jwtAuth");
const UserModel = require("../models/dataaccess/usermodel");
const io = globals.io;
let blockChain = globals.blockChain;

exports.login = function(req, res, next) {
  UserModel.findOne(
    { name: req.body.doctor, password: req.body.doctor },
    (err, data) => {
      if (err || data)
        return res.json({ success: false, message: "invalid credentials" });
      return res.json({ user: data.name, id: data.userId });
    }
  );
};

exports.register = function(req, res, next) {
  let userModel = new UserModel({
    userId: 1,
    name: req.body.doctor,
    password: req.body.doctor,
    role: 1
  });
  userModel.save(err => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, req: req.body.doctor });
  });
};

exports.logout = function(req, res, next) {
  res.cookie("token", null);
  res.json({ success: true, message: "Successfully Logout!" });
};

exports.printChain = function(req, res) {
  let b = blockChain.get();
  b.printBlocks();
  console.log(b.nodes, b.currentTransactions);
  res.status(200);
};

exports.addNode = function(req, res) {
  jwtAuth.verifyJWT(req, res);
  const { host, port } = req.body;
  const { callback } = req.query;
  const node = `http://${host}:${port}`;
  const socketNode = listeners(client(node), blockChain.get());
  blockChain.addNode(socketNode);
  // console.log("-----------block", req.body);
  //if (callback === "true") {
  //console.info(`Added node ${node} back`);
  res.json({ status: "Added node Back" }).end();
  /* } else {
    console.log(`${node}/nodes?callback=true`);
    axios.post(`${node}/nodes?callback=true`, {
      host: req.hostname,
      port: 4001
    });
    //console.info(`Added node ${node}`);
    //res.json({ status: "Added node" }).end();
  }*/
};

exports.addTransaction = function(req, res) {
  /*Todo handle jwt auth*/
  let payload = jwtAuth.verifyJWT(req, res);
  if (payload.status !== 200)
    return res.json({ message: "unauthorised login" }).end();
  const { doctor, patient, details } = req.body;
  io.emit(actions.ADD_TRANSACTION, doctor, patient, details);
  res.json({ message: "transaction success" }).end();
};

exports.getChain = function(req, res) {
  //console.log(blockChain.get());
  res.json(blockChain.get().toArray()).end();
};
