const { Router } = require("express");

const { catchAsyncError } = require("../utils");
const db = require("../db");

const router = new Router();

router.get(
  "/",
  catchAsyncError(async (req, res) => {
    const { rows: teasers } = await db.query(`
        select * from teasers order by teasers.id;
    `);
    return res.send(teasers);
  })
);

router.post(
  "/",
  catchAsyncError(async (req, res) => {
    const { name } = req.body;
    const { rows } = await db.query(
      `insert into teasers (name) values ($1) returning *`,
      [name]
    );
    return res.send(rows[0]);
  })
);

module.exports = router;
