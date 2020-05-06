var express = require('express');
var router = express.Router();
const { Pool } = require('pg')
const pool = new Pool({
    connectionString: process.env.DATABASE_URL //we need to edit the .env individually, and put it in .gitignore
});



// GET
router.get('/', function (req, res, next) {
    //this method not used at all
    res.render('fdsmanager/addshift', { title: 'Adding a Shift', errormessage: ' ' });
});


// POST method for adding shifts to existing schedules
router.post('/', function (req, res, next) {
    // Retrieve Information
    //var sid = req.body.sid;
    var wwsid = req.body.wwsid;
    var starttime = req.body.starttime;
    var endtime = req.body.endtime;
    var datebuffercount = req.body.date;
    var firstdayofweek = req.body.firstdayofweek;

    var firstdaydate = new Date(firstdayofweek);
    for (var i = 0; i < datebuffercount; i++) {
        firstdaydate.setDate(firstdaydate.getDate() + 1);
    }
    var shiftdatestring = firstdaydate.getFullYear() + '-' + (firstdaydate.getMonth() + 1) + '-' + firstdaydate.getDate();

    //console.log("Before inserting");
    var insertshiftquery = 'INSERT INTO Shifts VALUES';
    //var shiftquery = insertshiftquery + " ('" + sid + "','" + wwsid + "','" + starttime + "','" + endtime + "','" + shiftdatestring + "','" + firstdayofweek + "')";
    //console.log(shiftquery);


    //CREATING DATE ARRAY AND DAYS ARRAY
    var days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    var dates = new Array(); //dates for each day of the week
    var startdate = new Date(firstdayofweek);
    for (var i = 0; i < 7; i++) {
        dates.push(startdate.getFullYear() + '-' + (startdate.getMonth() + 1) + '-' + startdate.getDate());
        startdate.setDate(startdate.getDate() + 1);
    }
    pool.query('Select max(sid) from shifts', (maxsiderr, maxsiddata) => {
        var maxSid = parseInt(maxsiddata.rows[0].max) + 1;
         var shiftquery = insertshiftquery + " ('" + maxSid + "','" + wwsid + "','" + starttime + "','" + endtime + "','" + shiftdatestring + "','" + firstdayofweek + "')";
    
        pool.query(shiftquery, (inserterr, data) => {
            if (inserterr) {
                console.log(inserterr.message);
                console.log(shiftquery);
                pool.query('Select * from Users natural join PartTimers natural join WWS where startdate = $1', [firstdayofweek], (err, data) => {
                    res.render("fdsmanager/addshift", { drivers: data.rows, title: 'Adding a Shift to Week of ', days: days, dates: dates, firstdayofweek: firstdayofweek, errormessage: 'ERROR: ' + inserterr.message });
                });

                //res.render('fdsmanager/addshift', { title: 'Adding a Shift', errormessage: ' ' });

            } else {
                console.log("Before redirecting");
                res.redirect('/viewwws');
            }
        });
    });

    // var insertwwsidquery = 'INSERT INTO WWS VALUES';
    // var wwsidquery = insertwwsidquery + " ('" + uid + "','" + wwsid+ "','" + date + "')";
    // pool.query(wwsidquery, (err, data) => {
    //     if (err) {
    //         return console.error('Error executing query', err.stack)
    //     }
    // });

    // var insertshiftquery = 'INSERT INTO Shifts VALUES';
    // console.log(date);
    // var shiftquery = insertshiftquery  + " ('" + sid + "','" + wwsid + "','" + starttime + "','" +  endtime  + "','" + date + "','" + firstdayofweek + "')";



    // pool.query('Select * from wws where startdate = $1 and uid = $2', [firstdayofweek, uid], (err, wwsiddata) => {
    //     var insertshiftquery = 'INSERT INTO Shifts VALUES';
    //     console.log(date);
    //     wwsid = wwsiddata.rows[0].wwsid;
    //     console.log('wwsid read is is ' +wwsid);
    //     console.log('start date we found is ' +firstdayofweek);
    //     var shiftquery = insertshiftquery + " ('" + sid + "','" + wwsid + "','" + starttime + "','" + endtime + "','" + date + "','" + firstdayofweek + "')";

    //     pool.query(shiftquery, (err2, data) => {
    //         res.redirect('/viewwws');
    //     });
    // });
});
module.exports = router;

