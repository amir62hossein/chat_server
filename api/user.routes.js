const { register } = require("../services/register");
const { login } = require("../services/signin");
const router = require("express").Router();

router.post("/register", register);
router.post("/login" , login);
module.exports = router;
