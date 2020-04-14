var express = require('express');
var router = express.Router();

const { Pool } = require('pg')
const pool = new Pool({
	connectionString: process.env.DATABASE_URL //we need to edit the .env individually, and put it in .gitignore
});

/* SQL Query */
var viewAllQuery = 'SELECT * FROM FDSPromotions';

router.get('/', function(req, res, next) {
	pool.query(viewAllQuery, (err, data) => {
		res.render('fdsmanager/fdspromotions', { title: 'All FDS Promotions', data: data.rows });
	});
});

router.get('/:id', function(req, res, next) {
	const id = req.params.id;

	pool.query('SELECT * FROM FDSPromotions WHERE fpid=$1', [id], (err, data) => {
		res.render('fdsmanager/fdspromotions', { title: 'All FDS Promotions', data: data.rows });
	});
});

module.exports = router;
