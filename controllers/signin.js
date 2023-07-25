const express = require("express");
const router = express.Router();
const { User, validate } = require("../models/user");

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  let user = await User.findOne({
    email: req.body.email,
    password: req.body.password,
  });
  if (user) {
    return res.status(200).send("Signed in successfully!");
  } else {
    return res.status(400).send("Please check your email or password!");
  }
});

module.exports = router;
