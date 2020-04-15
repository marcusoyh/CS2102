var express = require('express');
var router = express.Router();
const { Pool } = require('pg')
const pool = new Pool({
	connectionString: process.env.DATABASE_URL //we need to edit the .env individually, and put it in .gitignore
});



// GET
router.get('/', function(req, res, next) {
	res.render('fdsmanager/addrestaurant', { title: 'Adding a Restaurant' });
});


// POST
router.post('/', function(req, res, next) {
	// Retrieve Information
	var rid  = req.body.rid;
	var name = req.body.name;
    var minDeliveryAmount = req.body.minDeliveryAmount;
    var address = req.body.address;
    var insertQuery = 'INSERT INTO Restaurants VALUES';

	// Construct Specific SQL Query
	var postQuery = insertQuery + "('" + rid + "','" + name + "'," + minDeliveryAmount + ",'" +  address  + "')";
	
	pool.query(postQuery, (err, data) => {
		res.redirect('/restaurants');
	});
});

module.exports = router;
