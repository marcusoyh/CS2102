var express = require('express');
var router = express.Router();

const { Pool } = require('pg')

const pool = new Pool({
	connectionString: process.env.DATABASE_URL //we need to edit the .env individually, and put it in .gitignore
});

router.get('/:dateString', function (req, res, next) {
    var date = req.params.dateString;
    console.log("Datestring: " + date);
    var this_query = "select distinct uid, extract(month from deliveryDate) as month, extract(year from deliveryDate) as year, username from orders join users on cid=uid where date_trunc('month', deliveryDate) = $1";
	pool.query(this_query, [date], (err, data) => {
		res.render('fdsmanager/fdstwoviewcustomers', {title: 'Customers this month', data: data.rows, date:date});
	});
});

module.exports = router;