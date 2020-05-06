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
    const uid = req.params.uid;
    //figure out how to make the minute pretty
    var this_query = "SELECT distinct oid, address, EXTRACT(HOUR from timeordered) as hours, EXTRACT(MINUTE from timeordered) as minutes from Orders join Locations on uid = cid where did = $1 AND timeriderdeparts IS NULL";
    pool.query(this_query, [uid] ,(err, data) => {
        res.render('driver/manageOrdersAssigned', { title: 'Manage Orders Assigned' , data: data.rows, uid:uid});
    });
});


module.exports = router;