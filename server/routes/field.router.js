const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');

// -- GETS --
router.get('/buyerFieldList', rejectUnauthenticated, (req, res) => {
  const userID = req.user.id;

  const queryText = `
    SELECT "field"."id", "user_field"."user_id" AS "farmer_id", "buyer_field"."id" AS "buyer_field_id", "field"."year", "field"."location", "field"."acres", "field"."field_note",
    "field"."name", "field"."image", "field"."shape_file", "field"."gmo", "field"."crop_id"
    FROM "field"
    JOIN "buyer_field" ON "buyer_field"."field_id"="field"."id"
    JOIN "user_field" ON "user_field"."field_id"="field"."id"
    WHERE "buyer_field"."buyer_id"=$1;`;

  pool
    .query(queryText, [userID])
    .then(async function (result) {
      let modifiedFields = [];
      for (let field of result.rows) {
        let queryText = `SELECT "field_transactions"."field_status" FROM "field_transactions" WHERE "field_id"=$1 ORDER BY TIMESTAMP DESC LIMIT 1;`;
        // Save the result, probably into a new array for good measure
        const result2 = await pool.query(queryText, [field.id]);
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
    })
    .catch((error) => {
      console.log(`Error making database query ${queryText}`, error);
      res.sendStatus(500);
    });
});

//GET a list of fields
router.get('/fieldList', rejectUnauthenticated, (req, res) => {
  const userID = req.user.id;

  const queryText = `
    SELECT "field"."id", "user_field"."id" AS "user_field_id", "field"."year", "field"."location", "field"."acres", "field"."field_note",

    "field"."name", "field"."image", "field"."shape_file", "field"."gmo", "field"."crop_id"
    FROM "field"
    JOIN "user_field" ON "user_field"."field_id"="field"."id"
    WHERE "user_field"."user_id"=$1
    ORDER BY "field"."id" ASC;`;

  pool
    .query(queryText, [userID])
    .then(async function (result) {
      let modifiedFields = [];
      for (let field of result.rows) {
        let queryText = `SELECT "field_transactions"."field_status" FROM "field_transactions" WHERE "field_id"=$1 ORDER BY TIMESTAMP DESC LIMIT 1;`;
        // Save the result, probably into a new array for good measure
        const result2 = await pool.query(queryText, [field.id]);
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
    })
    .catch((error) => {
      console.log(`Error making database query ${queryText}`, error);
      res.sendStatus(500);
    });
});

//GET field details by fieldID. Saga: fieldDetails.saga; Reducer: fieldDetails.reducer as an object
router.get('/fieldDetails/:fieldID', rejectUnauthenticated, (req, res) => {
  const fieldID = Number(req.params.fieldID);

  const queryText = `
    SELECT "field"."id" AS "fieldID", "field"."name" AS "field_name", "field"."crop_id",
     "transaction_type"."name", "transaction_type"."workflow_images", "field_transactions"."field_status",
     "crop"."crop_type"
    FROM "field"
    JOIN "field_transactions" ON "field_transactions"."field_id"="field"."id"
    JOIN "transaction_type" ON "transaction_type"."id" = "field_transactions"."transaction_type"
    JOIN "crop" ON "field"."crop_id" = "crop"."id" 
    WHERE "field"."id"=$1;`;

  pool
    .query(queryText, [fieldID])
    .then((response) => {
      res.send(response.rows);
    })
    .catch((error) => {
      console.log(`Error making database query ${queryText}`, error);
      res.sendStatus(500);
    });
});

//GET crop dropdown list. Saga: cropList.saga, Reducer: cropList.reducer
router.get('/cropList', rejectUnauthenticated, (req, res) => {
  const queryText = `SELECT * FROM "crop";`;

  pool
    .query(queryText)
    .then((response) => {
      res.send(response.rows);
    })
    .catch((error) => {
      console.log(`Error making database query ${queryText}`, error);
      res.sendStatus(500);
    });
});

//THIS MAY BE REPLACED BY GET /fieldList.
//GET list of field_transactions by fieldID.
//Saga: fieldTransactions, Reducer: fieldTransactions.reducer
router.get('/transactions/:fieldID', rejectUnauthenticated, (req, res) => {
  const fieldID = req.params.fieldID;

  const queryText = `
    SELECT "field_transactions"."id" AS "field_transactions_ID", "field_transactions"."field_id", "field_transactions"."timestamp",
    "field_transactions"."status_notes", "field_transactions"."image", "field_transactions"."field_status", "field_transactions"."transaction_type",
    "transaction_type"."id" AS "transaction_type_ID", "transaction_type"."name", "transaction_type"."workflow_images", "field"."name" AS "field_name",
    "field"."crop_id", "field"."image" AS "field_image"
    FROM "field_transactions"
    JOIN "field" ON "field"."id" = "field_transactions"."field_id"
    JOIN "transaction_type" ON "transaction_type"."id"="field_transactions"."transaction_type"
    JOIN "user_field" ON "user_field"."field_id" = "field_transactions"."field_id"
    WHERE "field_transactions"."field_id"=$1
    ORDER BY "field_transactions"."timestamp" DESC;`;

  pool
    .query(queryText, [fieldID])
    .then((response) => {
      res.send(response.rows);
    })
    .catch((error) => {
      console.log(`Error making database query ${queryText}`, error);
      res.sendStatus(500);
    });
});

//GET list of NIR results by fieldID
router.get('/NIR/:fieldID', rejectUnauthenticated, (req, res) => {
  const fieldID = req.params.fieldID;

  const queryText = `SELECT * FROM "NIR" WHERE "field_id"=$1;`;

  pool
    .query(queryText, [fieldID])
    .then((response) => {
      res.send(response.rows);
    })
    .catch((error) => {
      console.log(`Error making database query ${queryText}`, error);
      res.sendStatus(500);
    });
});

//GET transaction types dropdown list.
router.get('/transactionTypes', rejectUnauthenticated, (req, res) => {
  const queryText = `SELECT * FROM "transaction_type" ORDER BY "id" ASC;`;

  pool
    .query(queryText)
    .then((response) => {
      res.send(response.rows);
    })
    .catch((error) => {
      console.log(`Error making database query ${queryText}`, error);
      res.sendStatus(500);
    });
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
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id, name;`;

  try {
    const response = await pool.query(queryText, [
      year,
      location,
      acres,
      field_note,
      name,
      image,
      shape_file,
      gmo,
      crop_id,
    ]);

    //second query creates entry into user_field table
    const created_field = response.rows[0].id;
    const field_name = response.rows[0].name;
    const insert_field = `
        INSERT INTO "user_field" ("field_id", "user_id")
        VALUES ($1, $2);`;
    await pool.query(insert_field, [created_field, req.user.id]);

    //third query insert field info into field_transactions table
    const insertTransaction = `
        INSERT INTO "field_transactions" ("field_id", "timestamp", "status_notes", "field_status", "transaction_type")
        VALUES ($1, Now(), 'Field Created', (SELECT "name" FROM "transaction_type" WHERE "name" = 'pre-planting'), (SELECT "id" FROM "transaction_type" WHERE "name" = 'pre-planting'));`;
    await pool.query(insertTransaction, [created_field]);
    res.sendStatus(201);
  } catch (error) {
    console.log(`Error making database query ${queryText}`, error);
    res.sendStatus(500);
  }
});

//CREATE A FIELD TRANSACTION
router.post('/create_transaction', rejectUnauthenticated, (req, res) => {
  const field_id = req.body.field_id;
  const status_notes = req.body.status_notes;
  const image = req.body.image;
  const transaction_type = req.body.transaction_type;

  const queryText = `INSERT INTO "field_transactions" 
    ("field_id", "timestamp", "status_notes", "image", "field_status", "transaction_type")
    VALUES ($1, Now(), $2, $3, (SELECT "name" FROM "transaction_type" WHERE "id" = $4), $5);`;

  pool
    .query(queryText, [
      field_id,
      status_notes,
      image,
      transaction_type,
      transaction_type,
    ])
    .then((result) => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

// CREATE NIR ANALYSIS
router.post('/create_NIR', rejectUnauthenticated, (req, res) => {
  const field_id = req.body.field_id;
  const oil = req.body.oil;
  const moisture = req.body.moisture;
  const protein = req.body.protein;
  const energy = req.body.energy;
  const amino_acids = req.body.amino_acids;
  const tested_at = req.body.tested_at;
  const transaction = req.body.fieldTrans;
  const fieldStatus = req.body.fieldStatus;

  const queryText = `INSERT INTO "NIR" 
    ("field_id", "oil", "moisture", "protein", "energy", "amino_acids", "tested_at") 
    VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;`;

  pool
    .query(queryText, [
      field_id,
      oil,
      moisture,
      protein,
      energy,
      amino_acids,
      tested_at,
    ])
    .then((result) => {
      const field_id = result.rows[0].field_id;
      const queryTransaction = `INSERT INTO "field_transactions"("field_id", "timestamp", "status_notes", "field_status",
        "transaction_type") VALUES($1, Now(), 'NIR added', $2, $3) RETURNING *; `;

      pool
        .query(queryTransaction, [field_id, fieldStatus, transaction])
        .then((result) => {
          console.log('Updating transaction table with NIR', result.rows); // DO WE NEED THIS CONSOLE.LOG...no.
        })
        .catch((error) => {
          console.log(`Error updating table with NIR`, error);
        });
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

// -- PUTS --
//edit/update the field table
router.put('/update/:fieldID', rejectUnauthenticated, (req, res) => {
  const fieldID = Number(req.params.fieldID);
  const year = req.body.year;
  const location = req.body.location;
  const acres = req.body.acres;
  const field_note = req.body.field_note;
  const name = req.body.name;
  const shape_file = req.body.shape_file;
  const gmo = req.body.gmo;
  const crop_id = req.body.crop_id;
  const transaction = req.body.fieldTrans;
  const fieldStatus = req.body.field_status;

  //second query to update transaction table
  const queryText = `
            UPDATE "field"
    SET "year" = $2, "location" = $3, "acres" = $4, "field_note" = $5, "name" = $6, "shape_file" = $7, "gmo" = $8, "crop_id" = $9
    FROM "user_field"
    WHERE "field"."id" = $1 AND "user_field"."user_id" = $10;
    `;
  pool
    .query(queryText, [
      fieldID,
      year,
      location,
      acres,
      field_note,
      name,
      shape_file,
      gmo,
      crop_id,
      req.user.id,
    ])
    .then((result) => {
      const queryUpdate = `INSERT INTO"field_transactions"("field_id", "timestamp", "status_notes", "field_status",
        "transaction_type") VALUES($1, Now(), 'Field updated', $2, $3) RETURNING *;`;
      pool
        .query(queryUpdate, [fieldID, fieldStatus, transaction])
        .then((result) => {
          res.sendStatus(201);
        })
        .catch((err) => {
          console.log('Error updating transaction table with field edit', err);
          res.sendStatus(500);
        });
    })
    .catch((error) => {
      console.log('Error making query: ', error);
      res.sendStatus(500);
    });
});

router.put('/update_NIR/', rejectUnauthenticated, (req, res) => {
  const NIRID = req.body.NIRID;
  const field_id = req.body.field_id;
  const oil = req.body.oil;
  const moisture = req.body.moisture;
  const protein = req.body.protein;
  const energy = req.body.energy;
  const amino_acids = req.body.amino_acids;
  const transaction = req.body.fieldTrans;
  const field_status = req.body.fieldStatus2;

  //second query to update transaction table

  const queryText = `UPDATE "NIR"
    SET "oil" = $1, "moisture" = $2, "protein" = $3, "energy" = $4, "amino_acids" = $5
    WHERE "id" = $6 RETURNING *;`;

  pool
    .query(queryText, [oil, moisture, protein, energy, amino_acids, NIRID])
    .then((result) => {
      const queryUpdate = `INSERT INTO "field_transactions"("field_id", "timestamp", "status_notes", "field_status",
            "transaction_type") VALUES($1, Now(), 'NIR updated', $2, $3) RETURNING *;`;

      pool
        .query(queryUpdate, [field_id, fieldStatus, transaction])
        .then((result) => {
          res.sendStatus(201);
        })
        .catch((error) => {
          console.log(`Error updating table with NIR`, error);
        });
    })
    .catch((error) => {
      console.log('Error making query: ', error);
      res.sendStatus(500);
    });
});

router.put('/update_transaction', rejectUnauthenticated, (req, res) => {
  const transaction_id = req.body.transaction_id;
  const status_notes = req.body.status_notes;
  const image = req.body.image;
  const transaction_type = req.body.transaction_type;

  const queryText = `UPDATE "field_transactions"
    SET "status_notes" = $1, "image" = $2, "timestamp" = Now(), "field_status" = (SELECT "name" FROM "transaction_type" WHERE "id" = $3), "transaction_type" = $4
    WHERE "id" = $5;`;

  pool
    .query(queryText, [
      status_notes,
      image,
      transaction_type,
      transaction_type,
      transaction_id,
    ])
    .then((result) => {
      res.sendStatus(204);
    })
    .catch((error) => {
      console.log('Error making query: ', error);
      res.sendStatus(500);
    });
});

// -- DELETES --

//DELETE a field
//Saga: deleteField.saga
router.delete('/delete_field/:fieldID', rejectUnauthenticated, (req, res) => {
  const queryText = `
    DELETE
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

router.delete(
  '/delete_transaction/:transactionID',
  rejectUnauthenticated,
  (req, res) => {
    const queryText = `DELETE FROM "field_transactions" WHERE "id" = $1; `;

    pool
      .query(queryText, [req.params.transactionID])
      .then(() => res.sendStatus(204))
      .catch((error) => {
        console.log(error);
        res.sendStatus(500);
      });
  }
);

router.delete('/delete_NIR/:NIRID', rejectUnauthenticated, (req, res) => {
  const NIRID = req.params.NIRID;

  const queryText = `DELETE
    FROM "NIR"
    WHERE "id" = $1;
    `;

  pool
    .query(queryText, [NIRID])
    .then(() => res.sendStatus(204))
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
});

module.exports = router;
