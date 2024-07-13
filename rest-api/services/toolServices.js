const Tool = require("../models/Tool");

async function getAllToolsType(toolType) {
  return await Tool.find({ type: toolType });
}

async function getAllTools() {
  return await Tool.find({});
}

async function getToolById(id) {
  const tool = await Tool.findById(id);
  return tool;
}

async function editTool(id, data) {
  const tool = await Tool.findById(id);
  console.log("Edit tool Service");
  console.log(data);
  tool.toolName = data.toolName;
  tool.material = data.material;
  tool.country = data.country;
  tool.price = data.price;
  tool.imgUrl = data.imgUrl;
  tool.modelUrl = data.modelUrl;
  tool.modelFile = data.modelFile;
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

async function searchByQuery(query) {
  const results = await Tool.find({
    toolName: { $regex: query, $options: "i" },
  }).limit(4);
  return results;

  // const result = await Tool.find({ $text: { $search: query } }).limit(4);

  // return result;
}

// async function getFileName()

// async function downloadFile()

module.exports = {
  createTool,
  getAllTools,
  getAllToolsType,
  getToolById,
  editTool,
  delById,
  searchByQuery,
};
