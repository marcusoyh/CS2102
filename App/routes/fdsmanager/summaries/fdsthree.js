var express = require('express');
var router = express.Router();

const { Pool } = require('pg')

const pool = new Pool({
	connectionString: process.env.DATABASE_URL //we need to edit the .env individually, and put it in .gitignore
});


/* SQL Query */

var combinedQuery = 'SELECT DATE_TRUNC(' + "'hour'" + ',timeordered) AS hour, lid , address, count(oid) as totalorders from orders natural join locations group by hour, lid, address order by hour,lid';

var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

router.get('/', function(req, res, next) {
	pool.query(combinedQuery, (err, data) => {
		res.render('fdsmanager/fdsthree', { title: 'Summary Three', data: data.rows, months:months });
	});
});


module.exports = router;
