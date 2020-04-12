var express = require('express');
var router = express.Router();

const { Pool } = require('pg')

const pool = new Pool({
    connectionString: process.env.DATABASE_URL //we need to edit the .env individually, and put it in .gitignore
});

// GET
router.get('/', function (req, res, next) {
    res.render('logindriver', { title: 'Login as Driver' });
});


// POST generic login
router.post('/', function (req, res, next) {
    // Retrieve Information
    var password = req.body.password;
    var username = req.body.username;

    pool.query('SELECT * FROM Users natural join Drivers WHERE username=$1 and password=$2', [username, password], (err, data) => {
        if (data.rowCount == 1) {
            res.render('customerhomepage', { name: username });
        } else {
            res.render('logindriver', { title: 'Login as Driver' }); //maybe print an error message here somehow
        }
    });
});

module.exports = router;
