var express = require('express');
var router = express.Router();

const { Pool } = require('pg')
const pool = new Pool({
    connectionString: process.env.DATABASE_URL //we need to edit the .env individually, and put it in .gitignore
});

router.get('/', function (req, res, next) {
    pool.query('SELECT u.name,r.name as rname, u.uid FROM RestaurantStaff rs natural join Users u join Restaurants r on rs.rid = r.rid ', (err, data) => {
        res.render('fdsmanager/viewallrestaurantstaff', { title: 'All Registered Restaurant Staff', data: data.rows });
    });
});


module.exports = router;
