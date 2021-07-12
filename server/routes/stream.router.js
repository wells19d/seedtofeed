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



   //   console.log('from postman', req.body.data.contract);
   //   let contractStuff = [];
   //   for (let item of req.body.data) {
   //      console.log('the contract id', item.contract.id);
   //   }

// const queryText = `INSERT INTO "stream" ("source", "stream_type", "raw") VALUES ('bushel', 'unknown', $1) RETURNING *;`
// try {
//    const result = await pool.query(queryText, [req.body]);
//    res.status(201).send(result.rows[0]);

   const queryText = `SELECT "bushel_uid", "id" FROM "contract";`;
   try {
      const contractIDs = await pool.query(queryText);
      console.log('response contract table', contractIDs.rows);
      res.status(201).send(contractIDs.rows);
      } catch (err) {
         res.status(500).send(err);
      }

   //catch for outer query
   // } catch (err) {
   //    res.status(500).send(err);
   // }
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
