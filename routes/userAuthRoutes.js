const express = require("express");
const { signup, signin, users, deleteUser } = require("../controllers/userAuthController");

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/users", users);
router.delete("/deleteUser/:userId", deleteUser);

module.exports = router;
