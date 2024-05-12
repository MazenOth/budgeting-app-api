const { Transaction, validate } = require("../models/transaction");
const { Wallet } = require("../models/wallet");
const { User } = require("../models/user");
const { Category } = require("../models/category");
const mongoose = require("mongoose");
const _ = require("lodash");
const schedule = require("node-schedule");

const addRecurring = async (req, res) => {
  const startTime = new Date(Date.now() + 5000);
  const endTime = new Date(startTime.getTime() + 5000);
  const job = schedule.scheduleJob(
    { start: startTime, end: endTime, rule: "*/1 * * * * *" },
    function () {
      console.log("Time for tea!");
    }
  );
};
