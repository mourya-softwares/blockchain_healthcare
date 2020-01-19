const globals = require("../globals");
const listeners = require("../utils/listeners");
const client = require("socket.io-client");
const actions = require("../constants/actions");
const jwtAuth = require("../auth/jwtAuth");
const userrepo = require("../dal/userrepo");
const chainRepo = require("../dal/chainRepo");
const io = globals.io;
let blockChain = require("../utils/initializeBlockChain").blockChain;
exports.login = async function(req, res, next) {
  let result = await userrepo.authenticateUser(
    req.body.username,
    req.body.password
  );
  if (result.success) {
    jwtAuth.assignJWT(req, res);
  }
  return res.json(result).end();
};

exports.register = async function(req, res, next) {
  var result = await userrepo.registerUser(req.body);
  return res.json(result).end();
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

exports.getChain = async function(req, res) {
  let chain = await chainRepo.getChain();
  if (chain.success && chain.results.length > 1)
    return res.json(chain.results.splice(1)).end();
  else if (chain.success)
    return res.json({ success: chain.success, message: "No Data Found!!!" });
  else return res.json({ success: false, message: "No Data Found!!!" });
};
