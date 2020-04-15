var express = require('express');
var router = express.Router();

const { Pool } = require('pg')
const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

//SQL QUERIES
var sql_user_query = 'INSERT INTO Users VALUES';
var sql_driver_query = 'INSERT INTO Drivers VALUES';
var sql_fulltimers_query = 'INSERT INTO Fulltimers VALUES';
var sql_parttimers_query = 'INSERT INTO Parttimers VALUES';

// GET
router.get('/', function(req, res, next) {
    res.render('driver/driverRegister', { title: 'Register as Delivery Rider' });
    
});

//POST
router.post('/', function (req, res, next) {
    var name = req.body.name;
    var username = req.body.username;
    var password = req.body.password;
    //or maybe var riderType = req.body.typeOfRider; would work
    var riderType = document.getElementById("typeOfRider");
    var t = riderType.options[e.selectedIndex].text;

    var salary;
    var isFullTime;
    if (t == "Full Time Delivery Rider") {
        salary = 400;
        isFullTime = true;
    } else if (t == "Part Time Delivery Rider") {
        salary = 88;
        isFullTime = false;
    }

    var uid;

    pool.query('SELECT max(uid) FROM USERS'), function(err, data) {
        uid = data + 1;
    }
    
    //insert into users
    var insert_query = sql_user_query + "(" + uid + ",'" + name + "'," + password + ",'" + username + "'," + ")";
    pool.query(insert_query, (err, data) => {});

    //insert into drivers
    var insert_query_2 = sql_driver_query + "(" + uid + ")";
    pool.query(insert_query_2, (err, data) => {});

    //insert into either PT or FT
    if (isFullTime) {
        var insert_query_ft = sql_fulltimers_query + "(" + uid + "," + salary + ")";
        pool.query(insert_query_ft, (err, data) => {});
    } else { //part time
        var insert_query_pt = sql_parttimers_query + "(" + uid + "," + salary + ")";
        pool.query(insert_query_pt, (err, data) => {});
    }

});



module.exports = router;