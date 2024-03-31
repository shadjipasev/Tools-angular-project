// const upload = require('../middlewares/upload');

const { upload } = require("../middlewares/upload");
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

const toolController = require("express").Router();

toolController.post("/create", upload.single("modelFile"), async (req, res) => {
  // const url = req.protocol + "://" + req.get("host");
  // console.log(req);
  const jsonData = req.body.data; // Access data object as JSON string
  const toolData = await JSON.parse(jsonData);
  const data = {
    toolName: toolData.name,
    material: toolData.material,
    country: toolData.country,
    price: toolData.price,
    imgUrl: toolData.imgUrl,
    modelUrl: toolData.modelUrl,
    modelFile: req.file.id,
    description: toolData.description,
    type: toolData.type,
  };
  //console.log(data);
  //console.log("FILE ID = " + req.file.id);
  try {
    const tool = await createTool(data);
    // console.log("Tool is created");
    res.status(200).send(tool.toolName + "is uploaded successfully");
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
  const tool = await getToolById(toolId);
  // console.log(toolId)

  res.json(tool);
});

toolController.put("/edit/:id", async (req, res) => {
  const toolId = req.params.id;
  console.log("Request is === " + req);
  const data = {
    toolName: req.body.name,
    material: req.body.material,
    country: req.body.country,
    price: req.body.price,
    imgUrl: req.body.imgUrl,
    modelUrl: req.body.modelUrl,
    description: req.body.description,
    type: req.body.type,
  };
  try {
    await editTool(toolId, data);
    // res.json(toolId)
    // res.json(req.body)
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

toolController.get("/delete/:id", async (req, res) => {
  const toolId = req.params.id;
  await delById(toolId);
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

toolController.get("/download/:fileName", async (req, res) => {
  const fileName = req.params.fileName;
  console.log(fileName);
  try {
    res.download("./public/" + fileName);
  } catch (error) {
    res.status(404).json({
      message: "This tool can't be downloaded!",
    });
    // }
  }
});

module.exports = toolController;
