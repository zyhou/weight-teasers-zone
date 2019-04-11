const express = require("express");
const bodyParser = require("body-parser");

const reoder = require("./reorder");

const app = express();
const port = 3001;

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

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
