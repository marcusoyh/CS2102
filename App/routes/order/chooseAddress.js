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
    const fpid = req.body.fpid;
    orders = JSON.parse(orders);
    const orderDate = req.body.orderDate;
    var sql = 'SELECT * FROM Locations WHERE uid = $1 ORDER BY date DESC LIMIT 5';
    pool.query(sql, [uid], (error, data) => {

        if (error) {
            throw error
        }

        res.render('createNewOrder/chooseAddress', { rpid: rpid, fpid:fpid, data: data.rows, orderDate: orderDate, uid: uid, rid: rid, orders: JSON.stringify(orders) });
    })
});


module.exports = router;