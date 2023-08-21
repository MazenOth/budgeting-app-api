const express = require("express");
const { addCategory, editCategory } = require("../controllers/categoryController");
const router = express.Router();

router.post("/addCategory", addCategory);
router.put("/editCategory/:id", editCategory);

module.exports = router;
