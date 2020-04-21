var express = require('express');
var router = express.Router();
const { Pool } = require('pg')
const pool = new Pool({
    connectionString: process.env.DATABASE_URL //we need to edit the .env individually, and put it in .gitignore
});


// GET
router.get('/', function (req, res, next) {

    res.render('fdsmanager/addwws', { title: 'Generating a new WWS' });
});


// POST
router.post('/', function (req, res, next) {
    // Retrieve Information
    var uid = req.body.uid;
    var wwsid = req.body.wwsid;
    var startdate = req.body.startdate;
    var driverIds;
    var id = 0;

    pool.query('Select * from drivers', (err, data) => {
        if (err) {
            return console.error('Error executing query', err.stack)
        }
        driverIds = new Array(data.rows.length);
        for (var i = 0; i < data.rows.length; i++) {
            driverIds[i] = data.rows[i].uid;
            id = data.rows[i].uid;
            console.log(data.rows[i].uid);
            console.log(driverIds[i]);
            console.log('Driver id inside loop is' + id);
        }
    });



    var userQuery = 'INSERT INTO WWS VALUES';
    


    pool.query('Select * from drivers', (err, driverdata) => {
        if (err) {
            return console.error('Error executing query', err.stack)
        }
        driverIds = new Array(driverdata.rows.length);
        for (var i = 0; i < driverdata.rows.length; i++) {
            wwsid = parseInt(wwsid) + i;
            var insertuserquery = userQuery + "('" + driverdata.rows[i].uid + "','" + wwsid + "','" + startdate + "')";
            pool.query(insertuserquery, (err, data) => {
                if (err) {
                    return console.error('Error executing query', err.stack)
                }
            });
            // driverIds[i] = driverdata.rows[i].uid;
            // id = driverdata.rows[i].uid;
            // console.log(driverdata.rows[i].uid);
            // console.log(driverIds[i]);
            // console.log('Driver id inside loop is' + id);
        }

        

        
    });
    res.redirect('/shiftmanagement');

});

module.exports = router;
