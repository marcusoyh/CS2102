var express = require('express');
var router = express.Router();

const { Pool } = require('pg')
const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});


// GET
router.get('/:uid', function(req, res, next) {
    const uid = req.params.uid;
    var salaryndate = "WITH salaryndate AS (SELECT salary, EXTRACT(YEAR FROM signupdate) AS year, EXTRACT(MONTH FROM signupdate) as month, EXTRACT(DAY FROM signupdate) as day FROM drivers where uid = $1), ";
    var driversorders = "driversOrders AS (SELECT sum(commission) AS sumcommission FROM orders WHERE did = $1) "
    var final_query = "SELECT year, month, day, salary, sumcommission FROM salaryndate, driversOrders;"
    var this_query = salaryndate + driversorders + final_query;
    pool.query(this_query, [uid] ,(err, data) => {
        //finding time between the two dates 
        var today =  new Date();
        console.log("Today: " + today);
        var day = data.rows[0].day;
        console.log("Day: " + day);
        var month = data.rows[0].month;
        console.log("Month :" + month);
        var year = data.rows[0].year;
        console.log("Year :" + year);
        var signupdate = new Date(year, month-1, day+1);
        console.log(signupdate);
        var totalsalary;
        //if salary = 500 or 1700 (based on ft or pt)
        //then take the date difference divide by week/month and * the base salary
        //then sum the commission
        if (data.rows[0].salary = 400) { //pt
            var weeks = weeksBetween(signupdate, today);
            console.log("Weeks between: " + weeks)
            totalsalary = weeks*400 + data.rows[0].sumcommission;
        } else if (data.rows[0].salary = 1700) { //ft
            var months = monthsBetween(signupdate, today);
            totalsalary = months*1700 + data.rows[0].sumcommission;
        }
        res.render('driver/viewSalary', { title: 'View Salary' , data: data.rows, totalsalary: totalsalary});
    });
    
    function weeksBetween(d1, d2) {
        var diff =(d2.getTime() - d1.getTime()) / 1000;
        diff /= (60 * 60 * 24 * 7);
        if (diff >= 0) {
            return Math.abs(Math.floor(diff));
        } else {
            return 0;
        }   
    }

    //havent test this yet but should work
    function monthsBetween(dateFrom, dateTo) {
        var diff = dateTo.getMonth() - dateFrom.getMonth() + 
        (12 * (dateTo.getFullYear() - dateFrom.getFullYear()));
        if (diff >=0 ) {
            return Math.abs(Math.floor(diff));
        } else {
            return 0;
        }
       }
    
});







module.exports = router;