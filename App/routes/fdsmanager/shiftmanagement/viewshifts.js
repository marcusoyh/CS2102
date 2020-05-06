var express = require('express');
var router = express.Router();

const { Pool } = require('pg')

const pool = new Pool({
	connectionString: process.env.DATABASE_URL //we need to edit the .env individually, and put it in .gitignore
});

/* GET method to generate ALL shifts */
router.get('/', function (req, res, next) {
	pool.query('Select * from Shifts natural join WWS', (err, data) => {
		res.render('fdsmanager/viewshifts', {title: 'All Shifts', data: data.rows, date: ' '});
	});
});

/* GET method to generate shift of specific date */
router.get('/:date', function (req, res, next) {
	const date = req.params.date;

	pool.query('Select * from Shifts natural join WWS natural join Users where day = $1',[date], (err, data) => {
		res.render('fdsmanager/viewshifts', { date : date,  data: data.rows, title: 'Shifts on' });
	});
});

//my post method here that takes in date that the guy wants to manage shifts,
//returns a viewShfits with shifts on that date
router.post('/', function (req, res, next) {
	const date = req.body.date;

	pool.query('Select * from Shifts natural join WWS natural join Users where day = $1',[date], (err, data) => {
		res.render('fdsmanager/viewshifts', { date : date,  data: data.rows, title: 'Shifts on' });
	});
	//res.render('fdsmanager/viewshifts', { date : date, title: 'Shifts on ' });
});


// POST method to generate shifts for specific date,
//this method shouldnt be needed now because we do it via the get method instead
// router.post('/', function (req, res, next) {
// 	// Retrieve Information
// 	 var dateString = req.body.date;
// 	//date.isValid() is a method that returns true/false, can validate whether legit date was entered
// 	pool.query('Select * from Shifts natural join WWS natural join Users where day = $1', [dateString], (err, data) => {
// 		res.render('fdsmanager/viewshifts', { title: 'Shifts on ' , data: data.rows, date:dateString })
// 	});

// });

//to query for searching for specific months, we do select * from orders where timeDelivered between '2015-10-10' and '2016-10-10';
module.exports = router;