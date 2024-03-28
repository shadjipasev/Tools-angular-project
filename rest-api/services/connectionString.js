if (process.env.NODE_ENV === "production") {
  // use Atlas DB
  connectionString =
    "mongodb+srv://shadjipasev:852456Patriciq123!@cluster1.atk3rn7.mongodb.net/tools-co";
} else {
  // use local DB
  connectionString = "mongodb://localhost:27017/tools";
}

module.exports = {
  connectionString,
};
