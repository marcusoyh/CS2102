var express = require('express');
var router = express.Router();

const { Pool } = require('pg')

const pool = new Pool({
    connectionString: process.env.DATABASE_URL //we need to edit the .env individually, and put it in .gitignore
});


var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
/* GET method to generate ALL schedules */
router.get('/', function (req, res, next) {
    var selectQuery = 'with viewone as (Select uid, min(startdate) as startdate, mwsid from MWS natural join WWS group by mwsid) select * from Users natural join viewone';
    pool.query(selectQuery, (err, data) => {
        res.render('fdsmanager/viewmws', { date: 'All Monthly Schedules Created', data: data.rows, months: months });
    });
});


/* POST method to generate WWS for each MWS  */
router.get('/:mwsid', function (req, res, next) {
    mwsid = req.params.mwsid;

    //var selectQuery = 'with viewone as (Select uid, min(startdate) as startdate, mwsid from MWS natural join WWS group by mwsid) select * from Users natural join viewone';
    pool.query ('Select * from WWS where mwsid=$1', [mwsid], data => {
        res.render('fdsmanager/mwsdetail', { date: 'All Weekly Schedules Created', data: data.rows, months: months }
    });
});

module.exports = router;
