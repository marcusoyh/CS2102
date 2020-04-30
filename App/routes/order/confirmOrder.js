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
    var orderDate = req.body.orderDate;
    const lid = req.body.lid;
    const totalPrice = req.body.totalPrice;
    var count;
    // var orderQuery = 'WITH TotalOrder TO AS ( SELECT count(*) AS "count" from Orders) INSERT INTO Orders (oid, lid, cid, rid) VALUES( TO.count + 1,' + lid + ',' + uid + ',' + rid + ')';  

    pool.query('Select count(*) AS "count" from Orders', (err, data) => {
        console.log(data.rows);
        console.log(data.rows[0].count);
        count = Number(data.rows[0].count) + 1;
        console.log(orderDate);
        console.log(totalPrice);
        console.log(count);
        console.log(lid);
        console.log(rid);
        console.log(uid);
        console.log("order length" + orders.length);
    });
    var datesplit = orderDate.split('T');
    orderDate = datesplit[0] + " " + datesplit[1] + ":00"
    var orderQuery = 'WITH TotalOrder AS ( SELECT count(oid) AS "count" from Orders) INSERT INTO Orders (oid,deliveryFee,timeOrdered,paymentMode,isDelivered,totalprice,lid,cid,rid) VALUES('
    var orderQuery1 = orderQuery + "(SELECT count from TotalOrder) + 1,3,'" + orderDate + "', 'cash', false," + totalPrice + "," + lid + "," + uid + "," + rid + ")";  
    pool.query(orderQuery1, (err, data) => {
        if (err) {
            throw err
        }
    });
    console.log("out of loop");
    console.log(orders.length);
    for (let index = 0; index < orders.length; index++) {
        console.log("came here");
        var orderContainsQuery = 'WITH TotalOrder AS ( SELECT count(oid) AS "count" from Orders) INSERT INTO OrderContainsFoodItems VALUES ('
        var orderContainsQuery1 = orderContainsQuery + "(SELECT count from TotalOrder), " + rid + ",'" + orders[index].foodname + "'," + orders[index].quantity + ")";
        pool.query(orderContainsQuery1, (err, data) => {
            if (err) {
                throw err
            }
        });
    }
    var orderContainsQuery = 'WITH TotalOrder AS ( SELECT count(oid) AS "count" from Orders) INSERT INTO '
    res.render('createNewOrder/done', {});

});


module.exports = router;