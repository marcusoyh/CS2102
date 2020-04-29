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
    });
    var datesplit = orderDate.split('T');
    if (datesplit[1].charAt(0) === "0") {
        datesplit[1] = datesplit[1].substring(1);
    }
    orderDate = datesplit[0] + " " + datesplit[1] + ":00"
    var orderQuery = 'INSERT INTO Orders (oid,timeOrdered,paymentMode,isDelivered,totalprice,lid,cid,rid) VALUES '; 
    var orderInput = orderQuery + "(" + count + ",'" + orderDate + "', 'cash' ,false," + totalPrice + ',' + lid + ',' + uid + ',' + rid + ')';
    pool.query(orderInput, (err, data) => {
        if (err) {
            throw err
        }
    }); 
    res.render('createNewOrder/done', {});
    
});


module.exports = router;