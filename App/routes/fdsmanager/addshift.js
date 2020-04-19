var express = require('express');
var router = express.Router();
const { Pool } = require('pg')
const pool = new Pool({
	connectionString: process.env.DATABASE_URL //we need to edit the .env individually, and put it in .gitignore
});



// GET
router.get('/', function(req, res, next) {
	res.render('fdsmanager/addshift', { title: 'Adding a Shift' });
});


// POST
router.post('/', function(req, res, next) {
	// Retrieve Information
    var sid  = req.body.sid;
    var wwsid  = req.body.wwsid;
    var uid = req.body.uid;
    var starttime = req.body.starttime;
    var endtime = req.body.endtime;
    var date = req.body.date;
    

    var insertwwsidquery = 'INSERT INTO WWS VALUES';
    //var wwsidquery = 'INSERT INTO WWS VALUES (2,2)';
    
    var wwsidquery = insertwwsidquery + " ('" + uid + "','" + wwsid+ "','" + date + "')";
    pool.query(wwsidquery, (err, data) => {
        if (err) {
            return console.error('Error executing query', err.stack)
        }
    });

    var insertshiftquery = 'INSERT INTO Shifts VALUES';

    var shiftquery = insertshiftquery  + " ('" + sid + "','" + wwsid + "','" + starttime + "','" +  endtime  + "','" + date + "')";
    pool.query(shiftquery, (err, data) => {
		res.redirect('/restaurants');
    });
});

module.exports = router;
