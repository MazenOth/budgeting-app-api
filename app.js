const express = require("express");
const app = express();
require("express-async-errors");

require("./startup/routes")(app);
require("./startup/db")();

module.exports = app;
