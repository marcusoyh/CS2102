var express = require('express');
var router = express.Router();

const { Pool } = require('pg')
const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

// GET
router.get('/', function(req, res, next) {
	res.render('driver/driverRegister', { title: 'Register as Delivery Rider' });
});

//POST
router.post('/', function (req, res, next) {

});



module.exports = router;