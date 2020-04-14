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
    //remember month is 0-11 instead of 1-12
    // var startDate = new Date(startDateString[2],startDateString[1],startDateString[0],0,0,0,0);
    // var endDate = new Date(endDateString[2],endDateString[1],endDateString[0],0,0,0,0);
    // var startDate = new Date(parseInt(startDateString[2],10),parseInt(startDateString[1],10),parseInt(startDateString[0],10),0,0,0,0);
    // var startDate = new Date(parseInt(endDateString[2],10),parseInt(endDateString[1],10),parseInt(endDateString[0],10),0,0,0,0);
    //var startDate = new Date(2020,05,04,0,0,0,0);
    //var endDate = new Date(2020,06,06,0,0,0,0);

    // Construct Insert Query
    var insert_query = sql_query + "('" + fpid + "','" + name + "','" + discountAmount + "','" + startDate + "','" + endDate + "')";
    //var insert_query = sql_query + "('" + fpid + "','" + name + "','" + discountAmount + "','" + "'current_timestamp'" + "','" + "'current_timestamp'" + "')";


    pool.query(insert_query, (err, data) => {
    	res.redirect('/fdspromotions')
    });

});


module.exports = router;

