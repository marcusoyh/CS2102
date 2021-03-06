var express = require('express');
var router = express.Router();

const { Pool } = require('pg')
const pool = new Pool({
	connectionString: process.env.DATABASE_URL //we need to edit the .env individually, and put it in .gitignore
});


router.get('/', function(req, res, next) {
	pool.query('SELECT * FROM Restaurants', (err, data) => {
		res.render('viewRestaurants', { title: 'All Restaurants', data: data.rows });
	});
});

/* retrieves a restaurant by uid */
router.get('/:id', function (req, res, next) {
    const id = req.params.id;
  
    pool.query('SELECT * FROM RestaurantFoodItems natural join Restaurants WHERE rid = $1', [id], (error, data) => {
      if (error) {
        throw error
      }
      res.render('cusrestaurantfooditems', { title: data.rows[0].name, data: data.rows, id:id });
    })
  });

module.exports = router;
