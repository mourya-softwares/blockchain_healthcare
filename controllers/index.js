const globals = require('../globals');
const listeners = require('../utils/listeners');
const client = require('socket.io-client');
const actions = require("../constants/actions");
const axios = require('axios');
const io = globals.io;
let blockChain = globals.blockChain;

exports.login = function( req, res, next){
	res.send("Login Page");
}

exports.logout = function( req, res, next){
	res.send("Logout Page");
}

exports.addNode = function( req, res){
	const {host, port} = req.body;
	const {callback} = req.query;
	const node = `http://${host}:${port}`;
	const socketNode = listeners(client(node), blockChain);
	blockChain.addNode(socketNode, blockChain);
	if(callback === 'true'){
		console.info(`Added node ${node} back`);
		res.json({status: 'Added node Back'}).end();
	} else {
		axios.post(`${node}/nodes?callback=true`, {
	      host: req.hostname,
	      port: 4001,
	    });
	    console.info(`Added node ${node}`);
    	res.json({ status: 'Added node' }).end();
	}
}

exports.addTransaction = function(req, res){
	const {doctor, patient, details} = req.body;
	io.emit(actions.ADD_TRANSACTION, doctor, patient, details);
	res.json({message: 'transaction success'}).end();
}

exports.getChain = function(req, res){
	res.json(blockChain.toArray()).end();
}