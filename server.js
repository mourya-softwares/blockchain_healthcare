var express = require("express");
var bodyParser = require("body-parser");
var cookieParser = require('cookie-parser');

var jwtAuth = require('./auth/jwtAuth');
var properties = require("./config/properties");
var healthcareRouters = require("./routes/index");

var app = express();
var router = express.Router();

app.use(cookieParser());

// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

router.use(function(req, res, next){
	if(req.url.toString().includes("login")){
		jwtAuth.assignJWT(req, res);
	} else {
		jwtAuth.verifyJWT(req);
	}
	next();
})
app.use(router);
healthcareRouters(router);
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.listen(properties.PORT, () => {console.log("connected on port: "+properties.PORT)})