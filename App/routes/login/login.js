var express = require('express');
var router = express.Router();

const { Pool } = require('pg')

const pool = new Pool({
    connectionString: process.env.DATABASE_URL //we need to edit the .env individually, and put it in .gitignore
});

// GET
router.get('/', function (req, res, next) {
    res.render('login/login', { title: 'Login as Customer'});
});



// POST customer login
router.post('/', function (req, res, next) {
    // Retrieve Information
    var password = req.body.password;
    var username = req.body.username;

    pool.query('SELECT * FROM Users natural join Customers WHERE username=$1 and password=$2', [username, password], (err, data) => {
        if (data.rowCount == 1) {
            res.render('customerhomepage', { name: username });
        } else {
            res.render('login/login', { title: 'Login as Customer'}); //maybe print an error message here somehow
        }
    });
});


module.exports = router;