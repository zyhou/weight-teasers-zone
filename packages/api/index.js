const express = require("express");
const app = express();
const port = 3001;

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Methods", "GET, PUT");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

const teasers = [
  { id: 1, name: "teaser 1" },
  { id: 2, name: "teaser 2" },
  { id: 3, name: "teaser 3" }
];

app.get("/teasers", (req, res) => res.send(JSON.stringify(teasers)));

app.put("/reoder", (req, res) => {
  res.send(JSON.stringify(teasers));
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
