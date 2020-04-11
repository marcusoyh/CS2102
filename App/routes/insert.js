var express = require('express');
var router = express.Router();

const { Pool } = require('pg')
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'project',
  password: 'postgres',
  port: 5432,
})

/* SQL Query */
var sql_query = 'INSERT INTO Users VALUES';

// GET
router.get('/', function(req, res, next) {
	res.render('insert', { title: 'Adding Users' });
});

// POST
router.post('/', function(req, res, next) {
	// Retrieve Information
	var userId  = req.body.userId;
	var name    = req.body.name;
	var password = req.body.password;
	
	// Construct Specific SQL Query
	var insert_query = sql_query + "('" + userId + "','" + name + "','" + password + "')";
	
	pool.query(insert_query, (err, data) => {
		res.redirect('/select')
	});
});

module.exports = router;
