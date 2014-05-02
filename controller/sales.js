var express = require('express');
var router = express.Router();

var db = require('../models/db');

/* search by sales */
router.get('/search', function(req, res) {
    res.render('searchSales.ejs', {action: '/sales/search'});
});

router.post('/search', function(req, res) {
    console.log(req.body.name);
    db.FindSales(req.body.name, function(err, result) {
	if(err) throw err;
	
	res.render('displayBySalesData.ejs', {rs: result});

    });
});


module.exports = router;
