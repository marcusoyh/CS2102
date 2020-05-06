var express = require('express');
var router = express.Router();

const { Pool } = require('pg')
const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

// GET
//get all orders with uid = uid where the time rider departs is null
//then beside the orders link the page to manage that order beside it 
router.get('/:uid', function(req, res, next) {
    var uid = req.params.uid;
    console.log("USER ID: " +uid)
    // window.sessionStorage.setItem("uid", uid);
    //figure out how to make the minute pretty
    var this_query = "with firstTable as (SELECT distinct oid, o.lid, EXTRACT(HOUR from timeordered) as hours, EXTRACT(MINUTE from timeordered) as minutes from Orders o where did = $1 AND timeriderdeparts IS NULL) select oid, address, hours, minutes from firstTable f join locations l on f.lid = l.lid";
    console.log(this_query)
    pool.query(this_query, [uid] ,(err, data) => {
        res.render('driver/manageOrdersAssigned', { title: 'Manage Orders Assigned' , data: data.rows, uid:uid});
    });
});


module.exports = router;