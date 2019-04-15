const { Router } = require("express");

const { catchAsyncError } = require("../utils");
const db = require("../db");

const router = new Router();

router.get(
  "/",
  catchAsyncError(async (req, res) => {
    const { rows: zones } = await db.query(`
        select * from zones order by zones.id;
    `);
    return res.send(zones);
  })
);

module.exports = router;
