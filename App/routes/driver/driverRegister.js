var express = require('express');
var router = express.Router();

const { Pool } = require('pg')
const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

//SQL QUERIES
var sql_user_query = 'INSERT INTO Users VALUES ';
var sql_driver_query = 'INSERT INTO Drivers VALUES ';
var sql_fulltimers_query = 'INSERT INTO FullTimers VALUES ';
var sql_parttimers_query = 'INSERT INTO PartTimers VALUES ';

// GET
router.get('/', function(req, res, next) {
    res.render('driver/driverRegister', { title: 'Register as Delivery Rider' });
});

//POST
router.post('/', function (req, res, next) {
    var uid = req.body.did;
    var name = req.body.name;
    var username = req.body.username;
    var password = req.body.password;
    var riderType = req.body.typeOfRider; 
    // var riderType = document.getElementById("typeOfRider");
    // var t = riderType.options[e.selectedIndex].text;

    var salary;
    var isFullTime;
    if (riderType == "FT") {
        salary = 1700;
        isFullTime = true;
    } else if (riderType == "PT") {
        salary = 400;
        isFullTime = false;
    }

    // var uid;

    // pool.query('SELECT max(uid)+ 1 FROM USERS'), (err, res) => {
    //     uid = res.rows[0];
    //     if (err) {
    //         return console.error('Error executing query', err.stack)
    //     }
    // }

    //insert into users
    var insert_query = sql_user_query + "(" + uid + ",'" + name + "','" + password + "','" + username + "')";
    pool.query(insert_query, (err, data) => {
        if (err) {
            return console.error('Error executing query', err.stack)
        }
    });
    
    var today = new Date();
    var date = today.getFullYear() + "-" + +(today.getMonth()+1)+'-'+today.getDate();
    

    //insert into drivers and either PT or FT
    if (isFullTime) {
        var insert_query_ft_2 = sql_driver_query + "(" + uid + "," + true + "," + salary + ",'" + date + "')";
        pool.query(insert_query_ft_2, (err, data) => {
        if (err) {
            return console.error('Error executing query', err.stack)
        }
     });
        var insert_query_ft = sql_fulltimers_query + "(" + uid + ")";
        pool.query(insert_query_ft, (err, data) => {
        });
        
    } else { //part time
        var insert_query_pt_2 = sql_driver_query + "(" + uid + "," + true + "," + salary + ",'" + date + "')";
        pool.query(insert_query_pt_2, (err, data) => {
        if (err) {
            return console.error('Error executing query', err.stack)
        }
     });
        var insert_query_pt = sql_parttimers_query + "(" + uid + ")";
        pool.query(insert_query_pt, (err, data) => {
        });
    }

    pool.query('SELECT * FROM Users natural join Drivers WHERE uid = $1', [uid] ,(err, data) => {
		res.render('driver/driverhomepage', { name: name });
    });
    
    pool.end();

});



module.exports = router;