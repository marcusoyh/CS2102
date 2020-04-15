var express = require('express');
var router = express.Router();

const { Pool } = require('pg')

const pool = new Pool({
	connectionString: process.env.DATABASE_URL //we need to edit the .env individually, and put it in .gitignore
});


/* SQL Query */

//var combinedQuery = 'Select username, DATE_TRUNC(' + "'month'" + ',timeriderdeparts) AS month, count(*) as totalorders, sum(deliveryfee) as totalcost from orders o join users u on o.cid=u.uid group by username,month';
var combinedQuery = 'Select username, timeriderdeparts as month, count(*) as totalorders, sum(deliveryfee) as totalcost from orders o join users u on o.cid=u.uid group by month,username order by month,username';

var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

router.get('/', function(req, res, next) {
	pool.query(combinedQuery, (err, data) => {
		res.render('fdsmanager/fdstwo', { title: 'Summary Two', months: months, data: data.rows });
	});
});


module.exports = router;

 