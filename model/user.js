const mongoose = require("mongoose");

const User = new mongoose.Schema({
  userName: {
    type: String,
  },
  password: {
    type: String,
  },
  fullName: {
    type: String,
  },
});

module.exports = mongoose.model("user", User);
