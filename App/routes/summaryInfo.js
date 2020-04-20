var express = require('express');
var router = express.Router();

const { Pool } = require('pg')

const pool = new Pool({
	connectionString: process.env.DATABASE_URL //we need to edit the .env individually, and put it in .gitignore
});

var selectQuery = ' SELECT COALESCE (v1.month,v2.month) as month, v1.totalorders,v1.totalcost,v2.foodname from viewOne v1 full join viewTwo v2 on v1.month=v2.month order by v1.month';
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var minutes = ["01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31","32","33","34","35","36","37","38","39","40","41","42","43","44","45","46","47","48","49","50","51","52","53","54","55","56","57","58","59","60"];
/* GET method to generate the tables */
router.get('/:id', function (req, res, next) {

	var viewOne = 'with viewone as (SELECT DATE_TRUNC(' + "'month'" + ',timeriderdeparts) AS month, count(oid) as totalorders, sum(price) as totalcost from orders natural join OrderContainsFoodItems group by month)';
	var viewTwo = ', viewtwo as (SELECT count(*) as numorders, foodname from RestaurantFoodItems where rid = $1 group by foodname order by numorders)';
	var getQuery = viewOne + viewTwo + selectQuery;
	//this coalesce is the way to join two tables on a common column, but overlap instead of inner joining!
	

	pool.query(getQuery, [rid],(err, data) => {
		res.render('summaryInfo', { title: 'View Summary Information', months: months, data: data.rows });
	});
});


// POST method to filter table
router.post('/', function (req, res, next) {
	// Retrieve Information
	// var dateString = req.body.monthToFilter;

	var postViewOne = 'with viewone as (SELECT DATE_TRUNC(' + "'month'" + ',timeriderdeparts) AS month, count(oid) as totalorders, sum(deliveryfee) as totalcost from orders where month between ' + "'2013-1-1' and " +" '2016-1-1'" + 'group by month)';
	var postViewTwo = ', viewtwo as (SELECT DATE_TRUNC(' + "'month'" + ',signupdate) AS month, count(uid) as totalsignups from customers where month between ' + "'2013-1-1' and " +" '2016-1-1'" + 'group by month)';
	
	var postQuery = postViewOne + postViewTwo + selectQuery;
	//date.isValid() is a method that returns true/false, can validate whether legit date was entered
	pool.query(postQuery, (err, data) => {
		res.render('fdsmanager/fdsone', { title: 'Summary One, Filtered', months: months, data: data.rows })
	});

});

//to query for searching for specific months, we do select * from orders where timeDelivered between '2015-10-10' and '2016-10-10';
module.exports = router;
