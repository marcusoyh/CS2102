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

/* GET method to view all shifts in a CERTAIN WEEK */
router.get('/:date', function (req, res, next) {
    const firstdayofweek = req.params.date;

    pool.query('Select * from Shifts natural join WWS natural join Users where firstdayofweek = $1 order by day, starttime', [firstdayofweek], (err, data) => {
        res.render('fdsmanager/wwsdetail', { firstdayofweek: firstdayofweek, data: data.rows, months: months });
    });
});

// POST method to create shifts for a day within some selected week
router.post('/', function (req, res, next) {
    // Retrieve Information
    var dateString = req.body.weekstartdate; //the first day of that week

    //now i need to send over a list of drivers who have a WWS with this specific start date
    //i need the wwsid, the uid,maybe another list of dates within the week too?
    var days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];


    //CREATING DATE ARRAY
    var dates = new Array(); //dates for each day of the week
    var startdate = new Date(dateString);
    for (var i = 0; i < 7; i++) {
        dates.push(startdate.getFullYear() + '-' + (startdate.getMonth() + 1) + '-' + startdate.getDate());
        startdate.setDate(startdate.getDate() + 1);
    }

    console.log("START DATE IS: " +startdate);
    var query = 'Select * from Users natural join WWS where startdate = $1';

    pool.query(query, [dateString], (err, data) => {
        //res.render("fdsmanager/manualaddshifts", { drivers: data.rows, title: 'Adding a Shift to Week of ', days: days, dates:dates, firstdayofweek: dateString });
        res.render("./fdsmanager/addshift", { drivers: data.rows, title: 'Adding a Shift to Week of ', days: days, dates:dates, firstdayofweek: dateString, errormessage:' ' });
    });
});
module.exports = router;
