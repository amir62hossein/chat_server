const { register } = require("../services/register");

const router = require("express").Router();

router.post("/register", register);
module.exports = router;
