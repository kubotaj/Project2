var express = require('express');
var router = express.Router();

var db = require('../models/db');

/* create customer */
router.get('/create', function(req, res) {
    res.render('addCustomer.ejs', {action: '/customer/create'});
});

router.post('/create', function(req, res) {
    db.Insert(req.body, function(err, result) {
	if(err) throw err;

	if(result.CustomerID != 'undefined') {
	    var placeHolderValues = {
		name: req.body.name,
		street: req.body.street,
		city: req.body.city,
		state: req.body.state,
		zip: req.body.zip,
		phone: req.body.phone
		};
	    res.render('displayCustomerData.ejs',
		       placeHolderValues);
	}
	else {
	    res.send('Data was not inserted.');
	    }
    });
});

/* search customer */
router.get('/search', function(req, res) {
    res.render('searchCustomer.ejs', {action: '/customer/getCustomer'});
});

router.post('/getCustomer', function(req, res) {
    console.log(req.body.name);
    db.SearchCustomer(req.body.name, function(err, result) {
	console.log(result);
	res.render('displayCustomerData1.ejs', {val:result});
    });
});


/* <select> customer */
router.get('/selectCustomer', function(req, res) {
    res.render('selectCustomer.ejs', req.body);
});

router.post('/select', function(req, res) {
    console.log(req.body);
    db.GetAll(function(err, result) {
	if(err) throw err;
	var responseHTML = '<select id="customer-list">';
	for (var i=0; result.length > i; i++) {
	   var option = '<option value="' + result[i].CustomerID + '">' +
	    result[i].Name + '</option>';
	    console.log(option);
	    responseHTML += option;
	}
	responseHTML += '</select>';
	res.send(responseHTML);
    });
});

router.post('/', function (req, res) {
    console.log(req.body);
    if (typeof req.body.id != 'undefind') {
	db.FindCustomer (req.body.id, function(err, result) {
	    console.log (result);
	    if (result.length > 0) {
		var responseHTML =   '<table class="smallFont">'+
		                     '<tr>' +
		                      '<th>Name</th>' +
		                      '<th>Street</th>' +
		                      '<th>City</th>' +
		                      '<th>State</th>' +
		                      '<th>Zip</th>' +
		                      '<th>Phone</th>' +
		                     '</tr>' +
		                     '<tr>' +
		                      '<td>' + result[0].Name + '</td>' +
		                      '<td>' + result[0].Street + '</td>' +
		                      '<td>' + result[0].City + '</td>' +
		                      '<td>' + result[0].State + '</td>' +
		                      '<td>' + result[0].Zip + '</td>' +
		                      '<td>' + result[0].Phone + '</td>' +
                                     '</table>';
		res.send(responseHTML);
		}
	}
			)}});


module.exports = router;
