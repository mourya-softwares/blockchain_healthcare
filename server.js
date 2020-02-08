require("dotenv").config();
const globals = require("./globals");
//const cluster = globals.cluster();
//const os = require("os").cpus().length;
let blockChain = require("./utils/initializeBlockChain").blockChain;
let app = globals.app;
let httpServer = globals.httpServer;
let io = globals.io;
let router = globals.router;
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
require("./config/dbconnection");

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const properties = require("./config/properties");
const healthcareRouters = require("./routes/index");

const listeners = require("./utils/listeners");
const client = require("socket.io-client");

router.use(function(req, res, next) {
  //console.log(`The Worker number: ${cluster.worker.id} in route`);
  next();
});

app.use(router);
healthcareRouters(router);

if (process.env.NODE_ENV === "production") {
  app.use(globals.express.static("client/build"));

  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

io.on("connection", socket => {
  console.info(`Socket connected, ID: ${socket.id}`);
  socket.on("disconnect", reason => {
    console.log(`Socket disconnected, ID: ${socket.id} Reason: ${reason}`);
  });
});

blockChain.addNode(
  listeners(client(`http://localhost:${properties.PORT}`), blockChain.get())
);

/*if (cluster.isMaster) {
  for (let i = 0; i < os; i++) {
    cluster.fork();
  }

  cluster.on("exit", worker => {
    console.log(`The Worker number: ${worker.id} has died`);
  });
} else {*/
httpServer.listen(properties.PORT, () => {
  console.log("connected on port: " + properties.PORT);
  //console.log(`The Worker number: ${cluster.worker.id} is running`);
});
//}
