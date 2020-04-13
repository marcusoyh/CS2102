var express = require('express');
var router = express.Router();

const { Pool } = require('pg')
const pool = new Pool({
	connectionString: process.env.DATABASE_URL //we need to edit the .env individually, and put it in .gitignore
});


router.get('/:id', function(req, res, next) {
	const id = req.params.id;
	pool.query('SELECT * FROM RestaurantFoodItems WHERE rid = $1', [id] ,(err, data) => {
		res.render('viewFoodItems', { title: 'All food items available', data: data.rows });
	});
});


module.exports = router;
