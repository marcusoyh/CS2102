var express = require('express');
var router = express.Router();

const { Pool } = require('pg')

const pool = new Pool({
	connectionString: process.env.DATABASE_URL //we need to edit the .env individually, and put it in .gitignore
});


/* SQL Query */

//var combinedQuery = 'Select username, DATE_TRUNC(' + "'month'" + ',timeriderdeparts) AS month, count(*) as totalorders, sum(deliveryfee) as totalcost from orders o join users u on o.cid=u.uid group by username,month';
var combinedQuery = 'Select username, timeriderdeparts as month, count(*) as totalorders, sum(deliveryfee) as totalcost from orders o join users u on o.cid=u.uid group by month,username order by month,username';
//my query: getting distinct month and year
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

router.get('/', function(req, res, next) {
	var my_query = 'Select distinct extract(month from timeriderdeparts) as month, extract(year from timeriderdeparts) as year, extract(day from timeriderdeparts) as day from orders o join users u on o.cid = u.uid group by timeriderdeparts order by month';
	var another_query = "Select distinct date_trunc('month', deliveryDate), extract(month from deliveryDate) as month, extract(year from deliveryDate) as year from orders o join users u on o.cid = u.uid group by deliveryDate order by month";
	pool.query(another_query, (err, data) => {
		res.render('fdsmanager/fdstwo', { title: 'Summary Two', months: months, data: data.rows});
	});
});


module.exports = router;

 