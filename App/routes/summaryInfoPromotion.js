var express = require('express');
var router = express.Router();

const { Pool } = require('pg')

const pool = new Pool({
	connectionString: process.env.DATABASE_URL //we need to edit the .env individually, and put it in .gitignore
});

var selectQuery = 'SELECT month, totalorders, totalcost from viewOne group by month';
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

var daysDifference = function(timestamp1, timestamp2) {
    var difference = timestamp1 - timestamp2;
    var daysDifference = Math.floor(difference/1000/60/60/24);

    return daysDifference;
}

// GET
router.get('/:id', function(req, res, next) {
    const id = req.params.id;
    var myList = []; //myList = [name of promo, duration, average num of orders]
    var numofPromo; 
    var durationPromotion = new Array(numofPromo);
    //all promotional campaigns
    var query_startdates = 'SELECT startDate FROM RestaurantPromotions WHERE rid =$1 ORDER BY rpid';
    var query_enddates = 'SELECT endDate FROM RestaurantPromotions WHERE rid=$1 ORDER BY rpid';
    var query_numPromo = 'SELECT count(*) FROM RestaurantPromotions WHERE rid =$1';
    var query_promoName = 'SELECT name FROM RestaurantPromotions WHERE rid=$1';
    var query = 'SELECT name, rpid, startDate, endDate FROM RestaurantPromotions WHERE rid =$1 ORDER BY rpid';
    pool.query(query_numPromo, [id],(err, data) => {	
        numofPromo = data;
        if(err) {
            console.log('num of promos got error');
        }
    });
    var names = new Array(numofPromo);
    pool.query(query_promoName, [id],(err, data) => {	
        for (i = 0; i < data.rows; i++) {
        names.push(data[i]);
        }
        if(err) {
            console.log('names of promo got error');
        }
    });
    console.log(names[0]);
    var startdates = new Array(numofPromo);
    var enddates = new Array(numofPromo);
    pool.query(query_startdates, [id],(err, data) => {	
        for(i = 0; i <data.rows; i++){
            startdates.push(data[i]);
        }
    });
    pool.query(query_enddates, [id],(err, data) => {	
		for(i = 0; i <data.rows; i++){
            enddates.push(data[i]);
        }
    });
    
    var durationPromotion = new Array(numofPromo);
    for(i = 0; i < numofPromo; i++){
        durationPromotion = daysDifference(startdates[i],enddates[i]);
    }
    
    pool.query(query, [id],(err, data) => {	
        res.render('summaryInfoPromotion', { title: 'Summary Promotions Information', data: data.rows});
    });
                                  
	
});

module.exports = router;
