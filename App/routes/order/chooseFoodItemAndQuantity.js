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
    const num = req.body.num;

    const orders = order[num];


    pool.query('SELECT * FROM RestaurantFoodItems WHERE rid = $1', [rid], (error, data) => {
      if (error) {
        throw error
      }
      res.render('createNewOrder/chooseFoodItemAndQuantity', {  data: data.rows, uid : uid, rid : rid , num : num});
    })
});


module.exports = router;