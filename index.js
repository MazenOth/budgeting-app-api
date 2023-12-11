const app = require("./app");
const config = require("config");
const cors = require("cors");
app.use(cors());

const port = process.env.PORT || 4000;

// on cmd >set budgeting_jwtPrivateKey=mySecureKey
if (!config.get("jwtPrivateKey")) {
  console.error("FATAL ERROR: jwtPrivateKey is not defined.");
  process.exit(1);
}

app.listen(port, () => console.log("Listening on port 4000..."));
