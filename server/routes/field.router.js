const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
    rejectUnauthenticated,
} = require('../modules/authentication-middleware');

// -- GETS --
router.get('/buyerFieldList', rejectUnauthenticated, (req, res) => {
    const userID = req.user.id;

    console.log(`This buyer's id is: `, userID);

    const queryText = `
    SELECT "field"."id", "user_field"."user_id" AS "farmer_id", "buyer_field"."id" AS "buyer_field_id", "field"."year", "field"."location", "field"."acres", "field"."field_note",
    "field"."name", "field"."image", "field"."shape_file", "field"."gmo", "field"."crop_id"
    FROM "field"
    JOIN "buyer_field" ON "buyer_field"."field_id"="field"."id"
    JOIN "user_field" ON "user_field"."field_id"="field"."id"
    WHERE "buyer_field"."buyer_id"=$1;`;

    pool.query(queryText, [userID]).then(async function (result) {
        console.log(result.rows);
        let modifiedFields = [];
        for (let field of result.rows) {
            let queryText = `SELECT "field_transactions"."field_status" FROM "field_transactions" WHERE "field_id"=$1 ORDER BY TIMESTAMP DESC LIMIT 1;`;
            // Save the result, probably into a new array for good measure
            const result2 = await pool.query(queryText, [field.id]);
            console.log(`Field ${field.id} transactions`, result2.rows);
            if (result2.rows.length > 0) {
                //the latest transactions
                field.field_status = result2.rows[0].field_status;
            } else {
                // no transactions have been recorded yet for the field
                field.field_status = 'pre-planting';
            }
            modifiedFields.push(field);
        }

        res.send(modifiedFields);
    }).catch(error => {
        console.log(`Error making database query ${queryText}`, error);
        res.sendStatus(500);
    })
})


//GET a list of fields
router.get('/fieldList', rejectUnauthenticated, (req, res) => {
    const userID = req.user.id;

    console.log('The ID for this user is: ', userID);

    const queryText = `
    SELECT "field"."id", "user_field"."id" AS "user_field_id", "field"."year", "field"."location", "field"."acres", "field"."field_note",

    "field"."name", "field"."image", "field"."shape_file", "field"."gmo", "field"."crop_id"
    FROM "field"
    JOIN "user_field" ON "user_field"."field_id"="field"."id"
    WHERE "user_field"."user_id"=$1
    ORDER BY "field"."id" ASC;`; // Added  "user_field"."user_id" AS "farmer_id"


    // const queryText = `
    // SELECT "field"."id", "user_field"."id" AS "user_field_id", "field"."year", "field"."location", "field"."acres", "field"."field_note",
    // "field"."name", "field"."image", "field"."shape_file", "field"."gmo", "field"."crop_id"
    // FROM "field"
    // JOIN "user_field" ON "user_field"."field_id"="field"."id"
    // WHERE "user_field"."user_id"=$1;`; // Need to find a way to add the following without it breaking:   "buyer_field"."id" AS "buyer_field_id", "buyer_field"."buyer_id"     and     JOIN "buyer_field" ON "buyer_field"."field_id"="field"."id"


    // We want each field to ALSO have a 'computed' field_status column
    // But that is on the most recent transaction for each given field

    // So we need to: loop over all the fields we found from the first query,
    // then for each field, grab the most recent transaction's field_status
    // Attach that to the field itself, or if no transactions, give it a default
    // then send those new modified fields back to the browser


    // JOIN "field_transactions"
    // ON "field_transactions".
    // "field_id" = "field".
    // "id"

    /* SELECT "field"."id","user_field"."id" AS "user_field_id" FROM "field"
JOIN "user_field" ON "user_field"."field_id"="field"."id"
WHERE "user_field"."user_id" = 1; */

    pool.query(queryText, [userID]).then(async function (result) {
        console.log(result.rows);
        let modifiedFields = [];
        for (let field of result.rows) {
            let queryText = `SELECT "field_transactions"."field_status" FROM "field_transactions" WHERE "field_id"=$1 ORDER BY TIMESTAMP DESC LIMIT 1;`;
            // Save the result, probably into a new array for good measure
            const result2 = await pool.query(queryText, [field.id]);
            console.log(`Field ${field.id} transactions`, result2.rows);
            if (result2.rows.length > 0) {
                //the latest transactions
                field.field_status = result2.rows[0].field_status;
            } else {
                // no transactions have been recorded yet for the field
                field.field_status = 'pre-planting';
            }
            modifiedFields.push(field);
        }

        res.send(modifiedFields);
    }).catch(error => {
        console.log(`Error making database query ${queryText}`, error);
        res.sendStatus(500);
    })
});


//GET field details by fieldID. Saga: fieldDetails.saga; Reducer: fieldDetails.reducer as an object
router.get('/fieldDetails/:fieldID', rejectUnauthenticated, (req, res) => {
    //fieldID on url
    const fieldID = req.params.fieldID;

    //replaced "*" for explicit columns in the query w/multiple joins. 
    //a captital "ID" was used as an alias to indicate the primaray key id of a table
    //for example, the field table now has "fieldID" instead of "id" in the query. 
    //attempt to clarify the columns in large joins
    const queryText = `
    SELECT "field"."id" AS "fieldID", "field"."year", "field"."location", "field"."acres", "field"."field_note", "field"."name" AS "field_name",
    "field"."image" AS "field_image", "field"."shape_file", "field"."gmo", "field"."crop_id", "user_field"."id" AS "user_field_ID",
    "user"."id" AS "userID", "user"."username", "user"."buyer", "user"."farmer", "user"."first_name", "user"."last_name", "user"."super_admin", 
    "field_transactions"."id" AS "field_transactionsID", "field_transactions"."timestamp" AS "field_transactions_timestamp",
    "field_transactions"."image" AS "field_transactions_image", "field_transactions"."field_status", "field_transactions"."transaction_type", 
    "contract"."id" AS "contractID", "contract"."open_status", "contract"."bushel_uid", "contract"."commodity",
    "contract"."container_serial", "contract"."quantity_fulfilled", "contract"."price", "contract"."protein", "contract"."oil", "contract"."moisture",
    "contract"."contract_handler", "contract_status"."id" AS "contract_status_ID", "contract_status"."name" AS "contract_status_name"
    FROM "field"
    JOIN "user_field" ON "user_field"."field_id"="field"."id"
    JOIN "user" ON "user"."id"="user_field"."user_id"
    JOIN "field_transactions" ON "field_transactions"."field_id"="field"."id"
    JOIN "contract" ON "contract"."user_field_id"="user_field"."id"
    JOIN "contract_status" ON "contract_status"."id"="contract"."open_status"
    WHERE "field"."id"=$1;`;

    pool.query(queryText, [fieldID]).then(response => {
        console.log(`Details for fieldID: ${fieldID}`, response.rows);
        res.send(response.rows);
    }).catch(error => {
        console.log(`Error making database query ${queryText}`, error);
        res.sendStatus(500);
    })

})


//GET crop dropdown list. Saga: cropList.saga, Reducer: cropList.reducer
router.get('/cropList', rejectUnauthenticated, (req, res) => {

    const queryText = `SELECT * FROM "crop";`;

    pool.query(queryText).then(response => {
        // console.log(response.rows);
        res.send(response.rows);
    }).catch(error => {
        console.log(`Error making database query ${queryText}`, error);
        res.sendStatus(500);
    })
});


//THIS MAY BE REPLACED BY GET /fieldList.
//GET list of field_transactions by fieldID. 
//Saga: fieldTransactions, Reducer: fieldTransactions.reducer
router.get('/transactions/:fieldID', rejectUnauthenticated, (req, res) => {
    const fieldID = req.params.fieldID;

    const queryText = `
    SELECT "field_transactions"."id" AS "field_transactions_ID", "field_transactions"."field_id", "field_transactions"."timestamp",
    "field_transactions"."status_notes", "field_transactions"."image", "field_transactions"."field_status", "field_transactions"."transaction_type",
    "transaction_type"."id" AS "transaction_type_ID", "transaction_type"."name"
    FROM "field_transactions"
    JOIN "transaction_type" ON "transaction_type"."id"="field_transactions"."transaction_type"
    WHERE "field_id"=$1
    ORDER BY "field_transactions"."timestamp" DESC;`;

    pool.query(queryText, [fieldID]).then(response => {
        console.log(response.rows);
        res.send(response.rows);
    }).catch(error => {
        console.log(`Error making database query ${queryText}`, error);
        res.sendStatus(500);
    })
});


//GET list of NIR results by fieldID
router.get('/NIR/:fieldID', rejectUnauthenticated, (req, res) => {
    //fieldID on url
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


//GET transaction types dropdown list.
router.get('/transactionTypes', rejectUnauthenticated, (req, res) => {

    const queryText = `SELECT * FROM "transaction_type" ORDER BY "id" ASC;`;

    pool.query(queryText).then(response => {
        console.log(response.rows);
        res.send(response.rows);
    }).catch(error => {
        console.log(`Error making database query ${queryText}`, error);
        res.sendStatus(500);
    })
});




// --- POSTS ----

//CREATE A FIELD
router.post('/makefield', rejectUnauthenticated, async (req, res) => {
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
    "year", "location", "acres", "field_note", "name", "image", "shape_file", "gmo", "crop_id")
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id;`;

    try {
        const response = await pool.query(queryText, [year, location, acres, field_note, name, image, shape_file, gmo, crop_id]);

        console.log(response.rows);

        //second query creates entry into user_field table
        const created_field = response.rows[0].id;
        const insert_field = `
        INSERT INTO "user_field" ("field_id", "user_id")
        VALUES ($1, $2);`;
        await pool.query(insert_field, [created_field, req.user.id])
        console.log(`Field ${created_field} connected to user_field`);
        res.sendStatus(201);
    } catch (error) {
        console.log(`Error making database query ${queryText}`, error);
        res.sendStatus(500);
    }

});



//CREATE A FIELD TRANSACTION
router.post('/create_transaction', rejectUnauthenticated, (req, res) => {
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


// CREATE NIR ANALYSIS
router.post('/create_NIR', rejectUnauthenticated, (req, res) => {
    console.log(`created NIR analysis`, req.body);

    const field_id = req.body.field_id; // $1
    const oil = req.body.oil; // $2 
    const moisture = req.body.moisture; //$3
    const protein = req.body.protein; // $4
    const energy = req.body.energy; //$5
    const amino_acids = req.body.amino_acids; // $6
    const tested_at = req.body.tested_at; // $7
    const transaction = req.body.fieldTrans;
    const fieldStatus = req.body.fieldStatus;

    const queryText = `INSERT INTO "NIR" 
    ("field_id", "oil", "moisture", "protein", "energy", "amino_acids", "tested_at") 
    VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;`;

    pool.query(queryText, [field_id, oil, moisture, protein, energy, amino_acids, tested_at])
        .then(result => {
            console.log('NIR was added', result.rows[0].field_id);
            const field_id = result.rows[0].field_id;
            console.log('field id is', field_id);
            const queryTransaction = `INSERT INTO "field_transactions"("field_id", "timestamp", "status_notes", "field_status",
        "transaction_type") VALUES($1, Now(), 'NIR added', $2, $3) RETURNING *; `;

            pool.query(queryTransaction, [field_id, fieldStatus, transaction])
                .then((result) => {
                    console.log('Updating transaction table with NIR', result.rows);
                }).catch(error => {
                    console.log(`Error updating table with NIR`, error);
                })
            res.sendStatus(201);
        }).catch(err => {
            console.log(err);
            res.sendStatus(500);
        })
});


// -- PUTS -- 
//edit/update the field table
router.put('/update/:fieldID', rejectUnauthenticated, (req, res) => {
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
    `;
    pool.query(queryText, [fieldID, year, location, acres, field_note, name, shape_file, gmo, crop_id, req.user.id]).then((response) => {
        res.sendStatus(204);
    }).catch((err) => {
        console.log('Error occurred for field UPDATE', err);
        res.sendStatus(500);
    })
})


router.put('/update_NIR/', rejectUnauthenticated, (req, res) => {

    const NIRID = req.body.NIRID;
    const field_id = req.body.field_id;
    const oil = req.body.oil;
    const moisture = req.body.moisture;
    const protein = req.body.protein;
    const energy = req.body.energy;
    const amino_acids = req.body.amino_acids;
    const transaction = req.body.fieldTrans;
    const fieldStatus = req.body.fieldStatus;


    const queryText = `UPDATE "NIR"
    SET "oil" = $1, "moisture" = $2, "protein" = $3, "energy" = $4, "amino_acids" = $5
    WHERE "id" = $6 RETURNING *;`;

    pool.query(queryText, [oil, moisture, protein, energy, amino_acids, NIRID])
        .then((result) => {
            console.log('field id is', field_id);

            const queryUpdate = `INSERT INTO "field_transactions"("field_id", "timestamp", "status_notes", "field_status",
            "transaction_type") VALUES($1, Now(), 'NIR updated', $2, $3) RETURNING *;`;

            pool.query(queryUpdate, [field_id, fieldStatus, transaction])
                .then((result) => {
                    console.log('Updating transaction table with NIR', result.rows);
                    res.sendStatus(201);
                }).catch(error => {
                    console.log(`Error updating table with NIR`, error);
                })
        }).catch(error => {
            console.log('Error making query: ', error);
            res.sendStatus(500);
        })
});



router.put('/update_transaction', rejectUnauthenticated, (req, res) => {
    console.log('Transaction update', req.body);

    const transaction_id = req.body.transaction_id;
    const status_notes = req.body.status_notes;
    const image = req.body.image;
    const field_status = req.body.field_status;
    const transaction_type = req.body.transaction_type;

    const queryText = `UPDATE "field_transactions"
    SET "status_notes" = $1, "image" = $2, "field_status" = $3, "transaction_type" = $4
    WHERE "id" = $5; `;

    pool.query(queryText, [status_notes, image, field_status, transaction_type, transaction_id]).then(result => {
        res.sendStatus(204);
    })
        .catch(error => {
            console.log('Error making query: ', error);
            res.sendStatus(500);
        })
})

// -- DELETES --

//DELETE a field
//Saga: deleteField.saga
router.delete('/delete_field/:fieldID', rejectUnauthenticated, (req, res) => {

    const queryText = `
    DELETE
    FROM "field"
    WHERE "id" = $1;
    `;

    pool.query(queryText, [req.params.fieldID])
        .then(() => res.sendStatus(204))
        .catch((error) => {
            console.log(error);
            res.sendStatus(500);
        });
});

router.delete('/delete_transaction/:transactionID', rejectUnauthenticated, (req, res) => {

    const queryText = `DELETE FROM "field_transactions" WHERE "id" = $1; `;

    pool.query(queryText, [req.params.transactionID])
        .then(() => res.sendStatus(204))
        .catch((error) => {
            console.log(error);
            res.sendStatus(500);
        });
})

router.delete('/delete_NIR/:NIRID', rejectUnauthenticated, (req, res) => {

    const NIRID = req.params.NIRID;

    const queryText = `DELETE
    FROM "NIR"
    WHERE "id" = $1;
    `;

    pool.query(queryText, [NIRID])
        .then(() => res.sendStatus(204))
        .catch((error) => {
            console.log(error);
            res.sendStatus(500);
        });
})


module.exports = router;