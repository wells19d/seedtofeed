const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get('/', (req, res) => {
  const queryText = 'SELECT * from "uploads" order by uploaded_at DESC';
  pool.query(queryText)
    .then((result) => res.send(result.rows))
    .catch((err) => {
      console.log(err);
      res.sendStatus(500)
    });
});

router.post('/', (req, res) => {
  const { description, file_url, file_type } = req.body;
  const queryText = 'INSERT INTO "uploads" (description, file_url, file_type) VALUES ($1, $2, $3);';
  pool.query(queryText, [description, file_url, file_type])
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.log(err);
      res.sendStatus(500)
    });
});

router.delete('/:id', (req, res) => {
  const queryText = 'DELETE FROM "uploads" WHERE id=$1;';
  pool.query(queryText, [req.params.id])
    .then(() => res.sendStatus(204))
    .catch((err) => {
      console.log(err);
      res.sendStatus(500)
    });
});

module.exports = router;