var express = require('express');
var router = express.Router();

const { Pool } = require('pg')
const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

// GET
router.get('/', function(req, res, next) {
    const oid = req.params.oid;
    var this_query = "";
    pool.query(this_query, [oid] ,(err, data) => {
        res.render('driver/deliverOrder', { title: 'Deliver Order' , data: data.rows, oid:oid});
    });
});

//POST
router.post('/', function (req, res, next) {
    // var uid = sessionStorage.getItem("uid");
    var uid = req.body.uid;
    var oid = req.body.oid;
    var deliveryTime = req.body.deliveryTime;
    var deliveryTime2 = deliveryTime.replace('T', " ");
    console.log("delivery time: " + deliveryTime)
    console.log("deliveryTime 2: " + deliveryTime2)
    var dt = new Date();
    var year = dt.getFullYear();
    var month = dt.getMonth() +1;
    if (month <10) {
        month = "0" + month;
    }
    var date = dt.getDate();
    if (date < 10) {
        date = "0" + date;
    }
    var dtstring = year + "-" + month + "-" + date;
    console.log(dtstring)
    var this_query = "UPDATE ORDERS SET deliveryTime = '" + deliveryTime2 + "' where oid = " + oid;
    var this_query2 = "UPDATE ORDERS SET deliveryDate = '" + dtstring + "'where oid = " + oid;
    console.log(this_query)
    console.log(this_query2)
    pool.query(this_query2, (err, date) => {});
    pool.query(this_query ,(err, data) => {});

    var this_query3 = "update drivers set isavailable = true where uid = " + uid;
    console.log(this_query3)
    pool.query(this_query3, (err,data) => {
        res.render('driver/deliverOrder', {title: 'Deliver Order', oid:oid, uid:uid});
    });

});

module.exports = router;