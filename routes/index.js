var controllers = require("../controllers/index");

module.exports = function(router){
	router.post("/login", controllers.login);
	router.post("/logout", controllers.logout);
}