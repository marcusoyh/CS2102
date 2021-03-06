var express = require('express');
var router = express.Router();

const { Pool } = require('pg')
const pool = new Pool({
	connectionString: process.env.DATABASE_URL //we need to edit the .env individually, and put it in .gitignore
});

var minutes = ["00","01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31","32","33","34","35","36","37","38","39","40","41","42","43","44","45","46","47","48","49","50","51","52","53","54","55","56","57","58","59","60"];
var hours = ["00","01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23"];

router.get('/', function(req, res, next) {
	const id = req.params.id;
	pool.query('SELECT * FROM Orders' ,(err, data) => {
		res.render('viewAllOrders', { title: 'All orders created', data: data.rows });
	});
});


router.get('/:id', function(req, res, next) {
	const id = req.params.id;
	var this_query = "SELECT oid, orderreview, deliveryfee, paymentmode, DATE_TRUNC('minute'" +", timeordered) as timeo, isdelivered, DATE_TRUNC('minute',timeriderdeparts) as timed, DATE_TRUNC('minute',timeriderreachesrestaurant) as timer, DATE_TRUNC('minute', timeriderleavesrestaurant) as timel, DATE_TRUNC('minute',deliverytime) as timet, lid, did, cid FROM Orders WHERE rid =$1";
	pool.query(this_query, [id] ,(err, data) => {
		res.render('viewAllOrders', { title: 'All orders created', hours: hours, minutes: minutes, data: data.rows});
	});
});

module.exports = router;
