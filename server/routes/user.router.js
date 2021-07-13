const express = require('express');
const {
    rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get('/', rejectUnauthenticated, (req, res) => {
    // Send back user object from the session (previously queried from the database)
    res.send(req.user);
});

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post('/register', (req, res, next) => {
    const username = req.body.username;
    const password = encryptLib.encryptPassword(req.body.password);
    const farmer = req.body.farmer;
    const buyer = req.body.buyer;
    const first_name = req.body.first_name;
    const last_name = req.body.last_name;

    const super_admin = req.body.super_admin; // Should this be removed. Have a default false and make it a PUT request to make someone into a super_admin???

    const queryText = `INSERT INTO "user" (username, password, farmer, buyer, first_name, last_name, super_admin)
    VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id`;
    pool
        .query(queryText, [username, password, farmer, buyer, first_name, last_name, super_admin])
        .then(() => res.sendStatus(201))
        .catch((err) => {
            console.log('User registration failed: ', err);
            res.sendStatus(500);
        });
});

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post('/login', userStrategy.authenticate('local'), (req, res) => {
    res.sendStatus(200);
});

// clear all server session information about this user
router.post('/logout', (req, res) => {
    // Use passport's built-in method to log out the user
    req.logout();
    res.sendStatus(200);
});

router.post('/addBuyer', rejectUnauthenticated, (req, res) => {
    const fieldID = req.body.fieldID;
    const buyerID = req.body.buyerID;

    const queryText = `INSERT INTO "buyer_field" ("buyer_id", "field_id")
                        VALUES ($1, $2);`;

    pool.query(queryText, [buyerID, fieldID]).then(() => res.sendStatus(201))
    .catch((err) => {
        console.log('Failed to set buyer: ', err);
        res.sendStatus(500);
    });
})

module.exports = router;