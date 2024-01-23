const express = require("express");
const {
  addCategory,
  editCategory,
  deleteCategory,
  getCategories,
} = require("../controllers/categoryController");
const router = express.Router();

router.post("/addCategory/:walletId/:userId", addCategory);
router.put("/editCategory/:walletId/:categoryId", editCategory);
router.delete("/deleteCategory/:categoryId", deleteCategory);
router.get("/getCategories/:walletId", getCategories);

module.exports = router;
