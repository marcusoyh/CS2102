var express = require('express');
var router = express.Router();

const { Pool } = require('pg')
const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

// GET
router.get('/:uid/:oid', function(req, res, next) {
    const uid = req.params.uid;
    const oid = req.params.oid;
    var this_query = "";
    pool.query(this_query, [oid] ,(err, data) => {
        res.render('driver/deliverOrder', { title: 'Deliver Order' , data: data.rows, oid:oid, uid:uid});
    });
});

var errormessage = " ";

//POST for time depart
router.post('/', function (req, res, next) {   
    var oid = req.body.oid;
    var uid = req.body.uid;
    var timedepart = req.body.timeriderdeparts;
    console.log("time rider departs: " + timedepart)
    var timedepart2 = timedepart.replace('T', " ");
    console.log("edited: " + timedepart2)
    var this_query = "update orders set timeriderdeparts='" + timedepart2 + "' where oid=" + oid;
    console.log(this_query)
    pool.query(this_query ,(err, data) => {});
    
    var this_query3 = "update drivers set isavailable = false where uid = " + uid;
    console.log(this_query3)
    pool.query(this_query3, (err,data) => {
        res.render('driver/deliverOrder', {title: 'Deliver Order', oid:oid, uid:uid});
    });

});


module.exports = router;