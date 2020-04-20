var express = require('express');
var router = express.Router();

const { Pool } = require('pg')

const pool = new Pool({
	connectionString: process.env.DATABASE_URL //we need to edit the .env individually, and put it in .gitignore
});

var selectQuery = 'SELECT month, totalorders, totalcost from viewOne group by month';
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

// GET
router.get('/:id', function(req, res, next) {
	const id = req.params.id;
	res.render('summaryInfo', { title: 'Summary Information' });
});

// POST
router.post('/:id', function(req, res, next) {
	// Retrieve Information
	const id = req.params.id;
	var month  = req.body.month;
	var year = req.body.year;

	var lastday = function(year,month){
		return  new Date(year, month +1, 0).getDate();
	}

	var lastdayofmonth = lastday(year,month);
	var startMonth = "'" + year + "-" + month + "-" + "01 00:00:00'";
	var endMonth = "'" +year + "-" + month + "-" + lastdayofmonth + "23:59:00'";


	// Construct Specific SQL Query
	//var viewOne = 'with viewone as (SELECT DATE_TRUNC(' + "'month'" + ',timeriderdeparts) AS month, count(oid) as totalorders, sum(price) as totalcost from orders natural join OrderContainsFoodItems natural join RestaurantFoodItems where rid =$1 group by month)';
	var query_one = 'SELECT count(oid) as totalorders, sum(price) as totalcost from Orders natural join OrderContainsFoodItems natural join RestaurantFoodItems where rid =$1 AND timeriderdeparts between ' + startMonth +'and' + endMonth;
	var temptable = 'WITH FoodCount AS (SELECT count(foodname) as totalFoodOrders, foodname from Orders natural join OrderContainsFoodItems where rid=$1 AND timeriderdeparts between ' + startMonth + 'and' + endMonth + ')';
	var query_two = 'SELECT foodname from FoodCount ORDER BY totalFoodOrders DESC limit 5)';
	var query_combine = temptable + query_two;
	//var query_combineOne = viewOne + selectQuery;
	var myList = []; //myList = [month,year,totalnumOrders,totalCost,top5]
	var top5 = "";

	pool.query(query_one, [id],(err, data) => {	
		myList.push(data);
	});
	pool.query(query_combine,[id],(err,data) => {
		var i;
		var rows;
		if(data.rows.length < 5){
			rows = data.rows.length;
		} else { rows = 5;}

		for (i = 0; i < rows; i++) {
		  if(i == 4){
			  top5 += data[i];
		  }
			top5 += data[i] + ", ";
		  
		}
	});
	myList.push(top5);

	res.render('summaryInfo2', { title: 'View Summary Information', months: months, data: myList });
});


















/* GET method to generate the tables 
router.get('/:id', function (req, res, next) {
	const id = req.params.id;
	var viewOne = 'with viewone as (SELECT DATE_TRUNC(' + "'month'" + ',timeriderdeparts) AS month, count(oid) as totalorders, sum(price) as totalcost from orders natural join OrderContainsFoodItems natural join RestaurantFoodItems where rid =$1 group by month)';
	var getQuery = viewOne + selectQuery;

	pool.query(getQuery, [id],(err, data) => {
		res.render('summaryInfo', { title: 'View Summary Information', months: months, data: data.rows });
	});
});*/


/* POST method to filter table
router.post('/:id', function (req, res, next) {
	// Retrieve Information
	// var dateString = req.body.monthToFilter;

	var postViewOne = 'with viewone as (SELECT DATE_TRUNC(' + "'month'" + ',timeriderdeparts) AS month, count(oid) as totalorders, sum(price) as totalcost from orders natural join OrderContainsFoodItems natural join RestaurantFoodItems where rid =$1, month between ' + "'2013-1-1' and " +" '2016-1-1'" + 'group by month)';
	
	var postQuery = postViewOne +  selectQuery;
	//date.isValid() is a method that returns true/false, can validate whether legit date was entered
	pool.query(postQuery, (err, data) => {
		res.render('summaryInfo', { title: 'Summary Info, Filtered', months: months, data: data.rows })
	});

});*/

//to query for searching for specific months, we do select * from orders where timeDelivered between '2015-10-10' and '2016-10-10';
module.exports = router;
