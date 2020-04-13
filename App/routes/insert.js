var express = require('express');
var router = express.Router();

const { Pool } = require('pg')


const pool = new Pool({
	connectionString: process.env.DATABASE_URL //we need to edit the .env individually, and put it in .gitignore
});

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
	var username = req.body.username;
	
	// Construct Specific SQL Query
	var insert_query = sql_query + "('" + userId + "','" + name + "','" + password + "','" +  username  + "')";
	
	pool.query(insert_query, (err, data) => {
		res.redirect('/select')
	});
});

module.exports = router;
