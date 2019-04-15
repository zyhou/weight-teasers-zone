const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config({ path: "../../.env" });

const teasersRouter = require("./router/teasers");
const zonesRouter = require("./router/zones");
const zonesTeasersRouter = require("./router/zonesTeasers");

const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", process.env.WEB_SITE_URL);
  res.setHeader("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});
app.use(bodyParser.json());

app.use("/teasers", teasersRouter);
app.use("/zones", zonesRouter);
app.use("/zonesTeasers", zonesTeasersRouter);

app.listen(process.env.EXPRESS_PORT, () =>
  console.log(`Example app listening on port ${process.env.EXPRESS_PORT}!`)
);
