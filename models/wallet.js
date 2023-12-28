const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const currencyEnum = ["USD", "EGP"];

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
      enum: [...currencyEnum],
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
    userId: Joi.objectId(),
    name: Joi.string().min(2).max(50).required(),
    currency: Joi.any().valid(...currencyEnum),
    balance: Joi.number().default(0),
  });
  return schema.validate(wallet);
}

exports.Wallet = Wallet;
exports.validate = validateWallet;
