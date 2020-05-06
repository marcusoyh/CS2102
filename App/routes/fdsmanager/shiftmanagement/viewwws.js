var express = require('express');
var router = express.Router();

const { Pool } = require('pg')

const pool = new Pool({
    connectionString: process.env.DATABASE_URL //we need to edit the .env individually, and put it in .gitignore
});

var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
/* GET method to generate ALL schedules */
router.get('/', function (req, res, next) {
    pool.query('Select startdate, count(*) as num from WWS natural join Users group by startdate order by startdate desc', (err, data) => {
        res.render('fdsmanager/viewwws', { data: data.rows, months: months });
    });
});

//GET method to see all WWS with the same MWS (linked from VIEWMWS.ejs!)
router.get('/:mwsid', function (req, res, next) {
    const mwsid = req.params.mwsid;

    //HOW TO QUERY CORRECTLY
    pool.query('Select startdate, count(*) as num from WWS natural join Users group by startdate order by startdate desc', (err, data) => {
        res.render('fdsmanager/viewwws', {data: data.rows, months: months });
    });
});


module.exports = router;
