var express = require('express');
var router = express.Router();

const { Pool } = require('pg')
const pool = new Pool({
	connectionString: process.env.DATABASE_URL //we need to edit the .env individually, and put it in .gitignore
});

var viewAllQuery = 'SELECT * FROM Category';

router.get('/', function(req, res, next) {
	pool.query(viewAllQuery, (err, data) => {
		res.render('fdsmanager/categorymanagement', { title: 'All Food Categories', data: data.rows, errormessage: ' '});
	});
});


module.exports = router;
