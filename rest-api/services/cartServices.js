const Cart = require("../models/Cart");
const User = require("../models/User");
const { getUserById } = require("../services/userServices");
const { getToolById } = require("./toolServices");

async function addToCart(toolId, userId) {
  const cart = await Cart.findOne({ user: userId });
  const tool = await getToolById(toolId);

  console.log("cartSize");
  cart.tools.push(tool);
  cart.totalPrice += tool.price;

  await cart.save();
}

async function cartSize(userId) {
  const cart = await Cart.findOne({ user: userId });
  console.log(cart.tools.length + "cartSize from cartSize function");

  return cart.tools.length;
}

async function createCart(toolId, userId) {
  const tool = await getToolById(toolId);

  console.log("Inside createCart function");
  console.log(tool);

  await Cart.create({
    user: userId,
    tools: toolId,
    totalPrice: tool.price,
  });
}

async function getAllCartItems(userId) {
  const cart = await Cart.findOne({ user: userId }).populate("tools");

  console.log(cart.tools);
  return cart.tools;
}

module.exports = {
  cartSize,
  addToCart,
  createCart,
  getAllCartItems,
};
