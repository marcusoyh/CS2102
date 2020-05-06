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
    const fpid = req.body.fpid;
    const orderDate = req.body.orderDate;
    var sql = 'SELECT * FROM RestaurantPromotions WHERE rpid = $1';
    var sql2 = 'SELECT * FROM FDSPromotions WHERE fpid = $1';
    pool.query(sql, [rpid], (error, data) => {
        if (error) {
            throw error
        } else {
            pool.query(sql2, [fpid], (error, data2) => {
                if (error) {
                    throw error
                } else {
                    res.render('createNewOrder/discounted', { fpid:fpid, data: data.rows, data2: data2.rows, rpid : rpid, orderDate: orderDate, uid: uid, rid: rid, orders: JSON.stringify(orders) });
                }
            });
        }
        
    });
});


module.exports = router;