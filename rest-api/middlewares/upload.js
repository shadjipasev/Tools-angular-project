const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");
const mongoose = require("mongoose");

//creating bucket
let bucket;

mongoose.connection.once("connected", () => {
  let db = mongoose.connections[0].db;
  bucket = new mongoose.mongo.GridFSBucket(db, {
    bucketName: "newBucket",
  });
  console.log(bucket);
});

// function createBucket(callback) {
//   mongoose.connection.on("connected", () => {
//     let db = mongoose.connections[0].db;
//     let bucket = new mongoose.mongo.GridFSBucket(db, {
//       bucketName: "newBucket",
//     });
//     callback(bucket); // Pass the bucket object to the callback
//   });
// }

// bucketRef.ope

// Example usage:
// createBucket((bucket) => {
// console.log(bucket.);
// bucket // You can now use the bucket object here
// });

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
  bucket,
};
