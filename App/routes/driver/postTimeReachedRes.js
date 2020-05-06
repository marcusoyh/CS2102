var express = require('express');
var router = express.Router();

const { Pool } = require('pg')
const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

// GET
router.get('/:oid', function(req, res, next) {
    const oid = req.params.oid;
    var this_query = "";
    pool.query(this_query, [oid] ,(err, data) => {
        res.render('driver/postTimeReachedRes', { title: 'Time Reached Restaurant' , data: data.rows, oid:oid});
    });
});

//POST
router.post('/:oid', function (req, res, next) {
    var oid = req.body.oid;
    var timereachedres = req.body.timeriderreachesrestaurant;
    console.log("time reached res: "+timereachedres)
    var timereachedres2 = timereachedres.replace('T', " ");
    console.log("time reached res 2: "+ timereachedres2)
    var this_query = "UPDATE ORDERS SET timeriderreachesrestaurant = '" + timereachedres2 +"' where oid = " + oid;
    console.log(this_query)
    pool.query(this_query,(err, data) => {
        res.render('driver/postTimeReachedRes', {title: 'Time Reached Restaurant', oid:oid});
    });

});

module.exports = router;