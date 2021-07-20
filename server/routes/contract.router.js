const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
    rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const { response } = require('express');
const { default: transitions } = require('@material-ui/core/styles/transitions');


// -- GETS
//GET list of contracts associated with a user.
router.get('/getall', rejectUnauthenticated, (req, res) => {
    // GET route code here

    const userID = req.user.id;

    const queryText = `
   SELECT "contract"."id" AS "contractID", "contract"."commodity", "contract"."open_status",
"contract"."bushel_uid", "contract"."quantity_fulfilled", "contract"."price", "contract"."protein", "contract"."oil",
"contract"."moisture", "contract"."contract_quantity", "contract"."contract_handler", "contract"."container_serial",
"user_field"."id" AS "user_field_ID",
"user"."id" AS "userID", "user"."username", "user"."farmer", "user"."buyer", "user"."first_name", "user"."last_name",
"user"."super_admin",
"field"."id" AS "fieldID", "field"."year", "field"."name" AS "field_name", "field"."location", "field"."crop_id", "field"."acres", 
"field"."gmo", "field"."image" AS "field_image", "field"."shape_file", "field"."field_note",
"crop"."crop_type", "contract_status"."name", "NIR"."amino_acids", "NIR"."energy"
FROM "contract"
JOIN "user_field" ON ("user_field"."id"="contract"."user_field_id")
JOIN "user" ON ("user"."id"="user_field"."user_id")
JOIN "field" ON ("field"."id"="user_field"."field_id")
JOIN "crop" ON ("crop"."id" = "contract"."commodity")
JOIN "contract_status" ON ("contract_status"."id" = "contract"."open_status")
LEFT JOIN "NIR" ON "NIR"."field_id" = "user_field"."field_id"
WHERE "user"."id"=$1 ORDER BY "contract"."id";`;

    pool.query(queryText, [userID]).then(response => {
        console.log(response.rows);
        res.send(response.rows);
    }).catch(error => {
        console.log(`Error making database query ${queryText}`, error);
        res.sendStatus(500);
    })
});



router.get('/buyerGetAll', rejectUnauthenticated, (req, res) => {
        const buyerID = req.user.id;

        const queryText = `
            SELECT "contract"."id" AS "contractID", "contract"."buyer_id", "contract"."commodity", "contract"."open_status",
            "contract"."bushel_uid", "contract"."quantity_fulfilled", "contract"."price", "contract"."protein", "contract"."oil",
            "contract"."moisture", "contract"."contract_quantity", "contract"."contract_handler", "contract"."container_serial",
            "user_field"."id" AS "user_field_ID",
            "user"."id" AS "userID", "user"."username", "user"."farmer", "user"."buyer", "user"."first_name", "user"."last_name",
            "user"."super_admin",
            "field"."id" AS "fieldID", "field"."year", "field"."name" AS "field_name", "field"."location", "field"."crop_id", "field"."acres", 
            "field"."gmo", "field"."image" AS "field_image", "field"."shape_file", "field"."field_note",
            "crop"."crop_type", "contract_status"."name", "NIR"."amino_acids", "NIR"."energy"
            FROM "contract"
            JOIN "user_field" ON ("user_field"."id"="contract"."user_field_id")
            JOIN "user" ON ("user"."id"="user_field"."user_id")
            JOIN "field" ON ("field"."id"="user_field"."field_id")
            JOIN "crop" ON ("crop"."id" = "contract"."commodity")
            JOIN "contract_status" ON ("contract_status"."id" = "contract"."open_status")
            LEFT JOIN "NIR" ON "NIR"."field_id" = "user_field"."field_id"
            WHERE "contract"."buyer_id"=$1 ORDER BY "contract"."id";`;

    pool.query(queryText, [buyerID]).then(response => {
        console.log(response.rows);
        res.send(response.rows);
    }).catch(error => {
        console.log(`Error making database query ${queryText}`, error);
        res.sendStatus(500);
    })
})


router.get('/getContractShortList', rejectUnauthenticated, (req, res) => {
    // GET route code here

    const userID = req.user.id;

    const queryText = `
    SELECT "contract"."id" AS "contractID", "field"."name" AS "field_name", "field"."location",
    "crop"."crop_type", "contract"."buyer_id" AS "buyerID", "contract_status"."name" AS "contract_status",
    "contract"."quantity_fulfilled", "contract"."contract_handler", "user"."id" AS "userID"
    FROM "user_field"
    JOIN "user" ON ("user_field"."user_id" = "user"."id")
    JOIN "contract" ON ("contract"."user_field_id" = "user_field"."id")
    JOIN "field" ON ("field"."id" = "user_field"."field_id")
    JOIN "crop" ON ("field"."crop_id" = "crop"."id")
    JOIN "contract_status" ON ("contract"."open_status" = "contract_status"."id")
    WHERE "user"."id" = $1;`;

    pool.query(queryText, [userID]).then(response => {
        console.log(response.rows);
        res.send(response.rows);
    }).catch(error => {
        console.log(`Error making database query ${queryText}`, error);
        res.sendStatus(500);
    })
});



//GET contract status list for the dropdown on the contract form
router.get('/contractStatus', rejectUnauthenticated, (req, res) => {
    const queryText = `SELECT * FROM "contract_status";`;

    pool
        .query(queryText)
        .then(response => {
            // console.log('contract status list', response.rows);
            res.send(response.rows);
        })
        .catch(error => {
            console.log(`Error making database query ${queryText}`, error);
            res.sendStatus(500);
        })
})

// GET contract details
// router.get('/contractDetails/:contractID'), rejectUnauthenticated, (req, res) => {
//     //contractID on url
//     const contractID = req.params.contractID;
//     console.log('here is the contract ID from params:', contractID);


//     const queryText = `SELECT * FROM "contract" 
// JOIN "user_field" ON "user_field"."id" = "contract"."user_field_id"
// JOIN "user" ON "user"."id" = "user_field"."user_id"
// JOIN "NIR" ON "NIR"."field_id" = "user_field"."field_id"
// JOIN "crop" ON "crop"."id" = "contract"."commodity"
// JOIN "contract_status" ON "contract_status"."id" = "contract"."open_status"
// WHERE "contract"."id" = $1;`;

//     pool
//         .query(queryText, [contractID])
//         .then(response => {
//             console.log('contract details:', response.rows);
//             res.sendStatus(response.rows)

//         })
//         .catch(error => {
//             console.log('Error making query to database', error);
//             res.sendStatus(500);
//         })
// }

// -- POSTS
//POST a contract
router.post('/add_contract', rejectUnauthenticated, (req, res) => {

    const user_field_id = req.body.user_field_id; // $1

    const buyer_id = req.body.buyer_id; // $2

    const commodity = req.body.commodity; // $3
    const open_status = req.body.open_status; // $4
    const bushel_uid = req.body.bushel_uid; // $5
    const quantity_fulfilled = req.body.quantity_fulfilled; // $6
    const price = req.body.price; // $7
    const protein = req.body.protein; // $8
    const oil = req.body.oil; // $9
    const moisture = req.body.moisture; // $10
    const contract_quantity = req.body.contract_quantity; // $11
    const container_serial = req.body.container_serial; // $12
    const contract_handler = req.body.contract_handler; // $13

    //used for inserting into field transactions table
    //StatusTracker should reflect the field status during which the contract was created
    const field_status = req.body.field_status;


    const queryText = `
    INSERT INTO "contract" 
    ("user_field_id", "buyer_id", "commodity", "open_status", "bushel_uid", "quantity_fulfilled", "price", "protein", "oil", "moisture", "contract_quantity", "container_serial", "contract_handler")
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING "user_field_id";`;

    pool.query(queryText, [user_field_id, buyer_id, commodity, open_status, bushel_uid, quantity_fulfilled, price, protein, oil, moisture, contract_quantity, container_serial, contract_handler])
        .then(response => {
            console.log('response is', response.rows);
            const user_field_id = response.rows[0].user_field_id;
            console.log('user_field_id', user_field_id);
            // res.sendStatus(201)


            const user_field = `SELECT "user_field"."field_id" FROM "user_field" WHERE "id" = $1`;
            pool.query(user_field, [user_field_id])
                .then(async function (result) {
                    const fieldID = result.rows[0].field_id;

                    console.log('field id is', fieldID);


                    // const created_contract = response.rows[0].id;
                    const insert_contract = `
                    INSERT INTO "field_transactions" ("field_id", "timestamp", "status_notes", "field_status", "transaction_type" ) 
                    VALUES ($1, Now(), 'contract created during field status: ${field_status}', $2, (SELECT "id" FROM "transaction_type" WHERE "name" = '${field_status}'));`;
                    pool.query(insert_contract, [fieldID, field_status])
                        .then(result => {
                            res.sendStatus(201);
                        }).catch((err) => {
                            console.log(`Error in posting contract to transactions: ${err}`);
                            res.sendStatus(500);
                        })
                })

        }).catch(error => {
            console.log(`Error updating table ${queryText}`, error);
            res.sendStatus(500);
        })
});



// ---- PUTS ----

// What is going to be able to be updated on the contract ??? For now bringing in everything.

router.put('/update_contract/:contractID', rejectUnauthenticated, (req, res) => {

    const contractID = req.params.contractID; // $1
    const commodity = req.body.commodity; // $2
    const open_status = req.body.open_status; // $3
    const bushel_uid = req.body.bushel_uid; // $4
    const quantity_fulfilled = req.body.quantity_fulfilled; //$5
    const price = req.body.price; // $6
    const protein = req.body.protein; // $7
    const oil = req.body.oil; // $8
    const moisture = req.body.moisture; // $9
    const contract_quantity = req.body.contract_quantity; // $10
    const container_serial = req.body.container_serial; // $11
    const contract_handler = req.body.contract_handler; // $12

    //used to post to the field transactions table
    const transaction_type = req.body.transaction_type; // $2 on the second query


    const queryText =
        `UPDATE "contract"
        SET 
        "commodity" = $2,
        "open_status" = $3,
        "bushel_uid" = $4,
        "quantity_fulfilled" = $5,
        "price" = $6,
        "protein" = $7,
        "oil" = $8,
        "moisture" = $9,
        "contract_quantity" = $10,
        "container_serial" = $11,
        "contract_handler" = $12
        WHERE "id" = $1 RETURNING "user_field_id";`;

    pool
        .query(queryText, [
            contractID, // $1
            commodity, // $2
            open_status, // $3
            bushel_uid, // $4
            quantity_fulfilled, // $5
            price, // $6
            protein, // $7
            oil, // $8
            moisture, // $9
            contract_quantity, // $10
            container_serial, // $11
            contract_handler, // $12
        ])
        .then((result) => {
            console.log('contract was updated', result.rows[0].user_field_id);
            const field_id = result.rows[0].user_field_id;
            console.log('field id is', field_id);
            const queryTransaction = `INSERT INTO "field_transactions" ("field_id", "timestamp", "status_notes", "field_status", 
             "transaction_type" ) VALUES ($1, Now(), 'contract updated', (SELECT "name" FROM "transaction_type" WHERE "id" = $2) , $2);`;

            pool.query(queryTransaction, [field_id, transaction_type])
                .then((result) => {
                    console.log('Updating transaction table', result.rows);
                    res.sendStatus(204);
                }).catch(error => {
                    console.log(`Error updating table`, error);
                    res.sendStatus(500);

                })
        }).catch(error => {
            console.log(`Error updating table`, error);
            res.sendStatus(500);

        })
});


// ---- DELETES ----

router.delete('/delete_contract/:contractID', rejectUnauthenticated, (req, res) => {
    const queryText = `DELETE FROM "contract" WHERE "id" = $1; `;
    pool
        .query(queryText, [req.params.contractID])
        .then(() => res.sendStatus(204))
        .catch((error) => {
            console.log(error);
            res.sendStatus(500);
        });
});

module.exports = router;