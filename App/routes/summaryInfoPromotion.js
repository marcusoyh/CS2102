var express = require('express');
var router = express.Router();

const { Pool } = require('pg')

const pool = new Pool({
	connectionString: process.env.DATABASE_URL //we need to edit the .env individually, and put it in .gitignore
});

var selectQuery = 'SELECT month, totalorders, totalcost from viewOne group by month';
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

// GET
router.get('/:id', function(req, res, next) {
    const id = req.params.id;
    var query = 'SELECT A.name, A.rpid, A.startDate, A.endDate, count(B.oid) as numordered FROM RestaurantPromotions A left join OrderContainsRP B ON A.rpid = B.rpid WHERE rid =$1 Group by A.rpid order by A.rpid';
    
    pool.query(query, [id],(err, data) => {	
        res.render('summaryInfoPromotion', { title: 'Summary Promotions Information',  data: data.rows });
    });
                                  
	
});

module.exports = router;
