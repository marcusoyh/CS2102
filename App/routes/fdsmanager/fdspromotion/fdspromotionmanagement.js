var express = require('express');
var router = express.Router();

const { Pool } = require('pg')
const pool = new Pool({
	connectionString: process.env.DATABASE_URL //we need to edit the .env individually, and put it in .gitignore
});

var viewAllQuery = 'SELECT * FROM FDSPromotions';

router.get('/', function(req, res, next) {
	pool.query(viewAllQuery, (err, data) => {
		res.render('fdsmanager/fdspromotionmanagement', { title: 'All FDS Promotions', data: data.rows });
	});
});


module.exports = router;
