var express = require('express');
var router = express.Router();

const { Pool } = require('pg')
const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});


// GET
router.get('/', function(req, res, next) {
    res.render('driver/viewSalary', { title: 'View Salary' });
});








module.exports = router;