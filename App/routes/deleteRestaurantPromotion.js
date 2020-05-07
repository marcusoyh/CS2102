var express = require('express');
var router = express.Router();

const { Pool } = require('pg')
/*const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'project',
  password: 'postgres',
  port: 5432,
})*/

const pool = new Pool({
	connectionString: process.env.DATABASE_URL //we need to edit the .env individually, and put it in .gitignore
});

/* SQL Query */
var sql_query = 'DELETE FROM RestaurantPromotions WHERE rpid =';

// GET
router.get('/:id', function (req, res, next) {
	const id = req.params.id;
	pool.query('SELECT * FROM RestaurantPromotions WHERE rid = $1', [id], (err, data) => {
		res.render('deleteRestaurantPromotion', { title: 'Deleting restaurant promotion', data: data.rows, rid: id, errormessage: ' ' });
	});
});

// POST
router.post('/:id', function (req, res, next) {
	// Retrieve Information
	var rpid = req.body.rpid;
	var rid = req.body.rid;
	// Construct Specific SQL Query
	var insert_query = sql_query + rpid;
	console.log(insert_query);
	pool.query(insert_query, (err, data) => {
		if (err) { //ERROR DELETING
			var errormessage = 'ERROR: Promotion has been used before, cannot be deleted.';
			pool.query('SELECT * FROM RestaurantPromotions WHERE rid = $1', [rid], (err, data) => {
				res.render('deleteRestaurantPromotion', { title: 'Deleting restaurant promotion', data: data.rows, rid: id, errormessage: ' ' });
			});
		} else { //NOTHING WRONG
			pool.query('SELECT * FROM RestaurantPromotions WHERE rid = $1', [rid], (err, data) => {
				res.render('viewRestaurantPromotions', { title: 'All restaurant promotions', data: data.rows });
			});
		}
	});

});


module.exports = router;

