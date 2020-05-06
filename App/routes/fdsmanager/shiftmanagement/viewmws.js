var express = require('express');
var router = express.Router();

const { Pool } = require('pg')

const pool = new Pool({
    connectionString: process.env.DATABASE_URL //we need to edit the .env individually, and put it in .gitignore
});

var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
/* GET method to generate ALL schedules */
router.get('/', function (req, res, next) {
    var selectQuery = 'with viewone as (Select uid, min(startdate) as startdate from MWS natural join WWS natural join Users group by mwsid) select * from Users natural join viewone';
    pool.query(selectQuery, (err, data) => {
        res.render('fdsmanager/viewmws', { date: 'All Monthly Schedules Created', data: data.rows, months: months });
    });
});

module.exports = router;
