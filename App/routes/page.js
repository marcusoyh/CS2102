var express = require('express');
var router = express.Router();


//first parameter specifies the PATH. This has been routed from /page already, so by doing '/' we are handling the current /page path
router.get('/', function(req, res, next) {
    res.render('page', {title: 'Page', author: 'LeBron' });
  });

  router.post('/', function(req, res, next) {
    res.render('page', {title: 'Page', author: 'LeBron after Posting' });
  });

module.exports = router;