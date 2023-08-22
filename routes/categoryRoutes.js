const express = require("express");
const {
  addCategory,
  editCategory,
  deleteCategory,
} = require("../controllers/categoryController");
const router = express.Router();

router.post("/addCategory", addCategory);
router.put("/editCategory/:id", editCategory);
router.delete("/deleteCategory/:id", deleteCategory);

module.exports = router;
