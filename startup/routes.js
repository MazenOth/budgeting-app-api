const userAuthRoutes = require("../routes/userAuthRoutes");
const walletRoutes = require("../routes/walletRoutes");
const home = require("../routes/home");
const error = require("../middleware/error");

module.exports = function (app) {
  app.use(userAuthRoutes);
  app.use(walletRoutes);
  app.use(home);
  app.use(error);
};
