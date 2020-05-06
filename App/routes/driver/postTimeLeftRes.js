var express = require('express');
var router = express.Router();

const { Pool } = require('pg')
const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

router.post('/:oid', function (req, res, next) {
    const oid = req.params.oid;
    var timeleftres = req.body.timeriderleavesrestaurant;
    pool.query('UPDATE ORDERS SET timeriderleavesrestaurant = $2 where oid = $1', [oid, timeleftres] ,(err, data) => {
	});

});

module.exports = router;