var express = require('express');
var router = express.Router();

const { Pool } = require('pg')

const pool = new Pool({
	connectionString: process.env.DATABASE_URL //we need to edit the .env individually, and put it in .gitignore
});

var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

/* GET method to generate ALL shifts */
router.get('/', function (req, res, next) {
	pool.query('Select * from Shifts natural join WWS', (err, data) => {
		res.render('fdsmanager/viewshifts', {title: 'All Shifts', months:months,data: data.rows, date: ' '});
	});
});

/* GET method to view shifts BY WWSID*/
router.get('/:wwsid', function (req, res, next) {
	const wwsid = req.params.wwsid;

	pool.query('Select * from Shifts natural join WWS natural join Users where wwsid = $1',[wwsid], (err, data) => {
		res.render('fdsmanager/viewshifts', { wwsid : wwsid, months:months, data: data.rows, title: ('Shifts of WWSID ' +wwsid) });
	});
});

//my post method here that takes in date that the guy wants to manage shifts,
//returns a viewShfits with shifts on that date

//POST METHOD VIEW SHIFT BY SPECIFIC DATE
router.post('/', function (req, res, next) {
	const date = req.body.date;

	pool.query('Select * from Shifts natural join WWS natural join Users where day = $1',[date], (err, data) => {
		res.render('fdsmanager/viewshifts', { data: data.rows, months:months, title: ('Shifts on ' +date) });
	});
	//res.render('fdsmanager/viewshifts', { date : date, title: 'Shifts on ' });
});


//to query for searching for specific months, we do select * from orders where timeDelivered between '2015-10-10' and '2016-10-10';
module.exports = router;
