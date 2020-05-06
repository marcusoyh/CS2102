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
        res.render('driver/deliverOrder', { title: 'Enter Depart Time' , data: data.rows, oid:oid});
    });
});

var errormessage = " ";

//POST for time depart
router.post('/', function (req, res, next) {   
    var oid = req.body.oid;
    var timedepart = req.body.timeriderdeparts;
    console.log("time rider departs: " + timedepart)
    var timedepart2 = timedepart.replace('T', " ");
    console.log("edited: " + timedepart2)
    var this_query = "update orders set timeriderdeparts='" + timedepart2 + "' where oid=" + oid;
    console.log(this_query)
    pool.query(this_query ,(err, data) => {
            res.render('driver/deliverOrder', {title: 'Enter Depart Time', oid:oid});
	});

});


module.exports = router;