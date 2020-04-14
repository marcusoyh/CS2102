var express = require('express');
var router = express.Router();

const { Pool } = require('pg')
const pool = new Pool({
	connectionString: process.env.DATABASE_URL //we need to edit the .env individually, and put it in .gitignore
});

router.get('/', function(req, res, next) {
	const id = req.params.id;
	pool.query('SELECT * FROM Orders' ,(err, data) => {
		res.render('viewAllOrders', { title: 'All orders created', data: data.rows });
	});
});

router.get('/:id', function(req, res, next) {
	const id = req.params.id;
	pool.query('SELECT * FROM Orders WHERE rid = $1', [id] ,(err, data) => {
		res.render('viewAllOrders', { title: 'All orders created', data: data.rows });
	});
});

module.exports = router;