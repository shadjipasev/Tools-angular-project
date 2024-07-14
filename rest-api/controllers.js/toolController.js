// const upload = require('../middlewares/upload');

const { upload, bucketRef, bucket, storage } = require("../middlewares/upload");
const mongoose = require("mongoose");
const fs = require("fs");

// const bucket = new mongodb.GridFSBucket(db, { bucketName: "newBucket" });

const {
  createTool,
  getAllTools,
  getAllToolsType,
  getToolById,
  editTool,
  delById,
  searchByQuery,
} = require("../services/toolServices");
const {
  addToCart,
  decodeToken,
  cartSize,
} = require("../services/userServices");
const { ObjectId, Db, DBRef } = require("mongodb");
const { GridFsStorage } = require("multer-gridfs-storage");

const toolController = require("express").Router();

toolController.post("/create", upload.single("modelFile"), async (req, res) => {
  // const url = req.protocol + "://" + req.get("host");
  // console.log(req);
  const jsonData = req.body.data; // Access data object as JSON string
  const toolData = JSON.parse(jsonData);
  const file = {
    fileId: req.file.id,
    fileName: req.file.filename,
  };
  const data = {
    toolName: toolData.name,
    material: toolData.material,
    country: toolData.country,
    price: toolData.price,
    imgUrl: toolData.imgUrl,
    modelUrl: toolData.modelUrl,
    modelFile: file,
    description: toolData.description,
    type: toolData.type,
  };
  // console.log(data);
  // console.log("FILE ID = " +req )
  try {
    const newToolData = await createTool(data);
    console.log("Tool is created");
    res.status(200).json({
      message: "File uploaded successfully",
      newToolId: newToolData._id,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

toolController.get("/catalog", async (req, res) => {
  const getAll = await getAllTools();
  res.json(getAll);
});

toolController.get("/catalog/:type", async (req, res) => {
  const toolType = req.params.type;
  const tools = await getAllToolsType(toolType);
  res.json(tools);
});

toolController.get("/details/:id", async (req, res) => {
  const toolId = req.params.id;

  try {
    const tool = await getToolById(toolId);
    res.json(tool);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

toolController.put(
  "/edit/:id",
  upload.single("modelFile"),
  async (req, res) => {
    const toolId = req.params.id;
    // console.log("Request is === " + req);
    const jsonData = req.body.data; // Access data object as JSON string
    const toolData = JSON.parse(jsonData);
    // console.log("TOOLDATA === " + toolData);
    // console.log(req.file);
    let file = {};

    const data = {
      toolName: toolData.name,
      material: toolData.material,
      country: toolData.country,
      price: toolData.price,
      imgUrl: toolData.imgUrl,
      modelUrl: toolData.modelUrl,
      description: toolData.description,
      type: toolData.type,
    };

    if (req.file) {
      file = {
        fileId: req.file.id,
        fileName: req.file.filename,
      };
      data.modelFile = file;
    } else {
      file = {
        fileId: toolData.modelFile.fileId,
        fileName: toolData.modelFile.fileName,
      };
      data.modelFile = file;
    }

    try {
      await editTool(toolId, data);
      res.status(200).json("Tool Edited");
    } catch (error) {
      res.status(400).json({
        message: error.message,
      });
    }
  }
);

toolController.get("/delete/:id", async (req, res) => {
  const toolId = req.params.id;
  try {
    await delById(toolId);
    res.status(200).json("Tool Deleted");
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

toolController.post("/cart/add/:id", async (req, res) => {
  console.log("work: 1 | toolController/cart/add:id");
  const toolId = req.params.id;
  const userPayload = await decodeToken(req.token);

  try {
    // console.log("userId | toolController/cart/add:id " + userPayload._id);
    await addToCart(toolId, userPayload._id);
  } catch (error) {
    res.status(400).json({
      message: "Help",
    });
  }
});

toolController.get("/cart/size", async (req, res) => {
  const userPayload = await decodeToken(req.token);
  try {
    const cartLength = await cartSize(userPayload._id);
    console.log(cartLength);
    res.status(200).json({
      message: "",
      data: cartLength,
    });
  } catch (error) {}
});

toolController.get("/search/:query", async (req, res) => {
  const searchQuery = req.params.query;

  if (searchByQuery == "") {
    return;
  } else {
    try {
      const listOfTools = await searchByQuery(searchQuery);
      res.json(listOfTools);
    } catch (error) {
      res.status(404).json({
        message: "Item with " + searchQuery + "in it, is NOT found",
      });
    }
  }
});

toolController.get("/download/:fileId", async (req, res) => {
  const fileId = req.params.fileId;

  try {
    let dbRef = mongoose.connections[0].db;
    let bucketRef = new mongoose.mongo.GridFSBucket(dbRef, {
      bucketName: "newBucket",
    });

    let downloadStream = bucketRef.openDownloadStream(
      new mongoose.Types.ObjectId(fileId)
    );

    downloadStream.on("modelFile", (file) => {
      res.set({ "Content-Disposition": `attachment; filename='shit.rar'` });
      res.set("Content-Type", file.contentType);
    });
    downloadStream.pipe(res);

    // bucketRef
    //   .openDownloadStream(new mongoose.Types.ObjectId(fileId))
    //   .pipe(fs.createWriteStream("./outputFile"));

    // console.log("res == " + JSON.stringify(res));

    // bucketRef.openDownloadStream(new mongoose.Types.ObjectId(fileId)).pipe(res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = toolController;
