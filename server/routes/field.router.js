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

/*
router.get('/fieldList/:userID', (req, res) => { // Get list of fields owned by a particular user. Eventually add authentication requirements so only authorized people can get this list.
    // GET route code here

    const userID = req.params.userID;

    const queryText = `SELECT * FROM "field"
        JOIN "user_field" ON "user_field"."field_id"="field"."id"
        WHERE "user_field"."id"=$1`;

    pool.query(queryText, [userID]).then(response => {
        console.log(response.rows);
        res.send(response.rows);
    }).catch(error => {
        console.log(`Error making database query ${queryText}`, error);
        res.sendStatus(500);
    })
});
*/



/**
 * POST route template
 */
router.post('/', (req, res) => {
    // POST route code here
});

router.post('/makefield', (req, res) => {

    const queryText = `
    INSERT INTO "field" (
    "year", "location", "acres",  "field_note", "name", "image", "shape_file", "gmo", "crop_id")
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id;`;

    pool.query(queryText, [year, location, acres, field_note, name, image, shape_file, gmo, crop_id])
        .then(response => {
            console.log(response.rows);
            // res.send(response.rows);
            res.sendStatus(201);
        }).catch(error => {
            console.log(`Error making database query ${queryText}`, error);
            res.sendStatus(500);
        })
});

module.exports = router;