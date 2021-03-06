var express = require('express');
var router = express.Router();

const { Pool } = require('pg')
/* --- V7: Using Dot Env ---
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: '********',
  port: 5432,
})
*/
const pool = new Pool({
	connectionString: process.env.DATABASE_URL //we need to edit the .env individually, and put it in .gitignore
});


/* SQL Query */
var viewAllQuery = 'SELECT * FROM Users';

router.get('/', function(req, res, next) {
	pool.query(viewAllQuery, (err, data) => {
		res.render('select', { title: 'All Users', data: data.rows });
	});
});


/* retrieves a user by uid */
router.get('/:id', function (req, res, next) {
  const id = req.params.id;

  pool.query('SELECT * FROM Users WHERE uid = $1', [id], (error, data) => {
    if (error) {
      throw error
    }
    res.render('select', { title: 'Selected User:', data: data.rows });
  })
});

module.exports = router;
