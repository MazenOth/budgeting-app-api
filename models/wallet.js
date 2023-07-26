const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const Wallet = mongoose.model(
  "Wallet",
  new Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      minlength: 2,
      maxlength: 50,
      required: true,
    },
    currency: {
      type: String,
      enum: ["USD", "EGP"],
      required: true,
    },
    balance: {
      type: Number,
      default: 0,
    },
  })
);

function validateWallet(wallet) {
  const schema = Joi.object({
    userId: Joi.objectId().required(),
    name: Joi.string().min(2).max(50).required(),
    // Need to validate enum
    currency: Joi.string().required(),
    balance: Joi.number().default(0),
  });
  return schema.validate(wallet);
}

exports.Wallet = Wallet;
exports.validate = validateWallet;
