var express = require('express');
var router = express.Router();
const { Pool } = require('pg')
const pool = new Pool({
    connectionString: process.env.DATABASE_URL //we need to edit the .env individually, and put it in .gitignore
});


// GET
router.get('/', function (req, res, next) {
    res.render('fdsmanager/deleterestaurantstaff', { title: 'Enter particulars of Restaurant Staff to delete'});
});


// POST
router.post('/', function (req, res, next) {
    // Retrieve Information
    var uid = req.body.uid;
    var username = req.body.username;

    pool.query('DELETE FROM RestaurantStaff WHERE uid = $1', [uid] , (err, data) => {
        if (err) {
            return console.error('Error executing query', err.stack)
        }
    });

    pool.query('DELETE FROM Users WHERE uid = $1', [uid] , (err, data) => {
        if (err) {
            return console.error('Error executing query', err.stack)
        }
        res.redirect('/viewallrestaurantstaff');
    });


});

module.exports = router;
