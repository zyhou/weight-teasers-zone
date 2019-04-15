const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config({ path: "../../.env" });

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

app.get(
  "/teasers",
  catchAsyncError(async (req, res) => {
    const { rows: teasers } = await db.query(`
        select * from teasers order by teasers.id;
    `);
    return res.send(teasers);
  })
);

app.post(
  "/teasers",
  catchAsyncError(async (req, res) => {
    const { name } = req.body;
    const { rows } = await db.query(
      `insert into teasers (name) values ($1) returning *`,
      [name]
    );
    return res.send(rows[0]);
  })
);

app.get(
  "/zones",
  catchAsyncError(async (req, res) => {
    const { rows: zones } = await db.query(`
        select * from zones order by zones.id;
    `);
    return res.send(zones);
  })
);

app.get(
  "/zonesTeasers/:zoneId",
  catchAsyncError(async (req, res) => {
    const { zoneId } = req.params;
    const { rows: teasers } = await db.query(
      `
        select teasers.id, teasers.name
        from zones_teasers
        join teasers on zones_teasers.teasers_id = teasers.id
        where zones_teasers.zones_id = $1
        order by zones_teasers.weight, zones_teasers.teasers_id;
    `,
      [zoneId]
    );
    return res.send(teasers);
  })
);

app.put(
  "/zonesTeasers/reoder",
  catchAsyncError(async (req, res) => {
    const { zoneId, sourceIndex, destinationIndex } = req.body;
    const { rows: teasers } = await db.query(
      `
        select teasers.id, teasers.name
        from zones_teasers
        join teasers on zones_teasers.teasers_id = teasers.id
        where zones_teasers.zones_id = $1
        order by zones_teasers.weight, zones_teasers.teasers_id;
    `,
      [zoneId]
    );
    return res.send(teasers);
  })
);

app.listen(process.env.EXPRESS_PORT, () =>
  console.log(`Example app listening on port ${process.env.EXPRESS_PORT}!`)
);
