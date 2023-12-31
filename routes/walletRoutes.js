const express = require("express");
const {
  addWallet,
  editWallet,
  deleteWallet,
  getWallets,
} = require("../controllers/walletController");
const router = express.Router();

router.post("/addWallet/:id", addWallet);
router.put("/editWallet/:userId/:walletId", editWallet);
router.delete("/deleteWallet/:id", deleteWallet);
router.get("/getWallets/:id", getWallets);

module.exports = router;
