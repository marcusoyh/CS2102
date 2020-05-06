var express = require('express');
var router = express.Router();

const { Pool } = require('pg')

const pool = new Pool({
  connectionString: process.env.DATABASE_URL //we need to edit the .env individually, and put it in .gitignore
});

var selectQuery = 'SELECT month, totalorders, totalcost from viewOne group by month';
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

// GET
router.get('/', function(req, res, next) {
  pool.query('SELECT * FROM Drivers NATURAL JOIN Users', (err, drivers) => {
  res.render('fdsmanager/fdsfour', { title: 'Choose Date',drivers: drivers.rows });
  });
});


// POST
router.post('/', function(req, res, next) {
  // Retrieve Information
  var uid = req.body.uid;
  var month  = req.body.month;
  var year = req.body.year;
  console.log(uid);
  

  var lastday = function(year,month){
    return  new Date(year, month, 0).getDate();
  }

  var lastdayofmonth = lastday(year,month);
  var startMonth = "'" + year + "-" + month + "-" + "01 00:00:00'"; //'2015-11-01 00:00:00'
  var endMonth = "'" +year + "-" + month + "-" + lastdayofmonth + " 23:59:00'"; //'2015-11-30 23:59:00'
  console.log(startMonth);
  console.log(endMonth);
    // Construct Specific SQL Query
    //total number of hours, salary - this query works on psql
    var query_first = "SELECT name, count(oid) as totalOrders, sum(endTime-startTime) as totalHours, sum(EXTRACT(EPOCH FROM (deliveryTime::timestamp  - timeRiderLeavesRestaurant::timestamp))), sum(riderRating) as totalRating FROM Shifts Natural join WWS natural join Users natural join Drivers natural join Orders WHERE timeRiderLeavesRestaurant between "+ startMonth + " AND " + endMonth + " AND uid = " + uid + " GROUP BY name";
  //salary - this query works on psql
  var query_one = "SELECT salary, count(WWS) as weeks, sum(commission) as sumcommission FROM Drivers NATURAL JOIN Users NATURAL JOIN WWS NATURAL JOIN Orders WHERE uid = " + uid + " AND did = " + uid +" AND timeRiderDeparts between " + startMonth + " AND "+ endMonth + " GROUP BY uid";
  
  pool.query(query_first, (err,data) =>{
    console.log(data.rows[0].sum);
    pool.query(query_one, (err,data2) =>{
      var totalsalary;
        //if salary = 500 or 1700 (based on ft or pt)
        //then take the date difference divide by week/month and * the base salary
    //then sum the commission
    console.log(data2.rows[0].weeks);
        if (data.rows[0].salary = 400) { //pt
            totalsalary = data2.rows[0].weeks*400 + data2.rows[0].sumcommission;
        } else if (data.rows[0].salary = 1700) { //ft
            totalsalary = 1*1700 + data.rows[0].sumcommission;
    }
    res.render('fdsmanager/summaryfour', { title: 'Summary Four' , month: month, year: year, data: data.rows, totalsalary: totalsalary});
    });
  });
  
    
});

//to query for searching for specific months, we do select * from orders where timeDelivered between '2015-10-10' and '2016-10-10';
module.exports = router;