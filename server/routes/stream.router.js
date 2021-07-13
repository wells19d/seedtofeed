const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
   rejectUnauthenticated
} = require('../modules/authentication-middleware');

router.post('/bushel', async (req, res) => {
   // We dont really know yet what incoming data will look like,
   // so just store the raw body directly as JSONB
   //process the incoming req.body to update our contract
   //1. verify that we have contracts req.body
   //2. loop over req.body.data to keep extract ALL contracts
   //3. select bushel_uid from contract table
   //4. compare to find match and update our contract record
   //5. update right in the contract table
   //6. create transaction record on transaction table
   console.log('from postman', req.body);
   const queryText1 = `SELECT "bushel_uid", "id", "user_field_id" FROM "contract" WHERE "open_status" != 6;`;
   const bushelContracts = await pool.query(queryText1);
   console.log('bushel contracts from db', bushelContracts.rows);


   try {
      if (bushelContracts.length === 0) {
         console.log('No contracts meet the criteria');
         }

      else {
         for (let item of req.body.data) {
            // console.log('bushel contract postman', item.contract);
            let foundContract = bushelContracts.rows.find(contract => item.contract.id === contract.bushel_uid);
            if (!foundContract) {
               console.log(`no contract found for ${item.contract.id}`);
            } else {
               console.log('found Contract', foundContract);
            }
            
            if (item.contract.completed === true) {
               const queryText2 = `UPDATE "contract" SET "open_status" = 6 WHERE "bushel_uid" = $1 RETURNING "id", "user_field_id";`;
               const contractID = await pool.query(queryText2, [foundContract.bushel_uid]);
               console.log('contract table response', contractID.rows);
   
               const queryText3 = `SELECT "id", "field_id" FROM "user_field" WHERE "id" = $1;`;
               const transactionInsert = await pool.query(queryText3, [foundContract.user_field_id]);
               console.log('transaction insert', transactionInsert.rows);
   
               const queryText4 = `INSERT INTO "field_transactions" ("field_id", "timestamp", "status_notes", "field_status", "transaction_type")
               VALUES ($1, Now(), 'bushel contract complete', 'elevator', 5);`;
               const updateTransaction = await pool.query(queryText4, [transactionInsert.rows[0].field_id]);
               console.log(`posted transaction for field: ${transactionInsert.rows[0].field_id}`);
   
   
            }
      }
   }
      res.sendStatus(201);
      const queryText = `INSERT INTO "stream" ("source", "stream_type", "raw") VALUES ('bushel', 'unknown', $1) RETURNING *;`
      try {
         const result = await pool.query(queryText, [req.body]);
         // res.send(result.rows[0]);
   
      } catch (err) {
      res.status(500).send(err);
      }
   

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
