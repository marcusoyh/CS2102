var express = require('express');
var router = express.Router();

const { Pool } = require('pg')
const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

router.get('/:uid', function(req, res, next) {
    const uid = req.params.uid;
    var this_query = "SELECT * FROM wws where uid = $1";
    pool.query(this_query, [uid] ,(err, data) => {
        res.render('driver/viewWorkSchedule', { title: 'View Work Schedule' , data: data.rows, uid:uid});
    });

});




module.exports = router;