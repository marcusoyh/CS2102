var express = require('express');
var router = express.Router();

const { Pool } = require('pg')
const pool = new Pool({
	connectionString: process.env.DATABASE_URL //we need to edit the .env individually, and put it in .gitignore
});

//generate default management page
router.get('/', function(req, res, next) {
    res.render('fdsmanager/restaurantstaffmanagement');
});


module.exports = router;
