var express = require('express');
var router = express.Router();

const { Pool } = require('pg')

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

/* SQL Query */


// GET
router.get('/', function (req, res, next) {
    res.render('fdsmanager/addcategory', { title: 'Adding New Food Category' });
});

// POST
router.post('/', function (req, res, next) {
    var name = req.body.name;
    var sql_query = 'INSERT INTO Category VALUES ';
    var insert_query = sql_query + "(default,'" + name + "')";
    pool.query(insert_query, (inserterr, data) => {
        if (inserterr) {
            console.log(inserterr.stack);
        } else {
            res.redirect('./categorymanagement');
        }

    });
});
module.exports = router;

