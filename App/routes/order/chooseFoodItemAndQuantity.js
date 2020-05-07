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
    const orderDate = req.body.orderDate;
    var orders = req.body.orders;
    if (typeof orders === 'undefined') {
      orders = [];
    } else {
      orders = JSON.parse(orders);
    }
    const foodname1 = req.body.foodname;
    const quantity1 = req.body.quantity;
    const price = req.body.price;
    if (typeof foodname1 !== 'undefined') {
      orders.push({
        foodname : foodname1 ,
        quantity : quantity1,
        price : price
      });
    }



    pool.query('SELECT * FROM RestaurantFoodItems WHERE rid = $1', [rid], (error, data) => {
      if (error) {
        throw error
      } else {
        pool.query('SELECT * FROM MaxOrderTable WHERE rid = $1 and orderDate = $2', [rid, orderDate], (error, data2) => {
          if (error) {
            throw error
          } else {
            console.log(data2.rows.length);
            res.render('createNewOrder/chooseFoodItemAndQuantity', {  data2: data2.rows, orderDate: orderDate, data: data.rows, uid : uid, rid : rid, orders : JSON.stringify(orders) });
          }
      });
    }
      
    });
});


module.exports = router;