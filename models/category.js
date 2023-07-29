const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Joi = require("joi");

const Category = mongoose.model(
  "Category",
  new Schema({
    name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 50,
    },
    group: {
      type: String,
      enum: [
        "Required Expense",
        "Up & Comers",
        "Fun & Relax",
        "Investing & Debt Payments",
        "Income",
        "Other",
      ],
      required: true,
    },
    type: {
      type: String,
      enum: ["Income", "Outcome"],
      required: true,
    },
  })
);

function validateCategory(category) {
  const schema = Joi.object({
    name: Joi.string().min(2).max(50).required(),
    group: Joi.string().required(),
    type: Joi.string().required(),
  });
  return schema.validate(category);
}

exports.Category = Category;
exports.validate = validateCategory;
