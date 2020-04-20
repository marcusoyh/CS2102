var express = require('express');
var router = express.Router();
const { Pool } = require('pg')
const pool = new Pool({
    connectionString: process.env.DATABASE_URL //we need to edit the .env individually, and put it in .gitignore
});


// GET
router.get('/', function (req, res, next) {
    res.render('fdsmanager/deletepromotion', { title: 'Enter ID of FDS Promotion to delete' });
});


// POST
router.post('/', function (req, res, next) {
    // Retrieve Information
    var fpid = req.body.fpid;

    pool.query('DELETE FROM FDSPromotions WHERE fpid = $1', [fpid], (err, data) => {
        if (err) {
            return console.error('Error executing query', err.stack)
        }
    });

    pool.query('SELECT * FROM FDSPromotions', (err, data) => {
        res.render('fdsmanager/fdspromotionmanagement', { title: 'All FDS Promotions', data: data.rows });
    });


});

module.exports = router;
