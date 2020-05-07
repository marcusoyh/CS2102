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
    // var orders = req.body.orders;
    // orders = JSON.parse(orders);


    res.render('createNewOrder/chooseDate', { uid : uid, rid : rid });
});


module.exports = router;