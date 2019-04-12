const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config({ path: "../../.env" });

const reoder = require("./reorder");
const db = require("./db");
const app = express();

const catchAsyncError = fn => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Methods", "GET, PUT, POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});
app.use(bodyParser.json());

let teasers = [
  { id: 1, name: "teaser 1" },
  { id: 2, name: "teaser 2" },
  { id: 3, name: "teaser 3" }
];

app.get("/teasers", (req, res) => {
  return res.send(JSON.stringify(teasers));
});

app.put("/teasers/reoder", (req, res) => {
  const { sourceIndex, destinationIndex } = req.body;
  teasers = reoder(teasers, sourceIndex, destinationIndex);
  return res.send(JSON.stringify(teasers));
});

app.post("/teasers/add", (req, res) => {
  const count = teasers.length + 1;
  teasers = [...teasers, { id: count, name: `teaser ${count}` }];
  return res.send(JSON.stringify(teasers));
});

app.get(
  "/",
  catchAsyncError(async (req, res) => {
    const { rows } = await db.query("select * from teasers");
    return res.send(rows);
  })
);

app.listen(process.env.EXPRESS_PORT, () =>
  console.log(`Example app listening on port ${process.env.EXPRESS_PORT}!`)
);
