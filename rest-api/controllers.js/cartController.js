const { decodeToken } = require("../services/userServices");
const {
  addToCart,
  cartSize,
  createCart,
  getAllCartItems,
} = require("../services/cartServices");
const Cart = require("../models/Cart");

const cartController = require("express").Router();

cartController.post("/add/:id", async (req, res) => {
  //   console.log("work: 1 | toolController/cart/add:id");
  const toolId = req.params.id;
  const userPayload = decodeToken(req.token);
  const userId = userPayload._id;

  let cart = await Cart.findOne({ user: userId });
  let toolsId = [];

  try {
    if (cart) {
      console.log("There is cart created!");
      for (let t of cart.tools) {
        toolsId.push(t.toString());
      }

      if (toolsId.indexOf(toolId) !== -1) {
        return res.status(400).json({
          message: "Book is already in your cart",
        });
      }
    } else {
      await createCart(toolId, userId);
      console.log("Cart should be created!");
    }

    await addToCart(toolId, userPayload._id);
    cart = await Cart.findOne({ user: userId });
    if (cart.tools.length == 0) {
      res.json({
        message: "cart is empty for now",
      });
    }
    res.status(200).json({
      message: "Book added to cart!",
      data: cart.tools,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "Something went wrong, please try again.",
    });
  }
});

cartController.get("/size", async (req, res) => {
  const userPayload = decodeToken(req.token);
  const userId = userPayload._id;
  try {
    const cartLength = await cartSize(userId);
    console.log(cartLength);
    return res.status(200).json({
      message: "Here is the cart length",
      data: cartLength,
    });
  } catch (error) {}
});

cartController.get("/get", async (req, res) => {
  const userPayload = decodeToken(req.token);
  const userId = userPayload._id;

  const cart = await getAllCartItems(userId);

  res.json(cart);
});

module.exports = cartController;
