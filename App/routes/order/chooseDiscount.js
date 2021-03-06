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
    const orderDate = req.body.orderDate;
    var sql = 'SELECT * FROM RestaurantPromotions WHERE rid = $1 and $2 between startDate and endDate';
    pool.query(sql, [rid, orderDate], (error, data) => {
        if (error) {
            throw error
        } else {
            var sql2 = 'SELECT * FROM FDSPromotions WHERE $1 between startDate and endDate';
            pool.query(sql2, [orderDate], (error, data2) => {
                if (error) {
                    throw error
                } else {
                    res.render('createNewOrder/chooseDiscount', { data: data.rows, data2: data2.rows, orderDate: orderDate, uid: uid, rid: rid, orders: JSON.stringify(orders) });
                }
            });

        }
    });
})
    


module.exports = router;