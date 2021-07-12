const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated
} = require('../modules/authentication-middleware');

router.post('/bushel', async (req, res) => {
  // We dont really know yet what incoming data will look like,
  // so just store the raw body directly as JSONB
  const queryText = `INSERT INTO "stream" ("source", "stream_type", "raw") VALUES ('bushel', 'unknown', $1) RETURNING *;`
  try {
     const result = await pool.query(queryText, [req.body]);
     res.status(201).send(result.rows[0]);
  } catch (err) {
     res.status(500).send(err);
  }
});

router.get('/', rejectUnauthenticated, async (req, res) => {
  const queryText = `SELECT * FROM "stream" ORDER BY "created_at" DESC`
  try {
     const result = await pool.query(queryText);
     res.send(result.rows);
  } catch (err) {
     res.status(500).send(err);
  }
});

router.delete('/', rejectUnauthenticated, async (req, res) => {
  // Clear the entire stream table. Useful for when we reset 
  // the Bushel Push API pointer which will re-send all data
  const queryText = `DELETE FROM "stream";`
  try {
     const result = await pool.query(queryText);
     res.sendStatus(204);
  } catch (err) {
     res.status(500).send(err);
  }
});

module.exports = router;
