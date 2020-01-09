var controllers = require("../controllers/index");

module.exports = function(router) {
  router.post("/login", controllers.login);
  router.post("/register", controllers.register);
  router.post("/logout", controllers.logout);
  router.post("/nodes", controllers.addNode);
  router.get("/print", controllers.printChain);
  router.post("/transaction", controllers.addTransaction);
  router.get("/chain", controllers.getChain);
};
