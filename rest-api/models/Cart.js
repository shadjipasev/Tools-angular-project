const { Schema, model, Types, isObjectIdOrHexString } = require("mongoose");

const cartSchema = new Schema({
  user: { type: Types.ObjectId, ref: "User" },
  tools: [{ type: Types.ObjectId, ref: "Tool" }],
  totalPrice: { type: Number, default: 0 },
});

const Cart = model("Cart", cartSchema);

module.exports = Cart;
