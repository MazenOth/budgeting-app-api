const express = require("express");
const {
  addTransaction,
  editTransaction,
  deleteTransaction,
} = require("../controllers/transactionController");
const router = express.Router();

router.post("/addTransaction", addTransaction);
router.put("/editTransaction/:id", editTransaction);
router.delete("/deleteTransaction/:id", deleteTransaction);

module.exports = router;
