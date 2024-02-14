const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const BlackList = require("../models/BlackList");
const { getToolById } = require("./toolServices");
const jwtDecode = require("jwt-decode");
const secret = "zmhmfnios563dqa53d156";

async function register(username, email, password) {
  const existingEmail = await User.findOne({ username }).collation({
    locale: "en",
    strength: 2,
  });

  const existingUsername = await User.findOne({ email }).collation({
    locale: "en",
    strength: 2,
  });

  if (existingEmail) {
    throw new Error("This email already taken");
  }

  if (existingUsername) {
    throw new Error("This username already taken");
  }

  const user = await User.create({
    username,
    email,
    hashedPassword: await bcrypt.hash(password, 10),
  });

  return createToken(user);
}

async function login(username, password) {
  const user = await User.findOne({ username }).collation({
    locale: "en",
    strength: 2,
  });

  if (!user) {
    throw new Error("Wrong username or password!");
  }

  const hasMatch = bcrypt.compare(password, user.hashedPassword);

  if (!hasMatch) {
    throw new Error("Wrong username or password!");
  }

  return createToken(user);
}

async function logout(token) {
  await BlackList.create({
    tokenBlackList: token,
  });
}

function createToken(user) {
  const payload = {
    _id: user._id,
    username: user.username,
  };

  return {
    _id: user._id,
    username: user.username,
    role: user.role,
    token: jwt.sign(payload, secret),
  };
}

async function parseToken(token) {
  const blackListed = await BlackList.findOne({ token }).collation({
    locale: "en",
    strength: 2,
  });

  if (blackListed) {
    throw new Error("Token is blacklisted!");
  }

  return jwt.verify(token, secret);
}

async function getUserById(id) {
  return await User.findById(id);
}

function decodeToken(token) {
  return jwtDecode(token);
}

module.exports = {
  register,
  login,
  logout,
  parseToken,
  getUserById,
  decodeToken,
};
