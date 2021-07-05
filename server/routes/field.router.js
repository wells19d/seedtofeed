const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/test', (req, res) => {
    // GET route code here

    const queryText = `SELECT * FROM "field"
    JOIN "crop" ON ("crop"."id"="field"."crop_id");`;

    pool.query(queryText).then(response => {
        console.log(response.rows);
        res.send(response.rows);
    }).catch(error => {
        console.log(`Error making database query ${queryText}`, error);
        res.sendStatus(500);
    })
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
    // POST route code here
});

module.exports = router;