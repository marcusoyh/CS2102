var express = require('express');
var router = express.Router();

const { Pool } = require('pg')

const pool = new Pool({
	connectionString: process.env.DATABASE_URL //we need to edit the .env individually, and put it in .gitignore
});

router.get('/:uid', function (req, res, next) {
    const cid = req.params.uid;
    var this_query = "with customerOrders as (select cid, sum(totalprice) as totalcost, count(*) as totalorders from orders join users on cid = uid group by cid) select cid, totalcost, totalorders from customerOrders where cid = $1;";
	pool.query(this_query, [cid], (err, data) => {
		res.render('fdsmanager/fdstwoviewordersbycustomer', {title: 'Orders this month', data: data.rows, cid:cid});
	});
});

module.exports = router;