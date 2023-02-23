const User = require("../model/user");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const login = async (req, res) => {
  try {
    const { userName, password } = req.body;

    const existedUser = await User.findOne({ userName: userName });

    if (!existedUser) {
      return res.status(404).json({
        success: false,
        message: "user not found",
      });
    } else {
      const token = jwt.sign({ userName }, process.env.JWT_kEY, {
        algorithm: "HS256",
        expiresIn: 3600,
      });

      res.json({ existedUser, token });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

module.exports = { login };
