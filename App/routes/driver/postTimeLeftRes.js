router.post('/:oid', function (req, res, next) {
    var timeleftres = req.body.timeriderleavesrestaurant;

    var this_query = "UPDATE ORDERS SET timeriderleavesrestaurant = timeleftres "

});