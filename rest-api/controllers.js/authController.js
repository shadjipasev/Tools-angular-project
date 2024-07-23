const {
  register,
  login,
  logout,
  getUserById,
} = require("../services/userServices");

const authController = require("express").Router();

authController.post("/logout", async (req, res) => {
  const token = await req.body.token;
  // try {

  // } catch (error) {

  // }
  // await logout(token);
  console.log("works logout");
  res.json({
    message: "User is logged out!",
  });
});

authController.post("/register", async (req, res) => {
  try {
    console.log("works just fine");
    const token = await register(
      req.body.username,
      req.body.email,
      req.body.password
    );
    res.json(token);
  } catch (error) {
    res.status(401).json({
      message: error.message,
    });
  }
});

authController.post("/login", async (req, res) => {
  try {
    const token = await login(req.body.username, req.body.password);

    if (token) {
      res.json(token);
    }
  } catch (error) {
    res.status(401).json({
      message: error.message,
    });
  }
});

authController.get("/profile/:id", async (req, res) => {
  const userId = req.params.id;
  const user = await getUserById(userId);

  res.json(user);
});

module.exports = authController;
