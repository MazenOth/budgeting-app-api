const express = require("express");
const { addWallet, editWallet } = require("../controllers/walletController");
const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.post("/addWallet", addWallet);
router.put("/editWallet/:id", editWallet);

module.exports = router;
