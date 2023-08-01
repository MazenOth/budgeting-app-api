const express = require("express");
const app = express();
const config = require("config");

const port = process.env.PORT || 3000;

// on cmd >set budgeting_jwtPrivateKey=mySecureKey
if (!config.get("jwtPrivateKey")) {
  console.error("FATAL ERROR: jwtPrivateKey is not defined.");
  process.exit(1);
}

require("./startup/routes")(app);
require("./startup/db")();

app.listen(port, () => console.log("Listening on port 3000..."));
