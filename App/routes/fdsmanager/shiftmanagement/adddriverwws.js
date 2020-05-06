var express = require('express');
var router = express.Router();
const { Pool } = require('pg')
const pool = new Pool({
    connectionString: process.env.DATABASE_URL //we need to edit the .env individually, and put it in .gitignore
});


// GET
router.get('/', function (req, res, next) {
    pool.query('Select * from fulltimers natural join users', (err, data) => {
        if (err) {
            return console.error('Error executing query', err.stack)
        }
        res.render('fdsmanager/adddriverwws', { title: 'Generating a new WWS', data: data.rows });
    });
});


// POST
router.post('/', function (req, res, next) {
    // Retrieve Information
    var uid = req.body.uid;
    //var wwsid = req.body.wwsid;
    //var mwsid = req.body.mwsid;
    var startdatestring = req.body.startdate;

    var startdatearray = startdatestring.split("-");
    //var firstdate = new Date(startdatearray[0],startdatearray[1], startdatearray[2]);
    var firstdate = new Date(startdatestring);

    //CREATING MY DATE ARRAY HERE
    var datestringarray = new Array();
    var lastdateofmonth = new Date();
    lastdateofmonth.setDate(lastdateofmonth.getDate() + 27);
    var tempfirstdate = new Date(firstdate);
    while (tempfirstdate <= lastdateofmonth) {
        datestringarray.push(tempfirstdate.getFullYear() + '-' + (tempfirstdate.getMonth() + 1) + '-' + tempfirstdate.getDate());
        tempfirstdate.setDate(tempfirstdate.getDate() + 7);
    }




    pool.query('Select max(sid) as sid, max(w.wwsid) as wwsid, max(m.mwsid) as mwsid from Shifts s ,WWS w ,MWS m', (maxerr, maxdata) => {
        var wwsid = parseInt(maxdata.rows[0].wwsid) + 1;
        var mwsid = parseInt(maxdata.rows[0].mwsid) + 1;
        var sid = parseInt(maxdata.rows[0].sid) + 1;

        var query = 'INSERT INTO WWS VALUES';
        var firstinsert = query + "('" + uid + "','" + wwsid + "','" + datestringarray[0] + "','" + mwsid + "')";
        wwsid = (parseInt(wwsid) + 1).toString();
        var secondinsert = query + "('" + uid + "','" + wwsid + "','" + datestringarray[1] + "','" + mwsid + "')";
        wwsid = (parseInt(wwsid) + 1).toString();
        var thirdinsert = query + "('" + uid + "','" + wwsid + "','" + datestringarray[2] + "','" + mwsid + "')";
        wwsid = (parseInt(wwsid) + 1).toString();
        var fourthinsert = query + "('" + uid + "','" + wwsid + "','" + datestringarray[3] + "','" + mwsid + "')";

        var mwsquery = 'INSERT INTO MWS VALUES';
        var insertmws = mwsquery + "('" + uid + "','" + mwsid + "')";


        console.log(insertmws);
        pool.query(insertmws, (err, mwsdata) => {
            if (err) {
                return console.error('Error inserting mws', err.stack)
            }
            pool.query(firstinsert, (err, data) => {
                if (err) {
                    return console.error('Error inserting week 1 schedule ', err.stack)
                }
            });
            pool.query(secondinsert, (err, data) => {
                if (err) {
                    return console.error('Error inserting weeek 2 schedule', err.stack)
                }
            });
            pool.query(thirdinsert, (err, data) => {
                if (err) {
                    return console.error('Error inserting week 3 schedule', err.stack)
                }
            });
            pool.query(fourthinsert, (err, data) => {
                if (err) {
                    return console.error('Error inserting week 4 schedule', err.stack)
                }
            });
        });
        wwsid = parseInt(wwsid) - 3;
        console.log("********sid passed over is " +sid)
        res.render('fdsmanager/fillftwws', { startdate: datestringarray[0], wwsid: wwsid, sid:sid });
    });






    console.log('*************');
    console.log('Passing the date over:"');
    console.log(datestringarray[0]);
    console.log('*************');




    // var seconddate = new Date(firstdate);
    // seconddate.setDate(seconddate.getDate() + 7);
    // wwsid = (parseInt(wwsid) + 1).toString();
    // var seconddatestring = seconddate.getFullYear() + '-' + (seconddate.getMonth()+1) + '-' + seconddate.getDate();
    // var secondinsert = query + "('" + uid + "','" + wwsid + "','" + seconddatestring + "')";

    // var thirddate = new Date(seconddate);
    // thirddate.setDate(thirddate.getDate() +7);
    // wwsid = (parseInt(wwsid) + 1).toString();
    // var thirddatestring = thirddate.getFullYear() + '-' + (thirddate.getMonth()+1) + '-' + thirddate.getDate();
    // var thirdinsert = query + "('" + uid + "','" + wwsid + "','" + thirddatestring + "')";

    // var fourthdate = new Date (thirddate);
    // fourthdate.setDate(fourthdate.getDate() +7);
    // wwsid = (parseInt(wwsid) + 1).toString();
    // var fourthdatestring = fourthdate.getFullYear() + '-' + (fourthdate.getMonth()+1) + '-' + fourthdate.getDate();
    // var fourthinsert = query + "('" + uid + "','" + wwsid + "','" + fourthdatestring + "')";

    // console.log(seconddate);
    // console.log(seconddate.getFullYear());
    // console.log(thirddate);
    // console.log(fourthdate);



});

module.exports = router;
