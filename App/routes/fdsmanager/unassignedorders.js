var express = require('express');
var router = express.Router();

const { Pool } = require('pg')
const pool = new Pool({
    connectionString: process.env.DATABASE_URL //we need to edit the .env individually, and put it in .gitignore
});

router.get('/', function (req, res, next) {
    pool.query('SELECT * FROM Orders WHERE did IS NULL', (err, data) => {
        res.render('fdsmanager/unassignedorders', { title: 'Orders without Drivers:', data: data.rows });
    });
});

/* routes over to show a list of drivers available to pick up this order*/
router.get('/:id', function (req, res, next) {
    const id = req.params.id;

    //tihs query supposed to somehow check if they're free to take the order, only show those that are free
    pool.query('SELECT * FROM Drivers natural join Users', (err, data) => {
        res.render('drivers', { title: 'Choose Driver to allocate for order', data: data.rows });
    });
});



module.exports = router;
