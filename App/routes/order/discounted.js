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
    orders = JSON.parse(orders);
    const rpid = req.body.rpid;
    const orderDate = req.body.orderDate;
    var sql = 'SELECT * FROM RestaurantPromotions WHERE rpid = $1';
    pool.query(sql, [rpid], (error, data) => {
        if (error) {
            throw error
        }
        res.render('createNewOrder/discounted', { data: data.rows, rpid : rpid, orderDate: orderDate, uid: uid, rid: rid, orders: JSON.stringify(orders) });
    });
});


module.exports = router;