const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
    rejectUnauthenticated,
} = require('../modules/authentication-middleware');


// -- GETS
//GET list of contracts associated with a user.
router.get('/getall/:userID', rejectUnauthenticated, (req, res) => { 
    // GET route code here

    const userID = req.user.id;

    const queryText = `
    SELECT "contract"."id" AS "contractID", "contract"."commodity", "contract"."open_status",
    "contract"."bushel_uid", "contract"."quantity_fulfilled", "contract"."price", "contract"."protein", "contract"."oil",
    "contract"."moisture", "contract"."contract_quantity", "contract"."contract_handler",
    "user_field"."id" AS "user_field_ID",
    "user"."id" AS "userID", "user"."username", "user"."farmer", "user"."buyer", "user"."first_name", "user"."last_name",
    "user"."super_admin",
    "field"."id" AS "fieldID", "field"."year", "field"."name" AS "field_name", "field"."location", "field"."crop_id", "field"."acres", 
    "field"."gmo", "field"."image" AS "field_image", "field"."shape_file", "field"."field_note" 
    FROM "contract"
    JOIN "user_field" ON ("user_field"."id"="contract"."user_field_id")
    JOIN "user" ON ("user"."id"="user_field"."user_id")
    JOIN "field" ON ("field"."id"="user_field"."field_id")
    WHERE "user"."id"=$1;`;

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
            console.log('contract status list', response.rows);
            res.send(response.rows);
        })
        .catch(error => {
            console.log(`Error making database query ${queryText}`, error);
            res.sendStatus(500);
        })
})

// GET contract details
// router.get('contract_details/:contractID'), rejectUnauthenticated, (req, res) => {

//     const queryText = `SELECT * FROM "contract" WHERE "id" = $1;`;
// }

// -- POSTS
//POST a contract
router.post('/add_contract', rejectUnauthenticated, (req, res) => {
    
    const user_field_id = req.body.user_field_id; // $1
    const commodity = req.body.commodity; // $2
    const open_status = req.body.open_status; // $3
    const bushel_uid = req.body.bushel_uid; // $4
    const quantity_fulfilled = req.body.quantity_fulfilled; // $5
    const price = req.body.price; // $6
    const protein = req.body.protein; // $7
    const oil = req.body.oil; // $8
    const moisture = req.body.moisture; // $9
    const contract_quantity = req.body.contract_quantity; // $10
    const container_serial = req.body.container_serial; // $11
    const contract_handler = req.body.contract_handler; // $12

    const queryText = `
    INSERT INTO "contract" 
    ("user_field_id", "commodity", "open_status", "bushel_uid", "quantity_fulfilled", "price", "protein", "oil", "moisture", "contract_quantity", "container_serial", "contract_handler")
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12);`;

    pool.query(queryText, [user_field_id, commodity, open_status, bushel_uid, quantity_fulfilled, price, protein, oil, moisture, contract_quantity, container_serial, contract_handler])
        .then(result =>
            res.sendStatus(201)
        )
        .catch((err) => {
            console.log(`Error in creating contract: ${err}`);
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
        WHERE "id" = $1;
        `;

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
            contract_handler // $12
        ])
        .then((result) => {
            // console.log('Updating Entry', result.rows);
            // res.sendStatus(204);
            const userFieldId = result.rows.user_field_id;
            console.log('field id is', userFieldId);

            const queryTransaction = `INSERT INTO "field_transactions" ("field_id", "timestamp", "status_notes", "field_status", 
         "transaction_type" ) VALUES ($1, Now(), 'contract updated', 'contract updated', 10);`;

            pool.query(queryTransaction, [userFieldId])
                .then((result) => {
                    console.log('Updating transaction table', result.rows);
                    res.sendStatus(204);
                }).catch(error => {
                    console.log(`Error updating table`, error);
                    res.sendStatus(500);

                })
        })
        .catch((error) => {
            console.log('Error updating Entry', error);
            res.sendStatus(500);
        });
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