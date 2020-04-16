var express = require('express');
var router = express.Router();

const { Pool } = require('pg')
const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});


// GET
router.get('/:id', function(req, res, next) {
    const id = req.params.id;
    //this query is if i tag salary to drivers instead 
    pool.query('SELECT salary FROM Drivers WHERE uid = $1', [id] ,(err, data) => {
        res.render('driver/viewSalary', { title: 'View Salary' , data: data.rows});
	});
    
});








module.exports = router;