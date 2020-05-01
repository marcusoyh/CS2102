var express = require('express');
var router = express.Router();

const { Pool } = require('pg')
const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

//POST
router.post('/:oid', function (req, res, next) {
    const oid = req.params.oid;
    var deliveryTime = req.body.deliverTime;

    pool.query('UPDATE ORDERS SET deliveryTime = $2 where oid = $1', [oid, deliveryTime] ,(err, data) => {
	});

});

module.exports = router;