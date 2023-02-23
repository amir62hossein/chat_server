const User = require("../model/user");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const register = async (req, res) => {
  try {
    const { userName, password, fullName } = req.body;

    const existedUser = await User.findOne({ userName: userName });

    if (existedUser) {
      return res.status(400).json({
        success: false,
        message: "user already registered",
      });
    }

    if (userName && password && fullName) {
      const user = new User({
        userName,
        password,
        fullName,
      });
      const token = jwt.sign({ userName }, process.env.JWT_kEY, {
        algorithm: "HS256",
        expiresIn: 3600,
      });
      user.save((err, doc) => {
        res.json({ doc, token });
      });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

module.exports = { register };
