var express = require('express');
var router = express.Router();

const { Pool } = require('pg')
const pool = new Pool({
	connectionString: process.env.DATABASE_URL //we need to edit the .env individually, and put it in .gitignore
});


router.get('/:id', function(req, res, next) {
	const id = req.params.id;
	pool.query('SELECT * FROM RestaurantPromotions WHERE rid = $1 ORDER BY rpid', [id] ,(err, data) => {
		res.render('viewRestaurantPromotions', { title: 'All Restaurant Promotions', data: data.rows });
	});
});


module.exports = router;
