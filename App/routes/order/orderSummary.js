var express = require('express');
var router = express.Router();

const { Pool } = require('pg')

const pool = new Pool({
    connectionString: process.env.DATABASE_URL //we need to edit the .env individually, and put it in .gitignore
});




router.post('/', function (req, res, next) {
    // Retrieve Information
    const uid = req.body.uid;
    const rid = req.body.rid;
    var orders = req.body.orders;
    const rpid = req.body.rpid;
    orders = JSON.parse(orders);
    const orderDate = req.body.orderDate;
    const lid = req.body.lid;
    var list1 = [];
    var list2 = [];
    // var ridQuery = 'SELECT * FROM Restaurants WHERE rid = $1';
    // var lidQuery = 'SELECT * FROM Locations WHERE lid = $1';
    var query = 'SELECT * FROM  Restaurants R, Locations L, RestaurantPromotions RP WHERE L.lid = $1 AND R.rid=$2 AND RP.rpid = $3';
    pool.query(query, [lid, rid, rpid],(err, data) => {	
        res.render('createNewOrder/summaryPage', { data : data.rows, lid : lid, rpid: rpid,  orderDate: orderDate, uid: uid, rid: rid, orders: JSON.stringify(orders) });
    });
    
});


module.exports = router;