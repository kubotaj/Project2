var express = require('express');
var router = express.Router();

var db = require('../models/db');

/* customer table*/
router.get('/customer', function(req, res) {
    db.GetAll(function(err, result) {
	if(err) throw err;
	res.render('displayCustomerTable.ejs', {rs: result});
    });
});

/* single customer */
router.get('/', function (req, res) {
    if (typeof req.query.cid != 'undefined') {
        console.log(req.query.cid);
        db.FindCustomer(req.query.cid, function(err, result) {
            console.log(result);
            res.render('editCustomer.ejs', {val:result, action:'/update'});
        });
    }});

router.post('/', function(req, res) {
    db.Edit(req.body, function(err, result) {
        if(err) throw err;

        if(result.CustomerID != 'undefined') {
            var placeHolderValues = {
		customerid: req.body.cid,
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

module.exports = router;
