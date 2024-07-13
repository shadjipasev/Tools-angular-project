const { Schema, model, Types } = require("mongoose");

const toolSchema = new Schema({
  toolName: { type: String, required: true },
  material: { type: String, required: true },
  country: { type: String, required: true },
  price: { type: Number, required: true },
  imgUrl: { type: String, required: true },
  modelUrl: { type: String, required: true },
  // modelFile: [{ type: Types.ObjectId }, { type: String, required:true }],
  modelFile: [
    {
      fileId: { type: Types.ObjectId, required: true },
      fileName: { type: String, required: true },
    },
  ],
  description: { type: String, required: true },
  type: { type: String, required: true },
});

toolSchema.index({ toolName: 1 });
// toolSchema.index({ toolName: "text" });

const Tool = model("Tool", toolSchema);

module.exports = Tool;
