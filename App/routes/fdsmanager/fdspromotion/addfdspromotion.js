var express = require('express');
var router = express.Router();

const { Pool } = require('pg')

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

/* SQL Query */
var sql_query = 'INSERT INTO FDSPromotions VALUES ';

// GET
router.get('/', function (req, res, next) {
    res.render('fdsmanager/addfdspromotion', { title: 'Adding FDS Promotion' });
});

// POST
router.post('/', function (req, res, next) {
    // Retrieve Information
    var fpid = req.body.fpid;
    var name = req.body.name;
    var discountAmount = req.body.discountAmount;
    var startDate = req.body.startDate;
    var endDate = req.body.endDate;

    //date.isValid() is a method that returns true/false, can validate whether legit date was entered

    // Construct Insert Query
    var insert_query = sql_query + "('" + fpid + "','" + name + "','" + discountAmount + "','" + startDate + "','" + endDate + "')";
    //var insert_query = sql_query + "('" + fpid + "','" + name + "','" + discountAmount + "','" + "'current_timestamp'" + "','" + "'current_timestamp'" + "')";


    pool.query(insert_query, (err, data) => {
        if (err) {
            return console.error('Error executing query', err.stack)
        }
        res.redirect('./fdspromotionmanagement');
    });

    // pool.query('SELECT * FROM FDSPromotions', (err, data) => {
    //     res.render('fdsmanager/fdspromotionmanagement', { title: 'All FDS Promotions', data: data.rows });
    // });

});


module.exports = router;

