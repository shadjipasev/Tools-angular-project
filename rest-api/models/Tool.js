const { Schema, model } = require("mongoose");

const toolSchema = new Schema({
  toolName: { type: String, required: true },
  material: { type: String, required: true },
  country: { type: String, required: true },
  price: { type: Number, required: true },
  imgUrl: { type: String, required: true },
  modelUrl: { type: String, required: true },
  description: { type: String, required: true },
  type: { type: String, required: true },
});

toolSchema.index({ toolName: 1 });

const Tool = model("Tool", toolSchema);

module.exports = Tool;
