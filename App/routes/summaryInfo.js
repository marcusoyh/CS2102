var express = require('express');
var router = express.Router();

const { Pool } = require('pg')

const pool = new Pool({
	connectionString: process.env.DATABASE_URL //we need to edit the .env individually, and put it in .gitignore
});

var selectQuery = 'SELECT month, totalorders, totalcost from viewOne group by month';
var months = ["-","January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

// GET
router.get('/:id', function(req, res, next) {
	const id = req.params.id;
	res.render('summaryInfo', { title: 'Summary Information',id:id });
});

// POST
router.post('/:id', function(req, res, next) {
	// Retrieve Information
	var id = req.body.id;
	var month  = req.body.month;
	var year = req.body.year;

	var lastday = function(year,month){
		return  new Date(year, month, 0).getDate();
	}

	var lastdayofmonth = lastday(year,month);
	var startMonth = "'" + year + "-" + month + "-" + "01 00:00:00'"; //'2015-11-01 00:00:00'
	var endMonth = "'" +year + "-" + month + "-" + lastdayofmonth + " 23:59:00'"; //'2015-11-30 23:59:00'
	console.log(startMonth);
	console.log(endMonth);
	console.log(id);
	// Construct Specific SQL Query
	//var viewOne = 'with viewone as (SELECT DATE_TRUNC(' + "'month'" + ',timeriderdeparts) AS month, count(oid) as totalorders, sum(price) as totalcost from orders natural join OrderContainsFoodItems natural join RestaurantFoodItems where rid =$1 group by month)';
	var query_one = "SELECT count(oid) as totalorders, sum(totalprice) as totalcost from Orders natural join OrderContainsFoodItems where rid = $1 AND timeRiderDeparts between " + startMonth + " and " + endMonth ;
	var query_test = 'SELECT foodName, maxOrders FROM RestaurantFoodItems where rid = $1 LIMIT 5'
	var query_three = "SELECT name, count(name) as totalFoodOrders from Orders NATURAL JOIN OrderContainsFoodItems where rid = $1 AND timeRiderDeparts between " + startMonth + " and " + endMonth + " GROUP BY name";
	//var temptable = "WITH FoodCount AS (SELECT count(name) as totalFoodOrders, name from Orders natural join OrderContainsFoodItems where rid = 1 AND timeRiderDeparts between " + startMonth + " and " + endMonth + " group by name)";
	//var query_two = "SELECT name from FoodCount ORDER BY totalFoodOrders DESC limit 5)";
	//var query_combine = temptable + query_two;

	//var query_combineOne = viewOne + selectQuery;
	
	pool.query(query_one, [id], (err, data) => {	
		pool.query(query_three,[id],(err,top5food) => {
			//console.log(top5food.rows[0].name);
			res.render('summaryInfo2', { title: 'View Summary Information', months: months, data: data.rows ,top5food: top5food.rows, month:month,year:year });
		});
	});
});
	

//to query for searching for specific months, we do select * from orders where timeDelivered between '2015-10-10' and '2016-10-10';
module.exports = router;
