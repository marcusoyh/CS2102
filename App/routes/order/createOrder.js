var express = require('express');
var router = express.Router();

const { Pool } = require('pg')

const pool = new Pool({
    connectionString: process.env.DATABASE_URL //we need to edit the .env individually, and put it in .gitignore
});

router.get('/', function (req, res, next) {
    res.render('createNewOrder/viewRestaurantList', { title: 'Login as Customer'});
});

// POST customer login
router.post('/', function (req, res, next) {
    // Retrieve Information
    var uid = req.body.uid;
    

    res.render('createNewOrder/viewRestaurantList', { uid:uid});
});


module.exports = router;
