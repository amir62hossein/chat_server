const User = require("../model/user");

const router = require("express").Router();

router.post("/register", async (req, res) => {
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
      user.save((err, doc) => {
        res.json(doc);
      });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
});
module.exports = router;
