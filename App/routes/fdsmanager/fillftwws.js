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
// POST
router.post('/', function (req, res, next) {
    // var startday = req.body.startday;
    var day1 = req.body.day1;
    var day2 = req.body.day2;
    var day3 = req.body.day3;
    var day4 = req.body.day4;
    var day5 = req.body.day5;
    var wwsid = req.body.wwsid;
    var sid = req.body.sid;
    var firstdayofweek = req.body.startdate; //date of first day of week

    //if we take firstdayofweek as 20th, and we choose the guy do tue-sat, means first shift date
    //is 20 + 1
    //just use this buffer to add to the date every shift
    var startday = parseInt(req.body.startday); //0 represents monday. 1 represents tue

    console.log('Before creatinf date array');
    console.log(startday);
    console.log(firstdayofweek);

    //CREATING MY DATE ARRAY HERE
    //at first i did +27 days to do a full one month, but i need to do an extra 5th week because i need to account for spillover
    var datestringarray = new Array();
    var lastdateofmonth = new Date();
    lastdateofmonth.setDate(lastdateofmonth.getDate() + 34);
    var tempfirstdate = new Date(firstdayofweek);
    while (tempfirstdate <= lastdateofmonth) {
        datestringarray.push(tempfirstdate.getFullYear() + '-' + (tempfirstdate.getMonth() + 1) + '-' + tempfirstdate.getDate());
        tempfirstdate.setDate(tempfirstdate.getDate() + 1);
    }


    // INSERT INTO Shifts (sid, wwsid, startTime, endTime, day, firstDayOfWeek) VALUES
    //  (1, 1, 1000, 1200, '2020-04-06', '2020-04-06');
    var sid12 = parseInt(sid) + 1;
    var insertshiftquery = 'INSERT INTO Shifts VALUES';
    console.log('***************');
    console.log(datestringarray[0]);
    console.log(datestringarray[1]);
    console.log(datestringarray[2]);
    console.log(datestringarray[4]);

    var daytimingarray = [day1, day2, day3, day4, day5];
    var shiftquery1 = '';
    var shiftquery2 = '';
    var shiftquery3 = '';
    var shiftquery4 = '';
    var shiftquery5 = '';
    var shiftquery6 = '';
    var shiftquery7 = '';
    var shiftquery8 = '';

    for (var i = 0; i < 5; i++) { //iterate through the five days
        wwsid = req.body.wwsid;

        if (daytimingarray[i] == '10am') {
            //WEEK 1
            shiftquery1 = insertshiftquery + " ('" + sid + "','" + wwsid + "','" + 1000 + "','" + 1400 + "','" + datestringarray[i + startday] + "','" + firstdayofweek + "')";
            sid = parseInt(sid) + 1;
            shiftquery2 = insertshiftquery + " ('" + sid + "','" + wwsid + "','" + 1500 + "','" + 1900 + "','" + datestringarray[i + startday] + "','" + firstdayofweek + "')";
            sid = parseInt(sid) + 1;
            wwsid = parseInt(wwsid) + 1;
            //WEEK 2
            shiftquery3 = insertshiftquery + " ('" + sid + "','" + wwsid + "','" + 1000 + "','" + 1400 + "','" + datestringarray[i + 7 + startday] + "','" + datestringarray[7] + "')";
            sid = parseInt(sid) + 1;
            shiftquery4 = insertshiftquery + " ('" + sid + "','" + wwsid + "','" + 1500 + "','" + 1900 + "','" + datestringarray[i + 7 + startday] + "','" + datestringarray[7] + "')";
            sid = parseInt(sid) + 1;
            wwsid = parseInt(wwsid) + 1;
            //WEEK 3
            shiftquery5 = insertshiftquery + " ('" + sid + "','" + wwsid + "','" + 1000 + "','" + 1400 + "','" + datestringarray[i + 14 + startday] + "','" + datestringarray[14] + "')";
            sid = parseInt(sid) + 1;
            shiftquery6 = insertshiftquery + " ('" + sid + "','" + wwsid + "','" + 1500 + "','" + 1900 + "','" + datestringarray[i + 14 + startday] + "','" + datestringarray[14] + "')";
            sid = parseInt(sid) + 1;
            //WEEK 4
            wwsid = parseInt(wwsid) + 1;
            shiftquery7 = insertshiftquery + " ('" + sid + "','" + wwsid + "','" + 1000 + "','" + 1400 + "','" + datestringarray[i + 21 + startday] + "','" + datestringarray[21] + "')";
            sid = parseInt(sid) + 1;
            shiftquery8 = insertshiftquery + " ('" + sid + "','" + wwsid + "','" + 1500 + "','" + 1900 + "','" + datestringarray[i + 21 + startday] + "','" + datestringarray[21] + "')";
            sid = parseInt(sid) + 1;


        } else if (daytimingarray[i] == '11am') {
            //WEEK 1
            shiftquery1 = insertshiftquery + " ('" + sid + "','" + wwsid + "','" + 1100 + "','" + 1500 + "','" + datestringarray[i + startday] + "','" + firstdayofweek + "')";
            sid = parseInt(sid) + 1;
            shiftquery2 = insertshiftquery + " ('" + sid + "','" + wwsid + "','" + 1600 + "','" + 2000 + "','" + datestringarray[i + startday] + "','" + firstdayofweek + "')";
            sid = parseInt(sid) + 1;
            wwsid = parseInt(wwsid) + 1;
            //WEEK 2
            shiftquery3 = insertshiftquery + " ('" + sid + "','" + wwsid + "','" + 1100 + "','" + 1500 + "','" + datestringarray[i + 7 + startday] + "','" + datestringarray[7] + "')";
            sid = parseInt(sid) + 1;
            shiftquery4 = insertshiftquery + " ('" + sid + "','" + wwsid + "','" + 1600 + "','" + 2000 + "','" + datestringarray[i + 7 + startday] + "','" + datestringarray[7] + "')";
            sid = parseInt(sid) + 1;
            wwsid = parseInt(wwsid) + 1;
            //WEEK 3
            shiftquery5 = insertshiftquery + " ('" + sid + "','" + wwsid + "','" + 1100 + "','" + 1500 + "','" + datestringarray[i + 14 + startday] + "','" + datestringarray[14] + "')";
            sid = parseInt(sid) + 1;
            shiftquery6 = insertshiftquery + " ('" + sid + "','" + wwsid + "','" + 1600 + "','" + 2000 + "','" + datestringarray[i + 14 + startday] + "','" + datestringarray[14] + "')";
            sid = parseInt(sid) + 1;
            wwsid = parseInt(wwsid) + 1;
            //WEEK 4
            shiftquery7 = insertshiftquery + " ('" + sid + "','" + wwsid + "','" + 1100 + "','" + 1500 + "','" + datestringarray[i + 21 + startday] + "','" + datestringarray[21] + "')";
            sid = parseInt(sid) + 1;
            shiftquery8 = insertshiftquery + " ('" + sid + "','" + wwsid + "','" + 1600 + "','" + 2000 + "','" + datestringarray[i + 21 + startday] + "','" + datestringarray[21] + "')";
            sid = parseInt(sid) + 1;

        } else if (daytimingarray[i] == '12pm') {

        } else if (daytimingarray[i] == '1pm') {

        }
        //INSERT QUERIES
        pool.query(shiftquery1, (err, data) => {
            if (err) {
                return console.error('Error executing query', err.stack)
            }
        });

        pool.query(shiftquery2, (err, data) => {
            if (err) {
                return console.error('Error executing query', err.stack)
            }
        });

        pool.query(shiftquery3, (err, data) => {
            if (err) {
                return console.error('Error executing query', err.stack)
            }
        });

        pool.query(shiftquery4, (err, data) => {
            if (err) {
                return console.error('Error executing query', err.stack)
            }
        });

        pool.query(shiftquery5, (err, data) => {
            if (err) {
                return console.error('Error executing query', err.stack)
            }
        });

        pool.query(shiftquery6, (err, data) => {
            if (err) {
                return console.error('Error executing query', err.stack)
            }
        });

        pool.query(shiftquery7, (err, data) => {
            if (err) {
                return console.error('Error executing query', err.stack)
            }
        });

        pool.query(shiftquery8, (err, data) => {
            if (err) {
                return console.error('Error executing query', err.stack)
            }
        });
    }

    pool.query('Select startdate, count(*) as num from WWS natural join Users group by startdate order by startdate desc', (err, data) => {
        res.render('fdsmanager/viewwws', { date: 'All Weekly Schedules Created', data: data.rows, months: months });
    });

    // if (day1 == '11am') {
    //     console.log('DAY 1 11AM');
    //     var shiftquery1 = insertshiftquery + " ('" + sid + "','" + wwsid + "','" + 1100 + "','" + 1500 + "','" + datestringarray[0 + startday] + "','" + firstdayofweek + "')";
    //     sid = parseInt(sid) + 1;
    //     var shiftquery2 = insertshiftquery + " ('" + sid + "','" + wwsid + "','" + 1600 + "','" + 2000 + "','" + datestringarray[0 + startday] + "','" + firstdayofweek + "')";
    //     sid = parseInt(sid) + 1;
    //     //WEEK 2
    //     wwsid = parseInt(wwsid) + 1;
    //     var shiftquery3 = insertshiftquery + " ('" + sid + "','" + wwsid + "','" + 1100 + "','" + 1500 + "','" + datestringarray[7 + startday] + "','" + datestringarray[7] + "')";
    //     sid = parseInt(sid) + 1;
    //     var shiftquery4 = insertshiftquery + " ('" + sid + "','" + wwsid + "','" + 1600 + "','" + 2000 + "','" + datestringarray[7 + startday] + "','" + datestringarray[7] + "')";
    //     sid = parseInt(sid) + 1;
    //     //WEEK 3
    //     wwsid = parseInt(wwsid) + 1;
    //     var shiftquery5 = insertshiftquery + " ('" + sid + "','" + wwsid + "','" + 1100 + "','" + 1500 + "','" + datestringarray[14 + startday] + "','" + datestringarray[14] + "')";
    //     sid = parseInt(sid) + 1;
    //     var shiftquery6 = insertshiftquery + " ('" + sid + "','" + wwsid + "','" + 1600 + "','" + 2000 + "','" + datestringarray[14 + startday] + "','" + datestringarray[14] + "')";
    //     sid = parseInt(sid) + 1;
    //     //WEEK 4
    //     wwsid = parseInt(wwsid) + 1;
    //     var shiftquery7 = insertshiftquery + " ('" + sid + "','" + wwsid + "','" + 1100 + "','" + 1500 + "','" + datestringarray[21 + startday] + "','" + datestringarray[21] + "')";
    //     sid = parseInt(sid) + 1;
    //     var shiftquery8 = insertshiftquery + " ('" + sid + "','" + wwsid + "','" + 1600 + "','" + 2000 + "','" + datestringarray[21 + startday] + "','" + datestringarray[21] + "')";
    //     sid = parseInt(sid) + 1;

    //     wwsid = parseInt(wwsid) - 3;

    //     pool.query(shiftquery1, (err, data) => {
    //         if (err) {
    //             return console.error('Error executing query', err.stack)
    //         }
    //     });

    //     pool.query(shiftquery2, (err, data) => {
    //         if (err) {
    //             return console.error('Error executing query', err.stack)
    //         }
    //     });

    //     pool.query(shiftquery3, (err, data) => {
    //         if (err) {
    //             return console.error('Error executing query', err.stack)
    //         }
    //     });

    //     pool.query(shiftquery4, (err, data) => {
    //         if (err) {
    //             return console.error('Error executing query', err.stack)
    //         }
    //     });

    //     pool.query(shiftquery5, (err, data) => {
    //         if (err) {
    //             return console.error('Error executing query', err.stack)
    //         }
    //     });

    //     pool.query(shiftquery6, (err, data) => {
    //         if (err) {
    //             return console.error('Error executing query', err.stack)
    //         }
    //     });

    //     pool.query(shiftquery7, (err, data) => {
    //         if (err) {
    //             return console.error('Error executing query', err.stack)
    //         }
    //     });

    //     pool.query(shiftquery8, (err, data) => {
    //         if (err) {
    //             return console.error('Error executing query', err.stack)
    //         }
    //     });



    // } else if (day1 == '10am') {
    //     console.log('DAY 1 10AM');
    //     var shiftquery1 = insertshiftquery + " ('" + sid + "','" + wwsid + "','" + 1000 + "','" + 1400 + "','" + datestringarray[0 + startday] + "','" + firstdayofweek + "')";
    //     sid = parseInt(sid) + 1;
    //     var shiftquery2 = insertshiftquery + " ('" + sid + "','" + wwsid + "','" + 1500 + "','" + 1900 + "','" + datestringarray[0 + startday] + "','" + firstdayofweek + "')";
    //     sid = parseInt(sid) + 1;
    //     //WEEK 2
    //     wwsid = parseInt(wwsid) + 1;
    //     var shiftquery3 = insertshiftquery + " ('" + sid + "','" + wwsid + "','" + 1000 + "','" + 1400 + "','" + datestringarray[7 + startday] + "','" + datestringarray[7] + "')";
    //     sid = parseInt(sid) + 1;
    //     var shiftquery4 = insertshiftquery + " ('" + sid + "','" + wwsid + "','" + 1500 + "','" + 1900 + "','" + datestringarray[7 + startday] + "','" + datestringarray[7] + "')";
    //     sid = parseInt(sid) + 1;
    //     //WEEK 3
    //     wwsid = parseInt(wwsid) + 1;
    //     var shiftquery5 = insertshiftquery + " ('" + sid + "','" + wwsid + "','" + 1000 + "','" + 1400 + "','" + datestringarray[14 + startday] + "','" + datestringarray[14] + "')";
    //     sid = parseInt(sid) + 1;
    //     var shiftquery6 = insertshiftquery + " ('" + sid + "','" + wwsid + "','" + 1500 + "','" + 1900 + "','" + datestringarray[14 + startday] + "','" + datestringarray[14] + "')";
    //     sid = parseInt(sid) + 1;
    //     //WEEK 4
    //     wwsid = parseInt(wwsid) + 1;
    //     var shiftquery7 = insertshiftquery + " ('" + sid + "','" + wwsid + "','" + 1000 + "','" + 1400 + "','" + datestringarray[21 + startday] + "','" + datestringarray[21] + "')";
    //     sid = parseInt(sid) + 1;
    //     var shiftquery8 = insertshiftquery + " ('" + sid + "','" + wwsid + "','" + 1500 + "','" + 1900 + "','" + datestringarray[21 + startday] + "','" + datestringarray[21] + "')";
    //     sid = parseInt(sid) + 1;

    //     wwsid = parseInt(wwsid) - 3;

    //     pool.query(shiftquery1, (err, data) => {
    //         if (err) {
    //             return console.error('Error executing query', err.stack)
    //         }
    //     });

    //     pool.query(shiftquery2, (err, data) => {
    //         if (err) {
    //             return console.error('Error executing query', err.stack)
    //         }
    //     });

    //     pool.query(shiftquery3, (err, data) => {
    //         if (err) {
    //             return console.error('Error executing query', err.stack)
    //         }
    //     });

    //     pool.query(shiftquery4, (err, data) => {
    //         if (err) {
    //             return console.error('Error executing query', err.stack)
    //         }
    //     });
    //     pool.query(shiftquery5, (err, data) => {
    //         if (err) {
    //             return console.error('Error executing query', err.stack)
    //         }
    //     });

    //     pool.query(shiftquery6, (err, data) => {
    //         if (err) {
    //             return console.error('Error executing query', err.stack)
    //         }
    //     });

    //     pool.query(shiftquery7, (err, data) => {
    //         if (err) {
    //             return console.error('Error executing query', err.stack)
    //         }
    //     });

    //     pool.query(shiftquery8, (err, data) => {
    //         if (err) {
    //             return console.error('Error executing query', err.stack)
    //         }
    //     });

    // } else if (day1 == '12pm') {
    //     console.log('DAY 1 12PM');
    //     var shiftquery1 = insertshiftquery + " ('" + sid + "','" + wwsid + "','" + 1200 + "','" + 1600 + "','" + datestringarray[0 + startday] + "','" + firstdayofweek + "')";
    //     sid = parseInt(sid) + 1;
    //     var shiftquery2 = insertshiftquery + " ('" + sid + "','" + wwsid + "','" + 1700 + "','" + 2100 + "','" + datestringarray[0 + startday] + "','" + firstdayofweek + "')";
    //     sid = parseInt(sid) + 1;
    //     //WEEK 2
    //     wwsid = parseInt(wwsid) + 1;
    //     var shiftquery3 = insertshiftquery + " ('" + sid + "','" + wwsid + "','" + 1200 + "','" + 1600 + "','" + datestringarray[7 + startday] + "','" + datestringarray[7] + "')";
    //     sid = parseInt(sid) + 1;
    //     var shiftquery4 = insertshiftquery + " ('" + sid + "','" + wwsid + "','" + 1700 + "','" + 2100 + "','" + datestringarray[7 + startday] + "','" + datestringarray[7] + "')";
    //     sid = parseInt(sid) + 1;
    //     //WEEK 3
    //     wwsid = parseInt(wwsid) + 1;
    //     var shiftquery3 = insertshiftquery + " ('" + sid + "','" + wwsid + "','" + 1200 + "','" + 1600 + "','" + datestringarray[14 + startday] + "','" + datestringarray[14] + "')";
    //     sid = parseInt(sid) + 1;
    //     var shiftquery4 = insertshiftquery + " ('" + sid + "','" + wwsid + "','" + 1700 + "','" + 2100 + "','" + datestringarray[14 + startday] + "','" + datestringarray[14] + "')";
    //     sid = parseInt(sid) + 1;
    //     //WEEK 4
    //     wwsid = parseInt(wwsid) + 1;
    //     var shiftquery3 = insertshiftquery + " ('" + sid + "','" + wwsid + "','" + 1200 + "','" + 1600 + "','" + datestringarray[21 + startday] + "','" + datestringarray[21] + "')";
    //     sid = parseInt(sid) + 1;
    //     var shiftquery4 = insertshiftquery + " ('" + sid + "','" + wwsid + "','" + 1700 + "','" + 2100 + "','" + datestringarray[21 + startday] + "','" + datestringarray[21] + "')";
    //     sid = parseInt(sid) + 1;

    //     wwsid = parseInt(wwsid) - 3;

    //     pool.query(shiftquery1, (err, data) => {
    //         if (err) {
    //             return console.error('Error executing query', err.stack)
    //         }
    //     });

    //     pool.query(shiftquery2, (err, data) => {
    //         if (err) {
    //             return console.error('Error executing query', err.stack)
    //         }
    //     });

    //     pool.query(shiftquery3, (err, data) => {
    //         if (err) {
    //             return console.error('Error executing query', err.stack)
    //         }
    //     });

    //     pool.query(shiftquery4, (err, data) => {
    //         if (err) {
    //             return console.error('Error executing query', err.stack)
    //         }
    //     });


    // } else if (day1 == '1pm') {
    //     console.log('DAY 1 1PM');
    //     var shiftquery1 = insertshiftquery + " ('" + sid + "','" + wwsid + "','" + 1300 + "','" + 1700 + "','" + datestringarray[0 + startday] + "','" + firstdayofweek + "')";
    //     sid = parseInt(sid) + 1;
    //     var shiftquery2 = insertshiftquery + " ('" + sid + "','" + wwsid + "','" + 1800 + "','" + 2200 + "','" + datestringarray[0 + startday] + "','" + firstdayofweek + "')";
    //     sid = parseInt(sid) + 1;
    //     //WEEK 2
    //     wwsid = parseInt(wwsid) + 1;
    //     var shiftquery3 = insertshiftquery + " ('" + sid + "','" + wwsid + "','" + 1300 + "','" + 1700 + "','" + datestringarray[7 + startday] + "','" + datestringarray[7] + "')";
    //     sid = parseInt(sid) + 1;
    //     var shiftquery4 = insertshiftquery + " ('" + sid + "','" + wwsid + "','" + 1800 + "','" + 2200 + "','" + datestringarray[7 + startday] + "','" + datestringarray[7] + "')";
    //     sid = parseInt(sid) + 1;
    //     //WEEK 3
    //     wwsid = parseInt(wwsid) + 1;
    //     var shiftquery3 = insertshiftquery + " ('" + sid + "','" + wwsid + "','" + 1300 + "','" + 1700 + "','" + datestringarray[14 + startday] + "','" + datestringarray[14] + "')";
    //     sid = parseInt(sid) + 1;
    //     var shiftquery4 = insertshiftquery + " ('" + sid + "','" + wwsid + "','" + 1800 + "','" + 2200 + "','" + datestringarray[14 + startday] + "','" + datestringarray[14] + "')";
    //     sid = parseInt(sid) + 1;
    //     //WEEK 4
    //     wwsid = parseInt(wwsid) + 1;
    //     var shiftquery3 = insertshiftquery + " ('" + sid + "','" + wwsid + "','" + 1300 + "','" + 1700 + "','" + datestringarray[21 + startday] + "','" + datestringarray[21] + "')";
    //     sid = parseInt(sid) + 1;
    //     var shiftquery4 = insertshiftquery + " ('" + sid + "','" + wwsid + "','" + 1800 + "','" + 2200 + "','" + datestringarray[21 + startday] + "','" + datestringarray[21] + "')";
    //     sid = parseInt(sid) + 1;

    //     wwsid = parseInt(wwsid) - 3;

    //     pool.query(shiftquery1, (err, data) => {
    //         if (err) {
    //             return console.error('Error executing query', err.stack)
    //         }
    //     });

    //     pool.query(shiftquery2, (err, data) => {
    //         if (err) {
    //             return console.error('Error executing query', err.stack)
    //         }
    //     });

    //     pool.query(shiftquery3, (err, data) => {
    //         if (err) {
    //             return console.error('Error executing query', err.stack)
    //         }
    //     });

    //     pool.query(shiftquery4, (err, data) => {
    //         if (err) {
    //             return console.error('Error executing query', err.stack)
    //         }
    //     });

    // }

    // //DAY 2 INSERTING HERE
    // //var day2string = datearray[0] + '-' + datearray[1] + '-' + seconddaystring;

    // if (day2 == '10am') {
    //     console.log('DAY 2 10AM');
    //     var shiftquery1 = insertshiftquery + " ('" + sid + "','" + wwsid + "','" + 1000 + "','" + 1400 + "','" + datestringarray[1 + startday] + "','" + firstdayofweek + "')";
    //     sid = parseInt(sid) + 1;
    //     var shiftquery2 = insertshiftquery + " ('" + sid + "','" + wwsid + "','" + 1500 + "','" + 1900 + "','" + datestringarray[1 + startday] + "','" + firstdayofweek + "')";
    //     sid = parseInt(sid) + 1;
    //     //WEEK 2
    //     wwsid = parseInt(wwsid) + 1;
    //     var shiftquery3 = insertshiftquery + " ('" + sid + "','" + wwsid + "','" + 1000 + "','" + 1400 + "','" + datestringarray[8 + startday] + "','" + datestringarray[7] + "')";
    //     sid = parseInt(sid) + 1;
    //     var shiftquery4 = insertshiftquery + " ('" + sid + "','" + wwsid + "','" + 1500 + "','" + 1900 + "','" + datestringarray[8 + startday] + "','" + datestringarray[7] + "')";
    //     sid = parseInt(sid) + 1;
    //     //WEEK 3
    //     wwsid = parseInt(wwsid) + 1;
    //     var shiftquery3 = insertshiftquery + " ('" + sid + "','" + wwsid + "','" + 1000 + "','" + 1400 + "','" + datestringarray[15 + startday] + "','" + datestringarray[14] + "')";
    //     sid = parseInt(sid) + 1;
    //     var shiftquery4 = insertshiftquery + " ('" + sid + "','" + wwsid + "','" + 1500 + "','" + 1900 + "','" + datestringarray[15 + startday] + "','" + datestringarray[14] + "')";
    //     sid = parseInt(sid) + 1;
    //     //WEEK 4
    //     wwsid = parseInt(wwsid) + 1;
    //     var shiftquery3 = insertshiftquery + " ('" + sid + "','" + wwsid + "','" + 1000 + "','" + 1400 + "','" + datestringarray[22 + startday] + "','" + datestringarray[21] + "')";
    //     sid = parseInt(sid) + 1;
    //     var shiftquery4 = insertshiftquery + " ('" + sid + "','" + wwsid + "','" + 1500 + "','" + 1900 + "','" + datestringarray[22 + startday] + "','" + datestringarray[21] + "')";
    //     sid = parseInt(sid) + 1;

    //     wwsid = parseInt(wwsid) - 3;

    //     pool.query(shiftquery1, (err, data) => {
    //         if (err) {
    //             return console.error('Error executing query', err.stack)
    //         }
    //     });

    //     pool.query(shiftquery2, (err, data) => {
    //         if (err) {
    //             return console.error('Error executing query', err.stack)
    //         }
    //     });

    //     pool.query(shiftquery3, (err, data) => {
    //         if (err) {
    //             return console.error('Error executing query', err.stack)
    //         }
    //     });

    //     pool.query(shiftquery4, (err, data) => {
    //         if (err) {
    //             return console.error('Error executing query', err.stack)
    //         }
    //     });

    //     pool.query('Select startdate, count(*) as num from WWS natural join Users group by startdate order by startdate desc', (err, data) => {
    //         res.render('fdsmanager/viewwws', { date: 'All Weekly Schedules Created', data: data.rows, months: months });
    //     });

    // } else if (day2 == '11am') {
    //     console.log('DAY 2 11AM');
    //     var shiftquery1 = insertshiftquery + " ('" + sid + "','" + wwsid + "','" + 1100 + "','" + 1500 + "','" + datestringarray[1 + startday] + "','" + firstdayofweek + "')";
    //     sid = parseInt(sid) + 1;
    //     var shiftquery2 = insertshiftquery + " ('" + sid + "','" + wwsid + "','" + 1600 + "','" + 2000 + "','" + datestringarray[1 + startday] + "','" + firstdayofweek + "')";
    //     sid = parseInt(sid) + 1;
    //     //WEEK 2
    //     wwsid = parseInt(wwsid) + 1;
    //     var shiftquery3 = insertshiftquery + " ('" + sid + "','" + wwsid + "','" + 1100 + "','" + 1500 + "','" + datestringarray[8 + startday] + "','" + datestringarray[7] + "')";
    //     sid = parseInt(sid) + 1;
    //     var shiftquery4 = insertshiftquery + " ('" + sid + "','" + wwsid + "','" + 1600 + "','" + 2000 + "','" + datestringarray[8 + startday] + "','" + datestringarray[7] + "')";
    //     sid = parseInt(sid) + 1;
    //     wwsid = parseInt(wwsid) - 1;

    //     pool.query(shiftquery1, (err, data) => {
    //         if (err) {
    //             return console.error('Error executing query', err.stack)
    //         }
    //     });

    //     pool.query(shiftquery2, (err, data) => {
    //         if (err) {
    //             return console.error('Error executing query', err.stack)
    //         }
    //     });

    //     pool.query(shiftquery3, (err, data) => {
    //         if (err) {
    //             return console.error('Error executing query', err.stack)
    //         }
    //     });

    //     pool.query(shiftquery4, (err, data) => {
    //         if (err) {
    //             return console.error('Error executing query', err.stack)
    //         }
    //     });

    //     pool.query('Select startdate, count(*) as num from WWS natural join Users group by startdate order by startdate desc', (err, data) => {
    //         res.render('fdsmanager/viewwws', { date: 'All Weekly Schedules Created', data: data.rows, months: months });
    //     });

    // } else if (day2 == '12pm') {
    //     console.log('DAY 2 12PM');
    //     var shiftquery1 = insertshiftquery + " ('" + sid21 + "','" + wwsid + "','" + 1200 + "','" + 1600 + "','" + datestringarray[1 + startday] + "','" + firstdayofweek + "')";
    //     sid = parseInt(sid) + 1;
    //     var shiftquery2 = insertshiftquery + " ('" + sid22 + "','" + wwsid + "','" + 1700 + "','" + 2100 + "','" + datestringarray[1 + startday] + "','" + firstdayofweek + "')";
    //     sid = parseInt(sid) + 1;
    //     //WEEK 2
    //     wwsid = parseInt(wwsid) + 1;
    //     var shiftquery3 = insertshiftquery + " ('" + sid + "','" + wwsid + "','" + 1200 + "','" + 1600 + "','" + datestringarray[8 + startday] + "','" + datestringarray[7] + "')";
    //     sid = parseInt(sid) + 1;
    //     var shiftquery4 = insertshiftquery + " ('" + sid + "','" + wwsid + "','" + 1700 + "','" + 2100 + "','" + datestringarray[8 + startday] + "','" + datestringarray[7] + "')";
    //     sid = parseInt(sid) + 1;
    //     wwsid = parseInt(wwsid) - 1;

    //     pool.query(shiftquery1, (err, data) => {
    //         if (err) {
    //             return console.error('Error executing query', err.stack)
    //         }
    //     });

    //     pool.query(shiftquery2, (err, data) => {
    //         if (err) {
    //             return console.error('Error executing query', err.stack)
    //         }
    //     });

    //     pool.query(shiftquery3, (err, data) => {
    //         if (err) {
    //             return console.error('Error executing query', err.stack)
    //         }
    //     });

    //     pool.query(shiftquery4, (err, data) => {
    //         if (err) {
    //             return console.error('Error executing query', err.stack)
    //         }
    //     });

    //     pool.query('Select startdate, count(*) as num from WWS natural join Users group by startdate order by startdate desc', (err, data) => {
    //         res.render('fdsmanager/viewwws', { date: 'All Weekly Schedules Created', data: data.rows, months: months });
    //     });

    // } else if (day2 == '1pm') {
    //     console.log('DAY 2 1PM');
    //     var shiftquery1 = insertshiftquery + " ('" + sid21 + "','" + wwsid + "','" + 1300 + "','" + 1700 + "','" + datestringarray[1 + startday] + "','" + firstdayofweek + "')";
    //     sid = parseInt(sid) + 1;
    //     var shiftquery2 = insertshiftquery + " ('" + sid22 + "','" + wwsid + "','" + 1800 + "','" + 2200 + "','" + datestringarray[1 + startday] + "','" + firstdayofweek + "')";
    //     sid = parseInt(sid) + 1;
    //     //WEEK 2
    //     wwsid = parseInt(wwsid) + 1;
    //     var shiftquery3 = insertshiftquery + " ('" + sid + "','" + wwsid + "','" + 1300 + "','" + 1700 + "','" + datestringarray[8 + startday] + "','" + datestringarray[7] + "')";
    //     sid = parseInt(sid) + 1;
    //     var shiftquery4 = insertshiftquery + " ('" + sid + "','" + wwsid + "','" + 1800 + "','" + 2200 + "','" + datestringarray[8 + startday] + "','" + datestringarray[7] + "')";
    //     sid = parseInt(sid) + 1;
    //     //WEEK 2
    //     wwsid = parseInt(wwsid) - 1;

    //     pool.query(shiftquery1, (err, data) => {
    //         if (err) {
    //             return console.error('Error executing query', err.stack)
    //         }
    //     });

    //     pool.query(shiftquery2, (err, data) => {
    //         if (err) {
    //             return console.error('Error executing query', err.stack)
    //         }
    //     });

    //     pool.query(shiftquery3, (err, data) => {
    //         if (err) {
    //             return console.error('Error executing query', err.stack)
    //         }
    //     });

    //     pool.query(shiftquery4, (err, data) => {
    //         if (err) {
    //             return console.error('Error executing query', err.stack)
    //         }
    //     });

    //     pool.query('Select startdate, count(*) as num from WWS natural join Users group by startdate order by startdate desc', (err, data) => {
    //         res.render('fdsmanager/viewwws', { date: 'All Weekly Schedules Created', data: data.rows, months: months });
    //     });
    // }
});

module.exports = router;
