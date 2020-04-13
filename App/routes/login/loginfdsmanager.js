var express = require('express');
var router = express.Router();

const { Pool } = require('pg')

const pool = new Pool({
    connectionString: process.env.DATABASE_URL //we need to edit the .env individually, and put it in .gitignore
});

// GET
router.get('/', function (req, res, next) {
    res.render('login/loginfdsmanager', { title: 'Login as FDS Manager' });
});


// POST generic login
router.post('/', function (req, res, next) {
    // Retrieve Information
    var password = req.body.password;
    var username = req.body.username;

    pool.query('SELECT * FROM Users natural join FDSManagers WHERE username=$1 and password=$2', [username, password], (err, data) => {
        if (data.rowCount == 1) {
            res.render('fdsmanager/fdsmanagerhomepage', { name: username });
        } else {
            res.render('login/loginfdsmanager', {title: 'Login as FDS Manager'}); //maybe print an error message here somehow
        }
    });
});

module.exports = router;
