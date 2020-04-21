var express = require('express');
var router = express.Router();

const { Pool } = require('pg')
const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

//GET 
//total number of hours worked based on shifts
// number of orders delivered this week/month
router.get('/:uid', function (req, res, next) {
    const uid = req.params.uid;
    var this_query = "with shiftswws as (select * from shifts natural join wws where uid = $1) select distinct startdate, starttime, endtime, day, extract(month from day) as month, uid from shiftswws join orders on uid = did;";
	pool.query(this_query, [uid], (err, data) => {
		res.render('driver/viewDriverSummaryInfo', {title: 'Summary Info', data: data.rows, uid:uid});
	});
});



module.exports = router;