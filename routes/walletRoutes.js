const express = require("express");
const { addWallet, editWallet, deleteWallet } = require("../controllers/walletController");
const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.post("/addWallet", addWallet);
router.put("/editWallet/:id", editWallet);
router.delete("/deleteWallet/:id", deleteWallet);

module.exports = router;
