const express = require("express");
const { signup, signin } = require("../controllers/userAuthController");

const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.post("/signup", signup);
router.post("/signin", signin);

module.exports = router;
