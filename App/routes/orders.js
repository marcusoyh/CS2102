var express = require('express');
var router = express.Router();

const { Pool } = require('pg')
const pool = new Pool({
	connectionString: process.env.DATABASE_URL //we need to edit the .env individually, and put it in .gitignore
});


/* SQL Query */
var viewAllQuery = 'SELECT * FROM Orders';

router.get('/', function(req, res, next) {
	pool.query(viewAllQuery, (err, data) => {
		res.render('orders', { title: 'All Orders', data: data.rows });
	});
});

module.exports = router;
