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
var sql_query = 'DELETE FROM RestaurantFoodItems WHERE foodName = ';

// GET
router.get('/:id', function(req, res, next) {
	const id = req.params.id;
	pool.query('SELECT * FROM RestaurantFoodItems WHERE rid = $1', [id] ,(err, data) => {
		res.render('deleteRestaurantFoodItem', { title: 'View all Food Items', data: data.rows,rid:id, errormessage:' ' });
	});
});

// POST
router.post('/:id', function(req, res, next) {
	// Retrieve Information
	var foodName = req.body.foodName;
	var rid = req.body.rid;
	// Construct Specific SQL Query
	var insert_query = sql_query + "'"+ foodName + "'";
	console.log("DELTE FOOD ITEM");
	console.log(insert_query);
	pool.query(insert_query, (err, data) => {
		if (err) {
			pool.query('SELECT * FROM RestaurantFoodItems WHERE rid = $1', [rid] ,(err, data) => {
				res.render('deleteRestaurantFoodItem', { title: 'View all Food Items', data: data.rows,rid:rid,errormessage:'ERROR: Item has been ordered before, cannot be deleted. Please set to inactive instead.' });
			});
		} else {
			pool.query('SELECT * FROM RestaurantFoodItems WHERE rid = $1', [rid] ,(err, data) => {
				res.render('deleteRestaurantFoodItem', { title: 'View all Food Items', data: data.rows,rid:rid,errormessage:'Deletion Success' });
		});
		}
	});

	
});


module.exports = router;

