const express = require("express");
const {
  addWallet,
  editWallet,
  deleteWallet,
} = require("../controllers/walletController");
const router = express.Router();

router.post("/addWallet/:id", addWallet);
router.put("/editWallet/:id", editWallet);
router.delete("/deleteWallet/:id", deleteWallet);

module.exports = router;
