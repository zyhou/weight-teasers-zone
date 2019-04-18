const dotenv = require("dotenv");
dotenv.config({ path: "../../.env" });
const db = require("./db");

const TOTAL_ROW = 1000;
const zoneId = 1;

const data = Array.from(Array(TOTAL_ROW), (x, index) => index + 1);

const args = data.map(d => `('teaser_${d}')`).join(",");
db.query(`INSERT INTO teasers (name) VALUES ${args} RETURNING *`).then(
  ({ rows }) => {
    console.log("Populate teasers");

    const argsWeight = rows
      .map((row, index) => `(${zoneId}, ${row.id}, ${index})`)
      .join(",");

    db.query(
      `INSERT INTO zones_teasers (zones_id, teasers_id, weight) VALUES ${argsWeight}`
    ).then(() => {
      console.log("Populate in zones_teasers");
    });
  }
);
