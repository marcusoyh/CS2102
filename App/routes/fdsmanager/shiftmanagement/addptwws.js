var express = require('express');
var router = express.Router();
const { Pool } = require('pg')
const pool = new Pool({
    connectionString: process.env.DATABASE_URL 
});


// GET method generates the page for creating a WWS for PT
router.get('/', function (req, res, next) {
    pool.query('Select * from parttimers natural join users', (err, data) => {
        if (err) {
            return console.error('Error executing query', err.stack)
        }
        res.render('fdsmanager/addptwws', { title: 'Generating a new WWS', data: data.rows });
    });
});

var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var days = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
// POST method creates the WWS for the pt driver, redirects to the shift creating page
router.post('/', function (req, res, next) {
    var uid = req.body.uid;
    var wwsid = req.body.wwsid;
    var startdatestring = req.body.startdate;
    var sid = req.body.sid;

    var query = 'INSERT INTO WWS VALUES';
    var insert = query + "('" + uid + "','" + wwsid + "','" + startdatestring + "')";
    
    pool.query(insert, (err, data) => {
        if (err) {
            return console.error('Error executing query', err.stack)
        }
    });

    console.log('SID PASSED OVER');
    console.log(sid);

    pool.query('Select * from Shifts natural join Users natural join WWS where wwsid = $1', [wwsid], (err, data) => {
        if (err) {
            return console.error('Error executing query', err.stack)
        }
        res.render('fdsmanager/fillptwws', {data:data.rows, startdate: startdatestring, wwsid: wwsid, sid : sid, 
            totalhours: 0, hourtargethit: false, months: months, errormessage:" ", days:days});
    });
});

module.exports = router;