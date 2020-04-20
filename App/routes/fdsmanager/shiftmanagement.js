var express = require('express');
var router = express.Router();

const { Pool } = require('pg')
const pool = new Pool({
	connectionString: process.env.DATABASE_URL //we need to edit the .env individually, and put it in .gitignore
});

//generate default management page
router.get('/', function(req, res, next) {
    pool.query('Select * from Shifts natural join WWS', (err, data) => {
		res.render('fdsmanager/shiftmanagement', {data: data.rows });
	});
});


module.exports = router;
