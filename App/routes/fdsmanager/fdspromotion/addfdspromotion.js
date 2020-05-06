var express = require('express');
var router = express.Router();

const { Pool } = require('pg')

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

/* SQL Query */


// GET
router.get('/', function (req, res, next) {
    pool.query('Select max(fpid) from FDSPromotions', (maxerr, maxdata) => {
        res.render('fdsmanager/addfdspromotion', { title: 'Adding FDS Promotion', data: maxdata, errormessage:' ' });
    });
});

// POST
router.post('/', function (req, res, next) {
    // Retrieve Information
    var fpid = parseInt(req.body.fpid) + 1;
    var name = req.body.name;
    var discountAmount = req.body.discountAmount;
    var startDate = req.body.startDate;
    var endDate = req.body.endDate;

    //date.isValid() is a method that returns true/false, can validate whether legit date was entered

    // Construct Insert Query
    var sql_query = 'INSERT INTO FDSPromotions VALUES ';
    var insert_query = sql_query + "('" + fpid + "','" + name + "','" + discountAmount + "','" + startDate + "','" + endDate + "')";
    pool.query(insert_query, (inserterr, data) => {
        if (inserterr) {
            pool.query('Select max(fpid) from FDSPromotions', (maxerr, maxdata) => {
                res.render('fdsmanager/addfdspromotion', { title: 'Adding FDS Promotion', data: maxdata, errormessage: 'ERROR: ' + inserterr.message });
            });
        } else {
            res.redirect('./fdspromotionmanagement');
        }
        
    });


    // pool.query('SELECT * FROM FDSPromotions', (err, data) => {
    //     res.render('fdsmanager/fdspromotionmanagement', { title: 'All FDS Promotions', data: data.rows });
    // });

});


module.exports = router;

