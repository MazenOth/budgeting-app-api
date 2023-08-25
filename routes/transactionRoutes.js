const express = require("express");
const {
  addTransaction,
  editTransaction,
} = require("../controllers/transactionController");
const router = express.Router();

router.post("/addTransaction", addTransaction);
router.put("/editTransaction/:id", editTransaction);

module.exports = router;
