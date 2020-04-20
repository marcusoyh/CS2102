var express = require('express');
var router = express.Router();

const { Pool } = require('pg')

const pool = new Pool({
	connectionString: process.env.DATABASE_URL //we need to edit the .env individually, and put it in .gitignore
});

var selectQuery = 'SELECT month, totalorders, totalcost from viewOne order by month';
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

// GET
router.get('/:id', function(req, res, next) {
	res.render('summarInfo', { title: 'Summary Information' });
});

// POST
router.post('/:id', function(req, res, next) {
	// Retrieve Information
	var month  = req.body.month;
	var year = req.body.year;

	// Construct Specific SQL Query
	var viewOne = 'with viewone as (SELECT DATE_TRUNC(' + "'month'" + ',timeriderdeparts) AS month, count(oid) as totalorders, sum(price) as totalcost from orders natural join OrderContainsFoodItems natural join RestaurantFoodItems where rid =$1 group by month)';
	var getQuery = viewOne + selectQuery;

	pool.query(getQuery, [id],(err, data) => {
		res.render('summaryInfo2', { title: 'View Summary Information', months: months, data: data.rows });
	});
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
