const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// -- GETS

/**
 * GET route template
 */
router.get('/getall/:userID', (req, res) => { // Gets list of contracts that the user has associated with them.
    // GET route code here

    const userID = req.params.userID;

    const queryText = `SELECT * FROM "contract"
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

//GET for the dropdown for the contract form
router.get('/contractStatus', (req, res) => { // Gets the contract status list
    const queryText = `
    SELECT * FROM "contract_status";
    `;
})

// -- POSTS

/**
 * POST route template
 */
router.post('/add_contract', (req, res) => {
    // POST route code here
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

router.put('/update_contract/:contractID', (req, res) => {

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
            res.sendStatus(204);
        })
        .catch((error) => {
            console.log('Error updating Entry', error);
            res.sendStatus(500);
        });
});


// ---- DELETES ----

router.delete('/delete_contract/:contractID', (req, res) => {
    const queryText =
        `
                                DELETE FROM "contract"
                                WHERE "id" = $1;
                                `;
    pool
        .query(queryText, [req.params.contractID])
        .then(() => res.sendStatus(204))
        .catch((error) => {
            console.log(error);
            res.sendStatus(500);
        });
});

module.exports = router;