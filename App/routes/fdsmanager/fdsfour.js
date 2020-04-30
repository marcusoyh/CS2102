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
	res.render('fdsmanager/fdsfour', { title: 'Choose Date' });
});

// POST
router.post('/', function(req, res, next) {
	// Retrieve Information
	const id = req.params.id;
	var month  = req.body.month;
    var year = req.body.year;
    var driver = req.body.rider;

	var lastday = function(year,month){
		return  new Date(year, month +1, 0).getDate();
	}

	var lastdayofmonth = lastday(year,month);
	var startMonth = "'" + year + "-" + month + "-" + "01 00:00:00'";
	var endMonth = "'" +year + "-" + month + "-" + lastdayofmonth + "23:59:00'";


    // Construct Specific SQL Query
    //total number of hours, salary
	
    var query_first = "SELECT name, count(oid) as totalOrders, sum(deliveryTime - timeRiderLeavesRestaurant) as totaldeliveryTime, sum(riderRating) as totalRating FROM Users natural join Drivers natural join Orders WHERE timeRiderLeavesRestaurant between " + startMonth +'and' + endMonth + " AND name = '" + driver + "' GROUP BY name";
    
    pool.query(query_first, [id],(err, data) => {	
	res.render('fdsmanager/summaryfour', { title: 'Summary Four', month:month,year:year, data: data.rows });
	});
});

//to query for searching for specific months, we do select * from orders where timeDelivered between '2015-10-10' and '2016-10-10';
module.exports = router;
