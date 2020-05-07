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
        res.render('driver/deliverOrder', { title: 'Deliver Order' , data: data.rows, oid:oid});
    });
});

router.post('/', function (req, res, next) {
    const oid = req.body.oid;
    var uid = req.body.uid;
    var timeleftres = req.body.timeriderleavesrestaurant;
    var timeleftres2 = timeleftres.replace('T', " ");
    var this_query = "UPDATE ORDERS SET timeriderleavesrestaurant = '" + timeleftres2 + "'where oid = " + oid;
    console.log(this_query)
    pool.query(this_query,(err, data) => {
        res.render('driver/deliverOrder', {title: 'Deliver Order', oid:oid, uid:uid});
    });

});

module.exports = router;