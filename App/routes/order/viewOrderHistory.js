var express = require('express');
var router = express.Router();

const { Pool } = require('pg')

const pool = new Pool({
    connectionString: process.env.DATABASE_URL //we need to edit the .env individually, and put it in .gitignore
});


router.post('/', function (req, res, next) {
    const uid = req.body.uid;
    pool.query('SELECT * FROM Orders O, Restaurants R WHERE O.cid = $1 AND R.rid = O.rid', [uid], (error, data) => {
        res.render('viewOrder/viewOrderHistory', { title: 'Login as Customer', data : data.rows});
    });
});



module.exports = router;