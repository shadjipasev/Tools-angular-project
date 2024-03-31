const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");
const mongoose = require("mongoose");

//creating bucket
let bucket;
mongoose.connection.on("connected", () => {
  var db = mongoose.connections[0].db;
  bucket = new mongoose.mongo.GridFSBucket(db, {
    bucketName: "newBucket",
  });
  console.log(bucket);
});

// let connection = mongoose.connection;
// const DIR = "./public/";
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, DIR);
//   },
//   filename: (req, file, cb) => {
//     const fileName = file.originalname.toLowerCase().split(" ").join("-");
//     cb(null, fileName);
//   },
// });

const storage = new GridFsStorage({
  url: process.env.MONGODB_CONNECT_URI,
  file: async (req, file) => {
    const promise = new Promise((resolve, reject) => {
      const filename = file.originalname;
      const fileInfo = {
        filename: filename,
        bucketName: "newBucket",
      };
      resolve(fileInfo);
    });
    console.log("PROMISE", promise);
  },
});

var upload = multer({
  storage: storage,
  // fileFilter: (req, file, cb) => {
  //   // if (
  //   //   file.mimetype == "image/png" ||
  //   //   file.mimetype == "image/jpg" ||
  //   //   file.mimetype == "image/jpeg"
  //   // ) {
  //   cb(null, true);
  //   // } else {
  //   //   cb(null, false);
  //   //   return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
  //   // }
  // },
});

module.exports = {
  upload,
};
