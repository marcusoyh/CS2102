var express = require('express');
var router = express.Router();

const { Pool } = require('pg')

const pool = new Pool({
    connectionString: process.env.DATABASE_URL //we need to edit the .env individually, and put it in .gitignore
});

// GET
router.get('/', function (req, res, next) {
    pool.query('SELECT * FROM Restaurants',(err,restaurants)=> {
    res.render('login/loginrestaurantstaff', { title: 'Login as Restaurant Staff', restaurants:restaurants.rows });
});
});


// POST generic login
router.post('/', function (req, res, next) {
    // Retrieve Information
    var password = req.body.password;
    var username = req.body.username;
    var rid = req.body.rid;
    console.log(rid);
    pool.query('SELECT * FROM Users natural join RestaurantStaff WHERE username=$1 and password=$2', [username, password], (err, data) => {
            if (data.rowCount == 1) {
                console.log(rid);
                res.render('restaurantstaffindex', { name: username, rid: rid });
            } else {
                res.render('login/loginrestaurantstaff',{ title: 'Login as Restaurant Staff' }); //maybe print an error message here somehow
            }
    });
});

module.exports = router;
