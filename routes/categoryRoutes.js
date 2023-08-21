const express = require("express");
const { addCategory } = require("../controllers/categoryController");
const router = express.Router();

router.post("/addCategory", addCategory);

module.exports = router;
