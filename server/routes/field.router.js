const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// -- GETS --

/**
 * GET route template
 */
// router.get('/test', (req, res) => {
//     // GET route code here

//     const queryText = `SELECT * FROM "field"
//     JOIN "crop" ON ("crop"."id"="field"."crop_id");`;

//     pool.query(queryText).then(response => {
//         console.log(response.rows);
//         res.send(response.rows);
//     }).catch(error => {
//         console.log(`Error making database query ${queryText}`, error);
//         res.sendStatus(500);
//     })
// });


router.get('/fieldList/:userID', (req, res) => { // Get list of fields owned by a particular user. Eventually add authentication requirements so only authorized people can get this list.
    // GET route code here

    const userID = req.params.userID;

    const queryText = `SELECT * FROM "field"
        JOIN "user_field" ON "user_field"."field_id"="field"."id"
        JOIN "field_transactions" ON "field_transactions"."field_id"="field"."id"
        WHERE "user_field"."user_id"=$1;`;

    pool.query(queryText, [userID]).then(response => {
        console.log(response.rows);
        res.send(response.rows);
    }).catch(error => {
        console.log(`Error making database query ${queryText}`, error);
        res.sendStatus(500);
    })
});



router.get('/fieldDetails/:fieldID', (req, res) => { // Eventually add authentication. Eventually change the * into the particualr fields we want to GET.
    const fieldID = req.params.fieldID;

    const queryText = `SELECT * FROM "field"
        JOIN "user_field" ON "user_field"."field_id"="field"."id"
        JOIN "user" ON "user"."id"="user_field"."user_id"
        JOIN "field_transactions" ON "field_transactions"."field_id"="field"."id"
        JOIN "contract" ON "contract"."user_field_id"="user_field"."id"
        JOIN "contract_status" ON "contract_status"."id"="contract"."open_status"
        WHERE "field"."id"=$1;`;
    // No idea if this query will work or not. Needs to be tested.

    pool.query(queryText, [fieldID]).then(response => {
        console.log(response.rows);
        res.send(response.rows);
    }).catch(error => {
        console.log(`Error making database query ${queryText}`, error);
        res.sendStatus(500);
    })

})



router.get('/cropList', (req, res) => { // This is primarily to get the list of crops for dropdowns

    const queryText = `SELECT * FROM "crop";`;

    pool.query(queryText).then(response => {
        console.log(response.rows);
        res.send(response.rows);
    }).catch(error => {
        console.log(`Error making database query ${queryText}`, error);
        res.sendStatus(500);
    })
});



router.get('/transactions/:fieldID', (req, res) => { // Gets list of transactions on a particular field. Eventually will have to make authentication so only people with permission to view field can get this information.
    const fieldID = req.params.fieldID;

    const queryText = `SELECT * FROM "field_transactions"
        JOIN "transaction_type" ON "transaction_type"."id"="field_transactions"."transaction_type"
        WHERE "field_id"=$1;`;

    pool.query(queryText, [fieldID]).then(response => {
        console.log(response.rows);
        res.send(response.rows);
    }).catch(error => {
        console.log(`Error making database query ${queryText}`, error);
        res.sendStatus(500);
    })
});


// -- 
router.get('/NIR/:fieldID', (req, res) => { // Gets list of NIR results for a field from the database. Eventually will have to make authentication so only people with permission to view said field can make this GET request.
    const fieldID = req.params.fieldID;

    const queryText = `SELECT * FROM "NIR" WHERE "field_id"=$1;`;

    pool.query(queryText, [fieldID]).then(response => {
        console.log(response.rows);
        res.send(response.rows);
    }).catch(error => {
        console.log(`Error making database query ${queryText}`, error);
        res.sendStatus(500);
    })
});



router.get('/transactionTypes', (req, res) => { // This is to get a dropdown of transaction types for the POST "create_transaction".

    const queryText = `SELECT * FROM "transaction_type"
                        ORDER BY "id" ASC;`;

    pool.query(queryText).then(response => {
        console.log(response.rows);
        res.send(response.rows);
    }).catch(error => {
        console.log(`Error making database query ${queryText}`, error);
        res.sendStatus(500);
    })
});




// --- POSTS ----


/**
 * POST route template
 */
// router.post('/', (req, res) => {
//     // POST route code here
// });

router.post('/makefield', (req, res) => {
    const year = req.body.year;
    const location = req.body.location;
    const acres = req.body.acres;
    const field_note = req.body.field_note;
    const name = req.body.name;
    const image = req.body.image;
    const shape_file = req.body.shape_file;
    const gmo = req.body.gmo;
    const crop_id = req.body.cropType;

    const queryText = `
    INSERT INTO "field" (
    "year", "location", "acres",  "field_note", "name", "image", "shape_file", "gmo", "crop_id")
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id;`;

    pool.query(queryText, [year, location, acres, field_note, name, image, shape_file, gmo, crop_id])
        .then(response => {
            console.log(response.rows);
            // res.send(response.rows);
            // res.sendStatus(201);

            //second query creates entry into user_field table
            const created_field = response.rows[0].id;
            const insert_field = `
            INSERT INTO "user_field" ("field_id", user_id)
            VALUES ($1, $2);`

            pool.query(insert_field, [created_field, req.user.id])
                .then(result => {
                    console.log(`Field ${created_field} connected to user_field`);
                    res.sendStatus(201);
                })
                .catch(err => {
                    console.log(err);
                    res.sendStatus(500);
                })

            //third query creates entry into the NIR table
            // const insert_NIR =
            //     `INSERT INTO "NIR" ("field_id")
            //  VALUES ($1);`;

            // pool.query(insert_NIR, [created_field])
            //     .then(result => {
            //         console.log(`Field ${created_field} connected to NIR`);
            //         res.sendStatus(201);
            //     })
            //     .catch(err => {
            //         console.log(err);
            //         res.sendStatus(500);
            //     })

            //fourth query creates entry into the field_transactions table
            // const insert_FieldTransactions =
            //     `INSERT INTO "field_transactions" ("field_id")
            //  VALUES ($1);`;

            // pool.query(insert_FieldTransactions, [created_field])
            //     .then(result => {
            //         console.log(`Field ${created_field} connected to field_transactions`);
            //         res.sendStatus(201);
            //     })
            //     .catch(err => {
            //         console.log(err);
            //         res.sendStatus(500);
            //     })

        }).catch(error => {
            console.log(`Error making database query ${queryText}`, error);
            res.sendStatus(500);
        })
});

// CREATE A FIELD TRANSACTION
// will need user authentaction
router.post('/create_transaction', (req, res) => {
    console.log(`here is the created transaction`, req.body);

    const field_id = req.body.field_id; // $1
    const timestamp = req.body.timestamp; // $2 
    const status_notes = req.body.status_notes; //$3
    const image = req.body.image; // $4
    const field_status = req.body.field_status; //$5
    const transaction_type = req.body.transaction_type; // $6

    const queryText = `INSERT INTO "field_transactions" 
    ("field_id", "timestamp", "status_notes", "image", "field_status", "transaction_type")
    VALUES ($1, $2, $3, $4, $5, $6)`

    pool.query(queryText, [field_id, timestamp, status_notes, image, field_status, transaction_type])
        .then(result => {
            res.sendStatus(201);
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(500);
        })

});


// Tested
// CREATE NIR ANALYSIS
// will need user authentaction
router.post('/create_NIR', (req, res) => {
    console.log(`here is the created NIR analysis`, req.body);

    const field_id = req.body.field_id; // $1
    const oil = req.body.oil; // $2 
    const moisture = req.body.moisture; //$3
    const protein = req.body.protein; // $4
    const energy = req.body.energy; //$5
    const amino_acids = req.body.amino_acids; // $6
    const tested_at = req.body.tested_at // $7

    const queryText = `INSERT INTO "NIR" 
    (field_id, oil, moisture, protein, energy, amino_acids, tested_at) 
    VALUES ($1, $2, $3, $4, $5, $6, $7);
`

    pool.query(queryText, [field_id, oil, moisture, protein, energy, amino_acids, tested_at])
        .then(result => {
            res.sendStatus(201);
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(500);
        })

});

// -- PUTS -- 
//edit/update the field table
//will need user rejectUnauthenticated
// 
router.put('/update/:fieldID', (req, res) => {
    console.log('field table update', req.body);

    const fieldID = req.params.fieldID; // $1
    const year = req.body.year; // $2
    const location = req.body.location; // $3
    const acres = req.body.acres; // $4
    const field_note = req.body.field_note; // $5
    const name = req.body.name; // $6
    const shape_file = req.body.shape_file; // $7
    const gmo = req.body.gmo; // $8
    const crop_id = req.body.crop_id; //$9


    const queryText = `
            UPDATE "field"
            SET "year" = $2, "location" = $3, "acres" = $4, "field_note" = $5, "name" = $6, "shape_file" = $7, "gmo" = $8, "crop_id" = $9
            FROM "user_field"
            WHERE "field"."id" = $1 AND "user_field"."user_id" = $10;
            `
    pool.query(queryText, [fieldID, year, location, acres, field_note, name, shape_file, gmo, crop_id, req.user.id]).then((response) => {
        console.log(`
            Field ${fieldID}
            was updated to ${req.body}
            by ${req.user.id}
            `);

        res.sendStatus(204);
    }).catch((err) => {
        console.log('Error occurred for field UPDATE', err);
        res.sendStatus(500);
    })
})

// -- DELETES --

router.delete('/delete_field/:fieldID', (req, res) => {
    const queryText =
        `DELETE
        FROM "field"
        WHERE "id" = $1;
        `;
    pool
        .query(queryText, [req.params.fieldID])
        .then(() => res.sendStatus(204))
        .catch((error) => {
            console.log(error);
            res.sendStatus(500);
        });
});




// FOR EDITING COLUMNS INDIVIDUALLY. MAY NOT NEED
// edit location column
// router.put('/:fieldID/location', (req, res) => {
//     console.log('edit the location', req.body);
//     const fieldID = req.params.fieldID;
//     const location = req.body.location;

//     queryText = `
//             UPDATE "field"
//             SET "location" = $2
//             WHERE "id" = $1;
//             `
//     pool.query(queryText, [fieldID, locati]).then((response) => {
//         console.log(`
//             Field ${fieldID}
//             locatioon was updated to ${location}
//             `);
//         res.sendStatus(204);
//     }).catch((err) => {
//         console.log('Error occurred for field year UPDATE', err);
//         res.sendStatus(500);
//     })
// })

// // edit acres column
// router.put('/:fieldID/acres', (req, res) => {
//     console.log('edit the acres', req.body);
//     const fieldID = req.params.fieldID;
//     const acres = req.body.acres;

//     queryText = `
//             UPDATE "field"
//             SET "acres "
//             id " = $2
//             WHERE "id" = $1;
//             `
//     pool.query(queryText, [fieldID, acres]).then((response) => {
//         console.log(`
//             Field ${fieldID}
//             acres was updated to $ { acres }
//             `);
//         res.sendStatus(204);
//     }).catch((err) => {
//         console.log('Error occurred for field year UPDATE', err);
//         res.sendStatus(500);
//     })
// })

// // edit field_note column
// router.put('/:fieldID/field_note', (req, res) => {
//     console.log('edit the field_note', req.body);
//     const fieldID = req.params.fieldID;
//     const field_note = req.body.field_note;

//     queryText = `
//             UPDATE "field"
//             SET "field_note "
//             id " = $2
//             WHERE "id" = $1;
//             `
//     pool.query(queryText, [fieldID, field_note]).then((response) => {
//         console.log(`
//             Field ${fieldID}
//             field_note was updated to ${field_note}
//             `);
//         res.sendStatus(204);
//     }).catch((err) => {
//         console.log('Error occurred for field year UPDATE', err);
//         res.sendStatus(500);
//     })
// })

// // edit name column
// router.put('/:fieldID/name', (req, res) => {
//     console.log('edit the name', req.body);
//     const fieldID = req.params.fieldID;
//     const name = req.body.name;

//     queryText = `
//             UPDATE "field"
//             SET "name "
//             id " = $2
//             WHERE "id" = $1;
//             `
//     pool.query(queryText, [fieldID, name]).then((response) => {
//         console.log(`
//             Field ${fieldID}
//             name was updated to ${name}
//             `);
//         res.sendStatus(204);
//     }).catch((err) => {
//         console.log('Error occurred for field year UPDATE', err);
//         res.sendStatus(500);
//     })
// })

// // edit image column
// router.put('/:fieldID/image', (req, res) => {
//     console.log('edit the image', req.body);
//     const fieldID = req.params.fieldID;
//     const image = req.body.image;

//     queryText = `
//             UPDATE "field"
//             SET "image "
//             id " = $2
//             WHERE "id" = $1;
//             `
//     pool.query(queryText, [fieldID, image]).then((response) => {
//         console.log(`
//             Field ${fieldID}
//             image was updated to ${image}
//             `);
//         res.sendStatus(204);
//     }).catch((err) => {
//         console.log('Error occurred for field year UPDATE', err);
//         res.sendStatus(500);
//     })
// })

// // edit shape_file column
// router.put('/:fieldID/shape_file', (req, res) => {
//     console.log('edit the shape_file', req.body);
//     const fieldID = req.params.fieldID;
//     const shape_file = req.body.shape_file;

//     queryText = `
//             UPDATE "field"
//             SET "shape_file "
//             id " = $2
//             WHERE "id" = $1;
//             `
//     pool.query(queryText, [fieldID, shape_file]).then((response) => {
//         console.log(`
//             Field ${fieldID}
//             shape_file was updated to ${shape_file}
//             `);
//         res.sendStatus(204);
//     }).catch((err) => {
//         console.log('Error occurred for field year UPDATE', err);
//         res.sendStatus(500);
//     })
// })

// // edit gmo column
// router.put('/:fieldID/gmo', (req, res) => {
//     console.log('edit the gmo', req.body);
//     const fieldID = req.params.fieldID;
//     const gmo = req.body.gmo;

//     queryText = `
//             UPDATE "field"
//             SET "gmo "
//             id " = $2
//             WHERE "id" = $1;
//             `
//     pool.query(queryText, [fieldID, gmo]).then((response) => {
//         console.log(`
//             Field ${fieldID}
//             gmo was updated to ${gmo}
//             `);
//         res.sendStatus(204);
//     }).catch((err) => {
//         console.log('Error occurred for field year UPDATE', err);
//         res.sendStatus(500);
//     })
// })

// // edit crop_id column
// router.put('/:fieldID/crop_id', (req, res) => {
//     console.log('edit the crop_id', req.body);
//     const fieldID = req.params.fieldID;
//     const crop_id = req.body.crop_id;

//     queryText = `
//             UPDATE "field"
//             SET "crop_id "
//             id " = $2
//             WHERE "id" = $1;
//             `
//     pool.query(queryText, [fieldID, crop_id]).then((response) => {
//         console.log(`
//             Field ${fieldID}
//             crop_id was updated to ${crop_id}
//             `);
//         res.sendStatus(204);
//     }).catch((err) => {
//         console.log('Error occurred for field year UPDATE', err);
//         res.sendStatus(500);
//     })
// })







module.exports = router;