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

//(.*) may be added?
//POST for time depart
router.post('/:oid', function (req, res, next) {
    const oid = req.params.oid;
    var timedepart = req.body.timeriderdeparts;
    console.log("TESTING THE UPDATE METHOD");
    console.log("OID IS: " +oid);
    console.log("Time depart is: " + timedepart);
    pool.query('UPDATE ORDERS SET timeriderdeparts = $2 where oid = $1', [oid, timedepart] ,(err, data) => {
	});

});


module.exports = router;