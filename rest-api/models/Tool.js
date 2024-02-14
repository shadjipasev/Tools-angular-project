const { Schema, model } = require("mongoose");

const toolSchema = new Schema({
  name: { type: String, required: true },
  material: { type: String, required: true },
  country: { type: String, required: true },
  price: { type: Number, required: true },
  imgUrl: { type: String, require: true },
  modelUrl: { type: String, required: true },
  description: { type: String, required: true },
  type: { type: String, required: true },
});

const Tool = model("Tool", toolSchema);

module.exports = Tool;
