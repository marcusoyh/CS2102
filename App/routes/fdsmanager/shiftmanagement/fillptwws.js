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
var days = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
//POST method: this is the loopable shift creation form
router.post('/', function (req, res, next) {
    var sid = req.body.sid;
    var shiftday = req.body.shiftday; //0 represents Monday, 1 repesents Tuesday
    var starttime = req.body.starttime;
    var endtime = req.body.endtime;
    var wwsid = req.body.wwsid;
    var weekstartdate = req.body.startdate; //date of first day of week
    var totalhours = req.body.totalhours;
    var hourtargethit = parseInt(totalhours) >= 10;

    console.log('SID PASSED OVER');
    console.log(sid);

    //CREATING DATE ARRAY
    var datestringarray = new Array(); //dates for each day of the week
    var tempfirstdate = new Date(weekstartdate);

    for (var i = 0; i < 7; i++) {
        datestringarray.push(tempfirstdate.getFullYear() + '-' + (tempfirstdate.getMonth() + 1) + '-' + tempfirstdate.getDate());
        tempfirstdate.setDate(tempfirstdate.getDate() + 1);
    }


    var insertshiftquery = 'Insert into Shifts Values';
    var finalinsertquery = insertshiftquery + " ('" + sid + "','" + wwsid + "','" + starttime + "','" + endtime + "','" + datestringarray[shiftday] + "','" + weekstartdate + "')";

    console.log("SHIFT DAY IS " + shiftday);
    console.log("DATE ARRAY FIRST ELEMENT IS " +datestringarray[0]);
    console.log("SHIFT DATE IS:" + datestringarray[shiftday]);
    console.log("WEEK START DATE IS " + weekstartdate);

    var errormessage = " ";
    pool.query(finalinsertquery, (err, insertdata) => {
        if (err) {
            //ERROR inserting, we render the form again for them to fill. we set error message = err.message (to pass message from command line to the html)
            errormessage = 'ERROR: ' + err.message;
            pool.query('Select * from Shifts natural join Users natural join WWS where wwsid = $1 order by day', [wwsid], (err, data) => {
                if (err) {
                    return console.error('Error executing query', err.stack)
                }
                res.render('fdsmanager/fillptwws', {
                    data: data.rows, startdate: weekstartdate, wwsid: wwsid, sid: sid, months: months, totalhours: totalhours,
                    hourtargethit: hourtargethit,errormessage: errormessage, days:days
                });
            });
            //return console.error('Error inserting a new shift', err.stack);
        } else {
            //inserting done successfuly, render with blank errormessage
            totalhours = parseInt(totalhours) + (parseInt(endtime) - parseInt(starttime)) / 100;

            hourtargethit = parseInt(totalhours) >= 10;
            
            pool.query('Select * from Shifts natural join Users natural join WWS where wwsid = $1 order by day', [wwsid], (err, data) => {
                if (err) {
                    return console.error('Error executing query', err.stack)
                }
                res.render('fdsmanager/fillptwws', {
                    data: data.rows, startdate: weekstartdate, wwsid: wwsid, sid: sid, months: months, totalhours: totalhours,
                    hourtargethit: hourtargethit,errormessage: errormessage, days:days
                });
            });
        }
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