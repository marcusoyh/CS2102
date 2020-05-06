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
        res.render('fdsmanager/addrestaurantstaff', { title: 'Adding Restaurant Staff', data: data.rows, errormessage: " " });
    });

});


// POST
router.post('/', function (req, res, next) {
    // Retrieve Information
    var rid = req.body.rid;
    //var uid = req.body.uid;
    var name = req.body.name;
    var username = req.body.username;
    var password = req.body.password;

    var userQuery = 'INSERT INTO Users VALUES';



    // Construct Specific SQL Query
    var restaurantstaffquery = 'INSERT INTO RestaurantStaff VALUES';

    pool.query('Select max(uid) from Users', (maxuiderr, maxuiddata) => {
        var uid = parseInt(maxuiddata.rows[0].max) + 1;
        var insertstaffquery = restaurantstaffquery + "(" + uid + "," + rid + ")";
        var insertuserquery = userQuery + "(" + uid + ",'" + name + "','" + password + "','" + username + "')";
        pool.query(insertuserquery, (insertusererr, insertuserdata) => {
            if (insertusererr) {
                pool.query('Select * from Restaurants', (err, data) => {
                    if (err) {
                        return console.error('Error executing query', err.stack)
                    }
                    res.render('fdsmanager/addrestaurantstaff', { title: 'Adding Restaurant Staff', data: data.rows, errormessage: 'ERROR:' + insertusererr.message });
                });
            } else {
                pool.query(insertstaffquery, (insertstafferr, insertstaffdata) => {
                    if (insertstafferr) {
                        pool.query('Select * from Restaurants', (err, data) => {
                            if (err) {
                                return console.error('Error executing query', err.stack)
                            }
                            res.render('fdsmanager/addrestaurantstaff', { title: 'Adding Restaurant Staff', data: data.rows, errormessage: 'ERROR:' + insertstafferr.message });
                        });
                        //return console.error('Error executing query', insertstafferr.stack)
                    } else {
                        res.redirect('/viewallrestaurantstaff');
                    }
                });
            }
        });


    });



    // pool.query('SELECT u.name,r.name as rname, u.uid FROM RestaurantStaff rs natural join Users u join Restaurants r on rs.rid = r.rid ', (err, data) => {
    //     res.render('fdsmanager/viewallrestaurantstaff', { title: 'All Registered Restaurant Staff', data: data.rows });
    // });
});

module.exports = router;
