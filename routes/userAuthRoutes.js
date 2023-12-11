const express = require("express");
const { signup, signin, users } = require("../controllers/userAuthController");

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/users", users);

module.exports = router;
