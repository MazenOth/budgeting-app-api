const express = require("express");
const { addRecurring } = require("../controllers/recurringTransaction");
const router = express.Router();

router.post("/addRecurring/:walletId/:userId", addRecurring);

module.exports = router;
