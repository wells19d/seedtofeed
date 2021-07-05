const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/test', (req, res) => {
    // GET route code here

    const queryText = `SELECT * FROM "contract"
    JOIN "user_field" ON ("user_field"."id"="contract"."user_field_id")
    JOIN "user" ON ("user"."id"="user_field"."user_id")
    JOIN "field" ON ("field"."id"="user_field"."field_id");`;

    pool.query(queryText).then(response => {
        console.log(response.rows);
        res.send(response.rows);
    }).catch(error => {
        console.log(`Error making database query ${queryText}`, error);
        res.sendStatus(500);
    })
});

/* SELECT * FROM "contract"
JOIN "user_field" ON ("user_field"."id"="contract"."user_field_id")
JOIN "user" ON ("user"."id"="user_field"."user_id")
JOIN "field" ON ("field"."id"="user_field"."field_id"); */

/**
 * POST route template
 */
router.post('/', (req, res) => {
    // POST route code here
});

module.exports = router;