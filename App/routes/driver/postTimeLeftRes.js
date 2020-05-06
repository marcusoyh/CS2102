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
        res.render('driver/postTimeLeftRes', { title: 'Time Left Restaurant' , data: data.rows, oid:oid});
    });
});

router.post('/:oid', function (req, res, next) {
    const oid = req.body.oid;
    var timeleftres = req.body.timeriderleavesrestaurant;
    var timeleftres2 = timeleftres.replace('T', " ");
    var this_query = "UPDATE ORDERS SET timeriderleavesrestaurant = '" + timeleftres2 + "'where oid = " + oid;
    console.log(this_query)
    pool.query(this_query,(err, data) => {
        res.render('driver/postTimeLeftRes', {title: 'Time Left Restaurant', oid:oid});
    });

});

module.exports = router;