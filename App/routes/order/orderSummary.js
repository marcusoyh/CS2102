var express = require('express');
var router = express.Router();

const { Pool } = require('pg')

const pool = new Pool({
    connectionString: process.env.DATABASE_URL //we need to edit the .env individually, and put it in .gitignore
});




router.post('/', function (req, res, next) {
    // Retrieve Information
    const address = req.body.address;
    const uid = req.body.uid;
    const rid = req.body.rid;
    var orders = req.body.orders;
    const rpid = req.body.rpid;
    const fpid = req.body.fpid;
    orders = JSON.parse(orders);
    const orderDate = req.body.orderDate;
    var lid = req.body.lid;
    var list1 = [];
    var list2 = [];
    // var ridQuery = 'SELECT * FROM Restaurants WHERE rid = $1';
    // var lidQuery = 'SELECT * FROM Locations WHERE lid = $1';
    var query = 'SELECT * FROM  Restaurants R, Locations L, RestaurantPromotions RP WHERE L.lid = $1 AND R.rid=$2 AND RP.rpid = $3';
    var query2 = 'SELECT * FROM  Restaurants R, Locations L, FDSPromotions FP WHERE L.lid = $1 AND R.rid=$2 AND FP.fpid = $3';
    var query3 = 'SELECT * FROM  Restaurants R, Locations L WHERE L.lid = $1 AND R.rid=$2';
    var addressQuery = "INSERT INTO Locations (uid,address,date) VALUES (" + uid + ",'" + address + "','2000-01-01')";
    var flag = true;
    if (lid == null) {
        console.log("lid is null")
        pool.query(addressQuery, (err, data) => {
            if (err) {
                throw err;
            } else {
                console.log(address);
                pool.query("SELECT lid FROM Locations L WHERE L.address = $1", [address], function (err, data) {
                    console.log("here");
                    if (err) {
                        throw err;
                    }
                    var temp = data.rows;
                    console.log(data.rowCount);
                    console.log("here9");
                    console.log(temp.length);
                    console.log(temp[0].lid);
                    console.log("here1");
                    lid = temp[0].lid;
                    console.log("here2");
                    console.log(lid);
                    console.log("here3");
                    if (rpid != "" && fpid == "") {
                        console.log("first");
                        pool.query(query, [lid, rid, rpid], (err, data) => {
                            if (err) {
                                throw err;
                            } else {
                                var data2 = []
                                res.render('createNewOrder/summaryPage', { data: data.rows, data2: data2, lid: lid, fpid: fpid, rpid: rpid, orderDate: orderDate, uid: uid, rid: rid, orders: JSON.stringify(orders) });
                            }
                        });
                    } else if (fpid != "" && rpid == "") {
                        pool.query(query2, [lid, rid, fpid], (err, data) => {
                            if (err) {
                                throw err;
                            } else {
                                var data2 = []
                                res.render('createNewOrder/summaryPage', { data: data.rows, data2: data2, lid: lid, fpid: fpid, rpid: rpid, orderDate: orderDate, uid: uid, rid: rid, orders: JSON.stringify(orders) });
                            }
                        });
                    } else if (fpid != "" && rpid != "") {
                        pool.query(query, [lid, rid, rpid], (err, data) => {
                            if (err) {
                                throw err;
                            } else {
                                pool.query(query2, [lid, rid, fpid], (err, data2) => {
                                    if (err) {
                                        throw err;
                                    } else {

                                        res.render('createNewOrder/summaryPage', { data: data.rows, data2: data2.rows, lid: lid, fpid: fpid, rpid: rpid, orderDate: orderDate, uid: uid, rid: rid, orders: JSON.stringify(orders) });
                                    }
                                });

                            }
                        });
                    } else {
                        pool.query(query3, [lid, rid], (err, data) => {
                            if (err) {
                                throw err;
                            } else {
                                console.log("here11");
                                console.log(lid);
                                var data2 = [];
                                res.render('createNewOrder/summaryPage', { data: data.rows, data2: data2, lid: lid, fpid: fpid, rpid: rpid, orderDate: orderDate, uid: uid, rid: rid, orders: JSON.stringify(orders) });
                            }
                        });
                    }
                });

            }
        });

    }






});


module.exports = router;