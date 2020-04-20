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
        var day = data.rows[0].day;
        var month = data.rows[0].month;
        var year = data.rows[0].year;
        var signupdate = new Date(year, month, day);
        var totalsalary;
        //if salary = 500 or 1700 (based on ft or pt)
        //then take the date difference divide by week/month and * the base salary
        //then sum the commission
        if (data.rows[0].salary = 400) { //pt
            var weeks = weeksBetween(today, signupdate);
            totalsalary = weeks*400 + data.rows[0].sumcommission;
        } else if (data.rows[0].salary = 1700) { //ft
            var months = monthsBetween(today, signupdate);
            totalsalary = months*1700 + data.rows[0].sumcommission;
        }
        res.render('driver/viewSalary', { title: 'View Salary' , data: data.rows, totalsalary: totalsalary});
    });
    
    function weeksBetween(d1, d2) {
        return Math.round((d2 - d1) / (7 * 24 * 60 * 60 * 1000));
    }

    function monthsBetween(dateFrom, dateTo) {
        return dateTo.getMonth() - dateFrom.getMonth() + 
          (12 * (dateTo.getFullYear() - dateFrom.getFullYear()))
       }
    
});







module.exports = router;