process.env.NODE_CONFIG_DIR= __dirname +"/../config";
const config = require("config");
const restify = require("restify");
const corsMiddleware = require("restify-cors-middleware")
const firebaseAdmin = require("firebase-admin");
const serviceAccount = require(config.get("firebase.secretKeyPath"));
const phrasesRouter = require (__dirname+"/routers/phrases.js");

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
  databaseURL: config.get("firebase.databaseURL")
});

const db = firebaseAdmin.database(); 

const server = restify.createServer({
  name: config.get("server.name"),
  version: config.get("server.version")
});


const cors = corsMiddleware({
 preflightMaxAge: 5,  
 origins: [config.get("server.origin")],
 allowHeaders: ["Access-Control-Allow-Origin", "Authorization"]
})

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());
server.pre(cors.preflight)
server.use(cors.actual)

phrasesRouter(server, db.ref("phrases"));

server.listen(config.get("server.port"), config.get("server.host"), function () {
  console.log("%s listening at %s", server.name, server.url);
});
