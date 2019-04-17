const { Router } = require("express");

const { catchAsyncError } = require("../utils");
const db = require("../db");

const router = new Router();

const getZonesTeasersOrder = async zoneId => {
  const { rows: teasers } = await db.query(
    `
            select teasers.id, teasers.name, zones_teasers.weight
            from zones_teasers
            join teasers on zones_teasers.teasers_id = teasers.id
            where zones_teasers.zones_id = $1
            order by zones_teasers.weight desc, zones_teasers.teasers_id;
        `,
    [zoneId]
  );
  return teasers;
};

router.get(
  "/:zoneId",
  catchAsyncError(async (req, res) => {
    const { zoneId } = req.params;
    const teasers = await getZonesTeasersOrder(zoneId);
    return res.send(teasers);
  })
);

router.post(
  "/:zoneId",
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

router.delete(
  "/:zoneId",
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

router.put(
  "/reoder",
  catchAsyncError(async (req, res) => {
    const { zoneId, source, destination } = req.body;

    await db.query(
      `update zones_teasers
       set weight = $3
       where teasers_id = $2
       and zones_id = $1`,
      [zoneId, source.id, destination.weight]
    );

    if (source.weight < destination.weight) {
      // Top item drag&drop
      await db.query(
        `
            update zones_teasers
            set weight = weight - 1
            where weight <= $4
            and weight > $3
            and teasers_id != $2
            and zones_id = $1
        `,
        [zoneId, source.id, source.weight, destination.weight]
      );
    } else {
      // Down item drag&drop
      await db.query(
        `
            update zones_teasers
            set weight = weight + 1
            where weight < $4
            and weight >= $3
            and teasers_id != $2
            and zones_id = $1
        `,
        [zoneId, source.id, destination.weight, source.weight]
      );
    }

    const teasers = await getZonesTeasersOrder(zoneId);
    return res.send(teasers);
  })
);

module.exports = router;
