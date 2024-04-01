const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");
const mongoose = require("mongoose");

//creating bucket
let bucket;

mongoose.connection.on("connected", () => {
  let db = mongoose.connections[0].db;
  bucket = new mongoose.mongo.GridFSBucket(db, {
    bucketName: "newBucket",
  });
  bucket.collections;
  console.log(bucket);
});

const dbRef = mongoose.connections[0].db;
const bucketRef = new mongoose.mongo.GridFSBucket(dbRef, {
  bucketName: "newBucket",
});

// const gridfs = {
//   getBucket: function () {
//     return bucket;
//   },
//   // Add more methods as needed
// };

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
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      const filename = file.originalname;
      const fileInfo = {
        filename: filename,
        bucketName: "newBucket",
      };
      resolve(fileInfo);
    });
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
  bucketRef,
  dbRef,
};
