const express = require("express");
const { addWallet } = require("../controllers/walletController");
const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.post("/addWallet", addWallet);

module.exports = router;
