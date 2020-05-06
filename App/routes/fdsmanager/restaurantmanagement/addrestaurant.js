var express = require('express');
var router = express.Router();
const { Pool } = require('pg')
const pool = new Pool({
	connectionString: process.env.DATABASE_URL //we need to edit the .env individually, and put it in .gitignore
});



// GET
router.get('/', function(req, res, next) {
	pool.query('Select max(rid) from Restaurants', (err, data) => {
		res.render('fdsmanager/addrestaurant', { title: 'Adding a Restaurant',data:data });
	});

});


// POST
router.post('/', function(req, res, next) {
	// Retrieve Information
	var rid  = parseInt(req.body.rid) + 1;
	var name = req.body.name;
    var minDeliveryAmount = req.body.minDeliveryAmount;
    var address = req.body.address;
    var insertQuery = 'INSERT INTO Restaurants VALUES';

	// Construct Specific SQL Query
	var postQuery = insertQuery + "('" + rid + "','" + name + "'," + minDeliveryAmount + ",'" +  address  + "')";
	console.log(postQuery);
	pool.query(postQuery, (err, data) => {
		res.redirect('/restaurants');
	});
});

module.exports = router;
