var express = require('express');
var router = express.Router();

const { Pool } = require('pg')

const pool = new Pool({
    connectionString: process.env.DATABASE_URL //we need to edit the .env individually, and put it in .gitignore
});

var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
/* GET method to generate ALL schedules */
router.get('/', function (req, res, next) {
    pool.query('Select startdate, count(*) as num from WWS natural join Users group by startdate order by startdate', (err, data) => {
        res.render('fdsmanager/viewwws', { date: 'All Weekly Schedules Created', data: data.rows, months: months });
    });
});

/* GET method to generate shift of a CERTAIN WEEK */
router.get('/:date', function (req, res, next) {
    const firstdayofweek = req.params.date;

    pool.query('Select * from Shifts natural join WWS natural join Users where firstdayofweek = $1 order by day, starttime', [firstdayofweek], (err, data) => {
        res.render('fdsmanager/wwsdetail', { firstdayofweek: firstdayofweek, data: data.rows });
    });
});

// POST method to create shifts for a day within some selected week
router.post('/', function (req, res, next) {
    // Retrieve Information
    var dateString = req.body.date; //the first day of that week
    res.render("fdsmanager/addshift", { title: 'Adding a Shift to Week of ', firstdayofweek: dateString })
    //date.isValid() is a method that returns true/false, can validate whether legit date was entered

    // pool.query('Select * from Shifts natural join WWS natural join Users where day = $1', [dateString], (err, data) => {
    //     here you set that all templates are located in `/views` directory
    //     app.set('fdsmanager', __dirname + '/fdsmanager');
    //     app.set('view engine', 'ejs');

    //     res.render("fdsmanager/wwsdetail", { title: 'Shifts on ', data: data.rows, date: dateString })

    //     res.render("fdsmanager/addshift", { title: 'Shifts on ', data: data.rows, firstdayofweek: dateString })
    // });

});

//to query for searching for specific months, we do select * from orders where timeDelivered between '2015-10-10' and '2016-10-10';
module.exports = router;
