var express = require('express');
var router = express.Router();

const { Pool } = require('pg')

const pool = new Pool({
    connectionString: process.env.DATABASE_URL //we need to edit the .env individually, and put it in .gitignore
});

// GET
//MEANS IF I JUST ENTER THE /HOMEPAGE URL IT WILL COME HERE
router.get('/', function (req, res, next) {
    res.render('login/loginfdsmanager', { title: 'Login as FDS Manager' });
});


// POST method to go to home page
router.post('/', function (req, res, next) {
    res.render('fdsmanager/fdsmanagerhomepage');
});


module.exports = router;
