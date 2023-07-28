const express = require("express");
const router = express.Router();
const { addWallet } = require("../controllers/walletController");

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.post("/addWallet", addWallet);

module.exports = router;
