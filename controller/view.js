var express = require('express');
var router = express.Router();

var db = require('../models/db');

/* search by product */
router.get('/byProduct', function(req, res) {
    res.render('searchProduct.ejs', {action: '/view/byProduct'});
});

router.post('/byProduct', function(req, res) {
    console.log(req.body.name);
    db.FindProduct(req.body.name, function(err, result) {
	if(err) throw err;
	
	res.render('displayByProductData.ejs', {rs: result});

    });
});

/* get customer via GET */
router.get('/', function (req, res) {
    if (typeof req.query.cid != 'undefined') {
	console.log(req.query.cid);
	db.FindCustomer(req.query.cid, function(err, result) {
	    console.log(result);
	    res.render('displayCustomerData1.ejs', {val:result});
	    });
	}});

/* get complete list of Sales Order vis GET */
router.get ('/completeList', function (req, res) {
    db.completeList (function(err, result) {
	if (err) throw err;
	res.render ('displayCompleteList.ejs', {rs: result});
    });
});

/* get total sales per dealer */
router.get ('/dealerSales', function (req, res) {
    db.dealerSales (function(err, result) {
        if (err) throw err;
        res.render ('displayDealerSales.ejs', {rs: result});
    });
});



module.exports = router;
