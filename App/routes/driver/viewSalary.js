var express = require('express');
var router = express.Router();

const { Pool } = require('pg')
const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});


// GET
router.get('/:uid', function(req, res, next) {
    const uid = req.params.uid;
    //this query is if i tag salary to drivers instead 
    pool.query('SELECT * FROM Users natural join Drivers WHERE uid = $1', [uid] ,(err, data) => {
        res.render('driver/viewSalary', { title: 'View Salary' , data: data.rows});
	});
    
});








module.exports = router;