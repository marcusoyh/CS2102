var express = require('express');
var router = express.Router();
const { Pool } = require('pg')
const pool = new Pool({
    connectionString: process.env.DATABASE_URL //we need to edit the .env individually, and put it in .gitignore
});


// GET
router.get('/', function (req, res, next) {
    pool.query('Select * from Restaurants', (err, data) => {
        if (err) {
            return console.error('Error executing query', err.stack)
        }
        res.render('fdsmanager/addrestaurantstaff', { title: 'Adding Restaurant Staff', data: data.rows});
    });
    
});


// POST
router.post('/', function (req, res, next) {
    // Retrieve Information
    var rid = req.body.rid;
    var uid = req.body.uid;
    var name = req.body.name;
    var username = req.body.username;
    var password = req.body.password;

    var userQuery = 'INSERT INTO Users VALUES';

    var insertuserquery = userQuery + "(" + uid + ",'" + name + "','" + password + "','" + username + "')";
    pool.query(insertuserquery, (err, data) => {
        if (err) {
            return console.error('Error executing query', err.stack)
        }
    });

    // Construct Specific SQL Query
    var restaurantstaffquery = 'INSERT INTO RestaurantStaff VALUES';
    var insertstaffquery = restaurantstaffquery + "(" + uid + "," + rid + ")";

    pool.query(insertstaffquery, (err, data) => {
        if (err) {
            return console.error('Error executing query', err.stack)
        }
        res.redirect('/viewallrestaurantstaff');
    });

    // pool.query('SELECT u.name,r.name as rname, u.uid FROM RestaurantStaff rs natural join Users u join Restaurants r on rs.rid = r.rid ', (err, data) => {
    //     res.render('fdsmanager/viewallrestaurantstaff', { title: 'All Registered Restaurant Staff', data: data.rows });
    // });
});

module.exports = router;
