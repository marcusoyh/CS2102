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
var sql_query = 'INSERT INTO RestaurantPromotions VALUES ';

// GET
router.get('/:id', function(req, res, next) {
	res.render('addRestaurantPromotion', { title: 'Add a new Restaurant Promotion' });
});

// POST
router.post('/:id', function(req, res, next) {
	// Retrieve Information
    var rpid = req.body.rpid;
    var rid = req.body.rid;
    var name = req.body.name;
    var discountAmount = req.body.discountAmount;
    var startDate = req.body.startDate;
    var endDate = req.body.endDate;


	// Construct Specific SQL Query
	var insert_query = sql_query + "(" + rpid + "," + rid + ",'" + name + "'," + discountAmount + ",'" + startDate + "','" + endDate + "')";
	pool.query(insert_query, (err, data) => {});

	pool.query('SELECT * FROM RestaurantPromotions WHERE rid = $1', [rid] ,(err, data) => {
		res.render('viewRestaurantPromotions', { title: 'All Restaurant Promotions', data: data.rows });
	});
});


module.exports = router;