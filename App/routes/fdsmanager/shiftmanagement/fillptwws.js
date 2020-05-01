var express = require('express');
var router = express.Router();
const { Pool } = require('pg')
const pool = new Pool({
    connectionString: process.env.DATABASE_URL //we need to edit the .env individually, and put it in .gitignore
});


// GET
//this method is useless, we dont go straight here
router.get('/', function (req, res, next) {
    res.render('fdsmanager/addwws', { title: 'Generating a new WWS' });
});

var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
//POST method: this is the loopable shift creation form
router.post('/', function (req, res, next) {
    var sid = req.body.sid;
    var shiftday = req.body.shiftday; //0 represents Monday, 1 repesents Tuesday
    var starttime = req.body.starttime;
    var endtime = req.body.endtime;
    var wwsid = req.body.wwsid;
    var weekstartdate = req.body.startdate; //date of first day of week
    var totalhours = req.body.totalhours;

    totalhours = parseInt(totalhours) + (parseInt(endtime) - parseInt(starttime)) / 100;
    var hourtargethit = parseInt(totalhours) >= 10;

    console.log('SID PASSED OVER');
    console.log(sid);

    //CREATING DATE ARRAY
    var datestringarray = new Array(); //dates for each day of the week
    var tempfirstdate = new Date(weekstartdate);

    for (var i = 0; i < 6; i++) {
        datestringarray.push(tempfirstdate.getFullYear() + '-' + (tempfirstdate.getMonth() + 1) + '-' + tempfirstdate.getDate());
        tempfirstdate.setDate(tempfirstdate.getDate() + 1);
    }


    var insertshiftquery = 'Insert into Shifts Values';
    var finalquery = insertshiftquery + " ('" + sid + "','" + wwsid + "','" + starttime + "','" + endtime + "','" + datestringarray[shiftday] + "','" + weekstartdate + "')";

    console.log("SHIFT DAY IS " +shiftday);
    console.log("DATE IS:");
    console.log(datestringarray[shiftday]);
    console.log(weekstartdate);

    pool.query(finalquery, (err, insertdata) => {
        if (err) {
            return console.error('Error inserting a new shift', err.stack)
        }
 
        pool.query('Select * from Shifts natural join Users natural join WWS where wwsid = $1 order by day', [wwsid], (err, data) => {
            if (err) {
                return console.error('Error executing query', err.stack)
            }
            res.render('fdsmanager/fillptwws', {
                data: data.rows, startdate: weekstartdate, wwsid: wwsid, sid: sid, months: months, totalhours: totalhours,
                hourtargethit: hourtargethit, insertdata:insertdata.rows
            });
        });
    });

    sid = parseInt(sid) + 1;


    // pool.query('Select * from Shifts where wwsid = $1', [wwsid], (err, data) => {
    //     if (err) {
    //         return console.error('Error executing query', err.stack)
    //     }
    //     res.render('fdsmanager/fillptwws', {data:data.rows, startdate: weekstartdate, wwsid: wwsid, sid : sid});
    //     //let me try redirect instead, and we will access the get method on top?
    // });


});

module.exports = router;