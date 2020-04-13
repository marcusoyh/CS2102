var express = require('express');
var router = express.Router();

const { Pool } = require('pg')

const pool = new Pool({
    connectionString: process.env.DATABASE_URL //we need to edit the .env individually, and put it in .gitignore
});

// GET
router.get('/', function (req, res, next) {
    res.render('loginrestaurantstaff', { title: 'Login as Restaurant Staff' });
});


// POST generic login
router.post('/', function (req, res, next) {
    // Retrieve Information
    var password = req.body.password;
    var username = req.body.username;
    var rid = req.body.rid;


    pool.query('SELECT * FROM Users natural join RestaurantStaff WHERE username=$1 and password=$2', [username, password], (err, data) => {
        if (data.rowCount == 1) {
            res.render('restaurantstaffindex', { name: username, rid: rid });
        } else {
            res.render('loginrestaurantstaff',{ title: data.rowCount }); //maybe print an error message here somehow
        }
    });
});

module.exports = router;
