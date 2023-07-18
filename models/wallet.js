const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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
      minlength: 5,
      maxlength: 225,
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
