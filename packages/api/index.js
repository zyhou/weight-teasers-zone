const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config({ path: "../../.env" });

const db = require("./db");
const app = express();

const catchAsyncError = fn => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", process.env.WEB_SITE_URL);
  res.setHeader("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
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

const getZonesTeasersOrder = async zoneId => {
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
  return teasers;
};

app.get(
  "/zonesTeasers/:zoneId",
  catchAsyncError(async (req, res) => {
    const { zoneId } = req.params;
    const teasers = await getZonesTeasersOrder(zoneId);
    return res.send(teasers);
  })
);

app.post(
  "/zonesTeasers/:zoneId",
  catchAsyncError(async (req, res) => {
    const { zoneId } = req.params;
    const { teaserId } = req.body;

    const { rows: weights } = await db.query(
      `select max(weight) + 1 as maxWeight from zones_teasers where zones_id = $1`,
      [zoneId]
    );

    await db.query(
      `
      insert into zones_teasers (zones_id, teasers_id, weight)
      VALUES ($1, $2, $3);
    `,
      [zoneId, teaserId, weights[0].maxweight]
    );
    const teasers = await getZonesTeasersOrder(zoneId);
    return res.send(teasers);
  })
);

app.delete(
  "/zonesTeasers/:zoneId",
  catchAsyncError(async (req, res) => {
    const { zoneId } = req.params;
    const { teaserId } = req.body;
    const { rows: result } = await db.query(
      `delete from zones_teasers where zones_id = $1 and teasers_id = $2 returning weight`,
      [zoneId, teaserId]
    );

    const weight = result[0].weight;

    await db.query(
      `update zones_teasers
       set weight = zones_teasers.weight - 1
       where zones_teasers.weight > $2
       and zones_teasers.zones_id = $1`,
      [zoneId, weight]
    );

    const teasers = await getZonesTeasersOrder(zoneId);
    return res.send(teasers);
  })
);

app.put(
  "/zonesTeasers/reoder",
  catchAsyncError(async (req, res) => {
    const { zoneId, sourceIndex, destinationIndex } = req.body;

    const teasers = await getZonesTeasersOrder(zoneId);
    return res.send(teasers);
  })
);

app.listen(process.env.EXPRESS_PORT, () =>
  console.log(`Example app listening on port ${process.env.EXPRESS_PORT}!`)
);
