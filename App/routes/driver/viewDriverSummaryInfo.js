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
    var query = "";
	pool.query("Select * from Shifts natural join WWS where uid = $1", [uid], (err, data) => {
		res.render('driver/viewShifts', {title: 'Shifts for the week', data: data.rows, uid:uid});
	});
});



module.exports = router;