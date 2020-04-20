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


    console.log(req.body.foodName0);
    
    res.render('createNewOrder/chooseAddress', {   uid : uid, rid : rid , num : num, orders:orders});
    // pool.query('SELECT * FROM CustomerSavesLocations WHERE uid = $1', [uid], (error, data) => {
    //   if (error) {
    //     throw error
    //   }
    //   res.render('createNewOrder/chooseAddress', {  data: data.rows, uid : uid, rid : rid , num : num, orders:orders});
    // })
});


module.exports = router;