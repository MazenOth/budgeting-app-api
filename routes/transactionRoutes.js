const express = require("express");
const {
  addTransaction,
  editTransaction,
  deleteTransaction,
  getTransactions,
} = require("../controllers/transactionController");
const router = express.Router();

router.post("/addTransaction/:walletId", addTransaction);
router.put(
  "/editTransaction/:transactionId/:walletId/:categoryId",
  editTransaction
);
router.delete("/deleteTransaction/:transactionId", deleteTransaction);
router.get("/getTransactions/:walletId", getTransactions);

module.exports = router;
