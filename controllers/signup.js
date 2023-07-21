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

  let user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.status(400).send("User already registered.");
  }
  user = new User({
    email: req.body.email,
    password: req.body.password,
  });
  user = await user.save();
  res.send(user);
});

module.exports = router;
