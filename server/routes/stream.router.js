const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
   rejectUnauthenticated
} = require('../modules/authentication-middleware');

router.post('/bushel', async (req, res) => {
   // console.log('from postman', req.body);
   // const queryText1 = `SELECT "bushel_uid", "id", "user_field_id" FROM "contract" WHERE "open_status" != 6;`; //6 equals fulfilled
   // const queryText1 = `SELECT "bushel_uid", "id", "user_field_id" FROM "contract" WHERE "open_status" != (SELECT "id" FROM "contract_status" WHERE "name"='fulfilled');`;

   // const bushelContracts = await pool.query(queryText1);
   // console.log('bushel contracts from db', bushelContracts.rows);

   try {
      for (let item of req.body.data) {
         // console.log('bushel contract postman', item.contract);
         // let foundContract = bushelContracts.rows.find(contract => item.contract.id === contract.bushel_uid);

         // const queryText1 = `SELECT "bushel_uid", "id", "user_field_id" FROM "contract" WHERE bushel_uid=$1;`;
         const queryText1 = `
         SELECT "contract"."id" AS "contractID", "contract"."user_field_id", "contract"."open_status", "contract"."bushel_uid",
         "contract_status"."id" AS "contract_status_ID", "contract_status"."name"
         FROM "contract" JOIN "contract_status" ON ("contract"."open_status" = "contract_status"."id") 
         WHERE "bushel_uid"=$1;`;
         const bushelContracts = await pool.query(queryText1, [item.contract.id]);
         let foundContract = bushelContracts.rows[0];
         console.log('found Contract', foundContract);

         if (!foundContract) {
            console.log(`no contract found for ${item.contract.id}`);
            continue; // if no contract found, theres nothing to process (unless we want to do a new INSERT)
         }
         // console.log(`Found bushel contract from db: `, foundContract);

         // Case 1: Contract has been completed: 
         // update contract table to open_status = 'fulfilled' AND only look at records where the open_status is not 'fulfilled'
         // item.contract.completed is true, AND foundContract.open_status != 6
         
         if (item.contract.completed === true && foundContract.name !== 'fulfilled') {

            const queryText2 = `UPDATE "contract" SET "open_status" = (SELECT "id" FROM "contract_status" WHERE "name"='fulfilled') WHERE "bushel_uid" = $1;`;
            // const contractID = await pool.query(queryText2, [foundContract.bushel_uid]);
            await pool.query(queryText2, [foundContract.bushel_uid]);

            // console.log('found Contract user field ID', foundContract.user_field_id);

            const queryText3 = `SELECT "id", "field_id" FROM "user_field" WHERE "id" = $1;`;
            const transactionInsert = await pool.query(queryText3, [foundContract.user_field_id]);
            console.log('transaction insert', transactionInsert.rows[0].field_id);

            const queryText4 = `INSERT INTO "field_transactions" ("field_id", "timestamp", "status_notes", "field_status", "transaction_type")
               VALUES ($1, Now(), 'bushel contract paid/complete', 'elevator', (SELECT "id" FROM "transaction_type" WHERE "name" ='contract'));`;
            await pool.query(queryText4, [transactionInsert.rows[0].field_id]);
            console.log(`posted transaction for field: ${transactionInsert.rows[0].field_id}`);

         } else if (item.contract.filled === true && foundContract.name === 'signed') {
            const queryText2 = `UPDATE "contract" SET "open_status" = (SELECT "id" FROM "contract_status" WHERE "name"='delivered') WHERE "bushel_uid" = $1;`;
            // const contractID = await pool.query(queryText2, [foundContract.bushel_uid]);
            await pool.query(queryText2, [foundContract.bushel_uid]);

            console.log('found Contract user field ID', foundContract.user_field_id);

            const queryText3 = `SELECT "id", "field_id" FROM "user_field" WHERE "id" = $1;`;
            const transactionInsert = await pool.query(queryText3, [foundContract.user_field_id]);
            // console.log('transaction insert', transactionInsert.rows[0].field_id);

            const queryText4 = `INSERT INTO "field_transactions" ("field_id", "timestamp", "status_notes", "field_status", "transaction_type")
               VALUES ($1, Now(), 'bushel contract filled', 'elevator', (SELECT "id" FROM "transaction_type" WHERE "name" ='contract'));`;
            await pool.query(queryText4, [transactionInsert.rows[0].field_id]);
            console.log(`posted transaction for field: ${transactionInsert.rows[0].field_id}`);

         } else if (item.contract.signed === true && foundContract.name === 'pending') {
            const queryText2 = `UPDATE "contract" SET "open_status" = (SELECT "id" FROM "contract_status" WHERE "name"='signed') WHERE "bushel_uid" = $1;`;
            // const contractID = await pool.query(queryText2, [foundContract.bushel_uid]);
            await pool.query(queryText2, [foundContract.bushel_uid]);

            // console.log('found Contract user field ID', foundContract.user_field_id);

            const queryText3 = `SELECT "id", "field_id" FROM "user_field" WHERE "id" = $1;`;
            const transactionInsert = await pool.query(queryText3, [foundContract.user_field_id]);
            console.log('transaction insert', transactionInsert.rows[0].field_id);

            const queryText4 = `INSERT INTO "field_transactions" ("field_id", "timestamp", "status_notes", "field_status", "transaction_type")
               VALUES ($1, Now(), 'bushel contract signed', 'growing', (SELECT "id" FROM "transaction_type" WHERE "name" ='contract'));`;
            await pool.query(queryText4, [transactionInsert.rows[0].field_id]);
            console.log(`posted transaction for field: ${transactionInsert.rows[0].field_id}`);

         } else if (item.contract.priced === true && foundContract.name === 'created') {
            const queryText2 = `UPDATE "contract" SET "open_status" = (SELECT "id" FROM "contract_status" WHERE "name"='pending') WHERE "bushel_uid" = $1;`;
            // const contractID = await pool.query(queryText2, [foundContract.bushel_uid]);
            await pool.query(queryText2, [foundContract.bushel_uid]);

            // console.log('found Contract user field ID', foundContract.user_field_id);

            const queryText3 = `SELECT "id", "field_id" FROM "user_field" WHERE "id" = $1;`;
            const transactionInsert = await pool.query(queryText3, [foundContract.user_field_id]);
            console.log('transaction insert', transactionInsert.rows[0].field_id);

            const queryText4 = `INSERT INTO "field_transactions" ("field_id", "timestamp", "status_notes", "field_status", "transaction_type")
               VALUES ($1, Now(), 'bushel contract pending', 'growing', (SELECT "id" FROM "transaction_type" WHERE "name" ='contract'));`;
            await pool.query(queryText4, [transactionInsert.rows[0].field_id]);
            console.log(`posted transaction for field: ${transactionInsert.rows[0].field_id}`);

         } else {
            console.log('Some conditions not met');
         }
      }

      const queryText = `INSERT INTO "stream" ("source", "stream_type", "raw") VALUES ('bushel', 'unknown', $1) RETURNING *;`;
      await pool.query(queryText, [req.body]);

      res.sendStatus(201);
   } catch (error) {
      console.log('Error in updating bushel contract', error);
      res.sendStatus(500);
   }
});


router.get('/', rejectUnauthenticated, async (req, res) => {
   const queryText = `SELECT * FROM "stream" ORDER BY "created_at" DESC`
   try {
      const result = await pool.query(queryText);
      res.send(result.rows);
   } catch (err) {
      res.status(500).send(err);
   }
});

router.delete('/', rejectUnauthenticated, async (req, res) => {
   // Clear the entire stream table. Useful for when we reset 
   // the Bushel Push API pointer which will re-send all data
   const queryText = `DELETE FROM "stream";`
   try {
      const result = await pool.query(queryText);
      res.sendStatus(204);
   } catch (err) {
      res.status(500).send(err);
   }
});

module.exports = router;
