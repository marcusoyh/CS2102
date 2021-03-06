var express = require('express');
var router = express.Router();

const { Pool } = require('pg')
/*const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'project',
  password: 'postgres',
  port: 5432,
})*/

const pool = new Pool({
  connectionString: process.env.DATABASE_URL //we need to edit the .env individually, and put it in .gitignore
});

/* SQL Query */
var sql_query = 'INSERT INTO RestaurantPromotions VALUES ';

// GET
router.get('/:id', function (req, res, next) {
  var rid = req.params.id;
  res.render('addRestaurantPromotion', { title: 'Add a new Restaurant Promotion', rid: rid, errormessage: ' ' });

});

// POST
router.post('/:id', function (req, res, next) {
  // Retrieve Information
  //var rpid = req.body.rpid;
  var rid = req.body.rid;
  var name = req.body.name;
  var discountAmount = req.body.discountAmount;
  var startDate = req.body.startDate;
  var endDate = req.body.endDate;

  pool.query('Select max(rpid) from RestaurantPromotions', (err, data) => {
    var rpid = data.rows[0].max + 1;
    var insert_query = sql_query + "(" + rpid + "," + rid + ",'" + name + "'," + discountAmount + ",'" + startDate + "','" + endDate + "')";
    console.log("INSERT QUERY!!")
    console.log(insert_query);
    pool.query(insert_query, (err, data) => {
      if (err) {
        res.render('addRestaurantPromotion', { title: 'Add a new Restaurant Promotion', rid: rid, errormessage: err.message });
      } else {
        pool.query('SELECT * FROM RestaurantPromotions WHERE rid = $1', [rid], (err, data) => {
          res.render('viewRestaurantPromotions', { title: 'All Restaurant Promotions', data: data.rows });
        });
      }
    });

  });

  // Construct Specific SQL Query


});


module.exports = router;