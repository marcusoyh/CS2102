var express = require('express');
var router = express.Router();

const { Pool } = require('pg')

const pool = new Pool({
    connectionString: process.env.DATABASE_URL //we need to edit the .env individually, and put it in .gitignore
});

// GET
router.get('/', function (req, res, next) {
    pool.query('SELECT * FROM Restaurants', (err, restaurants) => {
        res.render('login/loginrestaurantstaff', { title: 'Login as Restaurant Staff', restaurants: restaurants.rows, errormessage: ' ' });
    });
});


// POST generic login
router.post('/', function (req, res, next) {
    // Retrieve Information
    var password = req.body.password;
    var username = req.body.username;
    var rid = req.body.rid;
    console.log(rid);
    pool.query('SELECT * FROM Users natural join RestaurantStaff WHERE username=$1 and password=$2 and rid=$3', [username, password,rid], (err, data) => {
        if (data.rowCount == 1) {
            console.log(rid); //NOW WE PASS OVER THE RESTAURANT TO THE STAFF PAGES
            pool.query('SELECT * FROM Restaurants WHERE rid=$1', [rid], (err, data) => {
                res.render('restaurantstaffindex', { name: username, restaurant:data.rows[0] });
            });
        } else { //ERROR, GENERATE LOGIN PAGE AGAIN
            pool.query('SELECT * FROM Restaurants', (selecterr, restaurants) => {
                res.render('login/loginrestaurantstaff', { title: 'Login as Restaurant Staff', restaurants: restaurants.rows, errormessage: 'ERROR: Username/Password Wrong' });
            }); }
    });
});

module.exports = router;
