var express = require('express');
var router = express.Router();

const { Pool } = require('pg')
const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

/* GET method to generate ALL shifts */
router.get('/:wwsid', function (req, res, next) {
	const wwsid = req.params.wwsid;
	//AND WHERE firstdayofweek = ??? 
	pool.query("Select * from Shifts natural join WWS WHERE wwsid = $1", [wwsid], (err, data) => {
		res.render('driver/viewShifts', {title: 'Shifts for the week', data: data.rows});
	});
});

// /* GET method to generate shift of specific date */
// router.get('/:date', function (req, res, next) {
// 	const date = req.params.date;

// 	pool.query('Select * from Shifts natural join WWS natural join Users where day = $1',[date], (err, data) => {
// 		res.render('fdsmanager/viewshifts', { date : date,  data: data.rows });
// 	});
// });



module.exports = router;