const bodyParser = require("body-parser");
const userAuthRoutes = require("../routes/userAuthRoutes");
const walletRoutes = require("../routes/walletRoutes");
const categoryRoutes = require("../routes/categoryRoutes");
const transactionRoutes = require("../routes/transactionRoutes");
const home = require("../routes/home");
const error = require("../middleware/error");

module.exports = function (app) {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(userAuthRoutes);
  app.use(walletRoutes);
  app.use(categoryRoutes);
  app.use(transactionRoutes);
  app.use(home);
  app.use(error);
};
