require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const error = require("./middlewares/error");
const authController = require("./controllers.js/authController");
const toolController = require("./controllers.js/toolController");
const session = require("./middlewares/session");
const cartController = require("./controllers.js/cartController");
// const { connectionString } = require("./services/connectionString");

//File
// const { GridFsStorage } = require("multer-gridfs-storage");
// const multer = require("multer");
let connectionString = "";

if (process.env.NODE_ENV === "production") {
  // use Atlas DB
  connectionString = process.env.MONGODB_CONNECT_URI;
} else {
  // use local DB
  connectionString = process.env.MONGODB_CONNECT_URI_LOCAL;
}
mongoose.set("strictQuery", false);
const initDB = async () => mongoose.connect(connectionString);

start();

async function start() {
  await initDB();

  // let connection = mongoose.connection

  console.log("Database: Works");

  const app = express();
  app.use(express.json());
  app.use(bodyParser.json());
  // app.use(express.json({ limit: "100mb" }));
  app.use(express.urlencoded({ extended: false }));

  // app.use(cors())

  const corsOptions = {
    origin: ["https://tools-co.web.app", "http://localhost:4200"],
    methods: ["HEAD", "OPTIONS", "GET", "POST", "PUT", "DELETE"],
    Headers: [
      "Access-Control-Allow-Headers",
      "Content-Type",
      "X-Authorization",
      "X-Frame-Options: GOFORIT",
    ], //SAMEORIGIN
  };

  app.use(cors(corsOptions));

  app.get("/", (req, res) => {
    res.json({ message: "REST" });
  });
  // app.get("/favicon.ico", (req, res) =>
  //   res.status(200).sendFile("favicon.ico", "./static")
  // );
  // app.router.replace("/thankyou");
  app.use(session());
  app.use("/auth", authController);
  app.use("/data", toolController);
  app.use("/cart", cartController);
  // app.use(session());
  // console.log(process.env.MONGODB_CONNECT_URI);

  const PORT = process.env.PORT || 3000;

  app.listen(PORT, () => {
    console.log("REST service started");
  });
}
