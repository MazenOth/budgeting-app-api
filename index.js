const app = require("./app");
const config = require("config");
const cors = require("cors");
const schedule = require("node-schedule");
app.use(cors());

const port = process.env.PORT || 4000;

// on cmd >set budgeting_jwtPrivateKey=mySecureKey
if (!config.get("jwtPrivateKey")) {
  console.error("FATAL ERROR: jwtPrivateKey is not defined.");
  process.exit(1);
}

app.listen(port, () => console.log("Listening on port 4000..."));


const startTime = new Date(Date.now() + 5000);
const endTime = new Date(startTime.getTime() + 5000);
const job = schedule.scheduleJob(
  { start: startTime, end: endTime, rule: "*/1 * * * * *" },
  function () {
    console.log("Time for tea!");
  }
);