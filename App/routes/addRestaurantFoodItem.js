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
var sql_query = 'INSERT INTO RestaurantFoodItems VALUES ';

// GET
router.get('/:id', function (req, res, next) {
	var rid = req.params.id;
	console.log("RID PASSED OVER TO GET IS " +rid);
	pool.query('SELECT * FROM Restaurants', (err, restaurants) => {
		pool.query('SELECT * FROM Category', (err, categories) => {
			res.render('addRestaurantFoodItem', { title: 'Adding a new food item', restaurants: restaurants.rows, categories: categories.rows, rid: rid });
		});
	});
});

// POST
router.post('/:id', function (req, res, next) {
	// Retrieve Information
	var cid = req.body.cid;
	var foodName = req.body.foodName;
	var maxOrders = req.body.maxOrders;
	var price = req.body.price;
	var availability = req.body.availability;
	var rid = req.body.rid;

	console.log("RID PASSED OVER TO POST IS " +rid);

	// Construct Specific SQL Query
	var insert_query = sql_query + "(" + cid + ",'" + foodName + "'," + maxOrders + "," + price + "," + rid + "," + availability + ")";
	pool.query(insert_query, (err, data) => { });

	 pool.query('SELECT * FROM RestaurantFoodItems WHERE rid = $1', [rid], (err, data) => {
	 	res.render('viewFoodItems', { title: 'All food items available', data: data.rows });
	 });
});


module.exports = router;

