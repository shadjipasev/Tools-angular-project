const Tool = require("../models/Tool");

async function getAllToolsType(toolType) {
  return await Tool.find({ type: toolType });
}

async function getAllTools() {
  return await Tool.find({});
}

async function getToolById(id) {
  return await Tool.findById(id);
}

async function editTool(id, data) {
  const tool = await Tool.findById(id);
  console.log("Edit tool Service");
  tool.name = data.name;
  tool.material = data.material;
  tool.country = data.country;
  tool.price = data.price;
  tool.imgUrl = data.imgUrl;
  tool.modelUrl = data.modelUrl;
  tool.description = data.description;
  tool.type = data.type;

  await tool.save();
}

async function createTool(data) {
  console.log(data);
  await Tool.create(data);
  console.log("Tool is created");
}

async function delById(id) {
  await Tool.findByIdAndDelete(id);
}

// async function addToCard(id, user){
//     const tool = await Tool.findById(id);

//     tool.
// }

module.exports = {
  createTool,
  getAllTools,
  getAllToolsType,
  getToolById,
  editTool,
  delById,
};
