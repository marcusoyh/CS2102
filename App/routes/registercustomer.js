var express = require('express');
var router = express.Router();

const { Pool } = require('pg')
const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

//SQL QUERIES
var userquery = 'INSERT INTO Users VALUES ';
var customerquery = 'INSERT INTO Customers VALUES ';
var currentdate = new Date();
var datestring = currentdate.getFullYear() + "-" + +(currentdate.getMonth() + 1) + '-' + currentdate.getDate();

// GET
router.get('/', function (req, res, next) {

    console.log(datestring);
    res.render('registercustomer', {
        title: 'Register as a new Customer', errormessage: ' ', currentdate: datestring
    });
});

//POST
router.post('/', function (req, res, next) {

    var name = req.body.name;
    var username = req.body.username;
    var password = req.body.password;
    var expiryDate = req.body.expdate;
    var ccno = req.body.ccno;
    var errormessage = " ";
    pool.query('SELECT max(uid)+ 1 as uid FROM USERS', (err, data) => {
        uid = data.rows[0].uid;
        console.log(uid);
        console.log("****DEBUG ONE*****")

        //insert into users
        var insert_query = userquery + "(" + uid + ",'" + name + "','" + password + "','" + username + "')";
        pool.query(insert_query, (err, data) => {
            if (err) { //error here would be a duplicate username
                errormessage = "ERROR: Username Taken";
                res.render('registercustomer', { title: 'Register as a new Customer', errormessage: errormessage, currentdate:datestring });
            } else {
                console.log("****DEBUG TWO*****")


                insert_query = customerquery + "(" + uid + ",'" + datestring + "'," + ccno + ",'" + expiryDate + "', " + 0 + ")";
                pool.query(insert_query, (err, data) => { });

                pool.query('SELECT * FROM Users natural join Customers WHERE username=$1 and password=$2', [username, password], (err, data) => {
                    res.render('customerhomepage', { data: data.rows });
                });
            }



        });

    });




    // pool.end();

});



module.exports = router;