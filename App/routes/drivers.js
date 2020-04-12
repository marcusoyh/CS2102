var express = require('express');
var router = express.Router();

const { Pool } = require('pg')
const pool = new Pool({
	connectionString: process.env.DATABASE_URL //we need to edit the .env individually, and put it in .gitignore
});


/* SQL Query */
var viewAllQuery = 'SELECT * FROM Drivers natural join Users';

router.get('/', function(req, res, next) {
	pool.query(viewAllQuery, (err, data) => {
		res.render('drivers', { title: 'All Drivers', data: data.rows });
	});
});


/* retrieves a driver by uid */
router.get('/:id', function (req, res, next) {
  const id = req.params.id;

  pool.query('SELECT * FROM Drivers natural join Users WHERE uid = $1', [id], (error, data) => {
    if (error) {
      throw error
    }
    res.render('drivers', { title: 'Selected Driver:', data: data.rows });
  })
});

module.exports = router;
