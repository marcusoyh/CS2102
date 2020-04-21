import { Pool } from "pg";

//POST
router.post('/:oid', function (req, res, next) {
    const oid = req.params.oid;
    var deliveryTime = req.body.deliverTime;

    pool.query('UPDATE ORDERS SET deliverytime = deliveryTime where oid = $1', [oid] ,(err, data) => {
	});

});