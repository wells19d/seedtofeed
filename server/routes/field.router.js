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
    const year = req.body.year;
    const location = req.body.location;
    const acres = req.body.acres;
    const field_note = req.body.field_note;
    const name = req.body.name;
    const image = req.body.image;
    const shape_file = req.body.shape_file;
    const gmo = req.body.gmo;
    const crop_id = req.body.crop_id;

    const queryText = `
    INSERT INTO "field" (
    "year", "location", "acres",  "field_note", "name", "image", "shape_file", "gmo", "crop_id")
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id;`;

    pool.query(queryText, [year, location, acres, field_note, name, image, shape_file, gmo, crop_id])
        .then(response => {
            console.log(response.rows);
            // res.send(response.rows);
            // res.sendStatus(201);

            const created_field = response.rows[0].id;
            const insert_field = `
            INSERT INTO "user_field" ("field_id", user_id)
            VALUES ($1, $2);`

            pool.query(insert_field, [created_field, req.user.id])
                .then(result => {
                    res.sendStatus(201);
                })
                .catch(err => {
                    console.log(err);
                    res.sendStatus(500);
                })

        }).catch(error => {
            console.log(`Error making database query ${queryText}`, error);
            res.sendStatus(500);
        })
});

module.exports = router;