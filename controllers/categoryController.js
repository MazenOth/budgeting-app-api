const { Category, validate } = require("../models/category");
const { User } = require("../models/user");
const _ = require("lodash");

const addCategory = async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  const user = await User.findOne({ _id: req.body.userId });
  if (!user) {
    return res.status(400).send("Please check your userId.");
  }
  let category = await Category.findOne({ name: req.body.name }).where({
    userId: req.body.userId,
  });
  if (category) {
    return res.status(400).send("This category name already exists.");
  }
  category = new Category(
    _.pick(req.body, ["userId", "name", "group", "type"])
  );
  category = await category.save();
  res.send(category);
};

module.exports = { addCategory };
