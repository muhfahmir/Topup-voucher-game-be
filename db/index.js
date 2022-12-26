const mongoose = require("mongoose");

const { urlDb } = require("../config");

mongoose
  .connect(`${urlDb}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected");
  });

const db = mongoose.connection;

module.exports = db;
