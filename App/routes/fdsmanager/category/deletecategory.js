var express = require('express');
var router = express.Router();

const { Pool } = require('pg')

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

/* SQL Query */


// GET
//NOT ACCESSED, THIS JS FILE ONLY USED FOR THE POST METHOD TO DELETE THE CATEGORY BEFORE ROUTING ELSEWHERE
router.get('/', function (req, res, next) {
    res.render('fdsmanager/addcategory', { title: 'Adding New Food Category' });
});

// POST
//DELETE METHOD HERE
router.post('/', function (req, res, next) {
    var cid = req.body.cid;

    pool.query('DELETE FROM Category WHERE cid = $1', [cid], (err, data) => {
        if (err) {
            pool.query('Select * from Category', (selecterr, selectdata) => {
                res.render('fdsmanager/categorymanagement', { title: 'All Food Categories', data: selectdata.rows, errormessage: 'ERROR: Category being used by active Food Items'});
            });
        } else {
            res.redirect('./categorymanagement');
        }

    });
});
module.exports = router;
