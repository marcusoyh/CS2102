var express = require('express');
var router = express.Router();

const { Pool } = require('pg')
const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

/* GET method to generate ALL shifts */
router.get('/', function (req, res, next) {
    var this_query = "select distinct oid, did from orders where timeriderdeparts IS NULL AND isdelivered = false";
    console.log(this_query)
	pool.query(this_query, (err, data) => {
		res.render('fdsmanager/viewdriverassignedtoorder', {title: 'View drivers assigned to orders', data: data.rows});
	});
});



module.exports = router;