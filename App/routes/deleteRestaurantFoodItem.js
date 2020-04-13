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
		res.render('deleteRestaurantFoodItem', { title: 'Deleting food item', data: data.rows });
	});
});

// POST
router.post('/:id', function(req, res, next) {
	// Retrieve Information
	var foodName = req.body.foodName;
	var rid = req.body.rid;
	// Construct Specific SQL Query
	var insert_query = sql_query + "'"+ foodName + "'";
	
	pool.query(insert_query, (err, data) => {});

	pool.query('SELECT * FROM RestaurantFoodItems WHERE rid = $1', [rid] ,(err, data) => {
		res.render('viewFoodItems', { title: 'All food items available', data: data.rows });
	});
});


module.exports = router;

