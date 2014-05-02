var express = require('express');
var router = express.Router();

var db = require('../models/db');

/* create product */
router.get('/create', function(req, res) {
    res.render('addProduct.ejs', {action: '/product/create'});
});

router.post('/create', function(req, res) {
    db.InsertProduct(req.body, function(err, result) {
	if(err) throw err;

	if(result.ProductNumber != 'undefined') {
	    var placeHolderValues = {
		productnumber: req.body.productnumber,
		name: req.body.name,
		price: req.body.price,
		sid: req.body.sid,
		};
	    res.render('displayProductData.ejs',
		       placeHolderValues);
	}
	else {
	    res.send('Data was not inserted.');
	    }
    });
});

/* search product */
router.get('/search', function(req, res) {
    res.render('searchProduct.ejs', {action: '/product/getProduct'});
});

router.post('/getProduct', function(req, res) {
    console.log(req.body.name);
    db.SearchProduct(req.body.name, function(err, result) {
	console.log(result);
	res.render('displayProductData1.ejs', {val:result});
    });
});


module.exports = router;
