function getConnectionString() {
  let connectionString = "";

  if (process.env.NODE_ENV === "production") {
    // use Atlas DB
    connectionString = process.env.MONGODB_CONNECT_URI;
    console.log("prod:env");
  } else {
    // use local DB
    connectionString = process.env.MONGODB_CONNECT_URI_LOCAL;
    console.log("dev:env");
  }

  return connectionString;
}

module.exports = {
  getConnectionString,
};
