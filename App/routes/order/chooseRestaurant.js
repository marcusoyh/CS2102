var express = require('express');
var router = express.Router();

const { Pool } = require('pg')

const pool = new Pool({
    connectionString: process.env.DATABASE_URL //we need to edit the .env individually, and put it in .gitignore
});



var viewAllQuery = 'SELECT * FROM Restaurants';

router.post('/', function (req, res, next) {
    // Retrieve Information
    var uid = req.body.uid;
	pool.query(viewAllQuery, (err, data) => {
		res.render('createNewOrder/chooseRestaurantList', { uid : uid , data: data.rows });
	});
});


module.exports = router;
