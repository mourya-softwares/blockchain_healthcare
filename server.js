const globals = require('./globals');
let app = globals.app;
let httpServer = globals.httpServer;
let io = globals.io;
let router = globals.router;
let blockChain = globals.blockChain;

const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');

const jwtAuth = require('./auth/jwtAuth');
const properties = require("./config/properties");
const healthcareRouters = require("./routes/index");

const listeners = require('./utils/listeners');
const client = require('socket.io-client');

app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

router.use(function(req, res, next){
	if(req.url.toString().includes("login")){
		jwtAuth.assignJWT(req, res);
	} else {
		jwtAuth.verifyJWT(req, res);
	}
	next();
})

app.use(router);
healthcareRouters(router);

io.on('connection', socket => {
	console.info(`Socket connected, ID: ${socket.id}`);
	socket.on('disconnect', () => {
		console.log(`Socket disconnected, ID: ${socket.id}`);
	});
});

blockChain.addNode(listeners(client(`http://localhost:${properties.PORT}`), blockChain));

httpServer.listen(properties.PORT, () => {console.log("connected on port: "+properties.PORT)})