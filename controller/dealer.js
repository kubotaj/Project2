var express = require('express');
var router = express.Router();

var db = require('../models/db');

/* create dealer */
router.get('/create', function(req, res) {
    res.render('addDealer.ejs', {action: '/dealer/create'});
});

router.post('/create', function(req, res) {
    db.InsertDealer(req.body, function(err, result) {
	if(err) throw err;

	if(result.DealerID != 'undefined') {
	    var placeHolderValues = {
		name: req.body.name,
		street: req.body.street,
		city: req.body.city,
		state: req.body.state,
		zip: req.body.zip,
		phone: req.body.phone
		};
	    res.render('displayDealerData.ejs',
		       placeHolderValues);
	}
	else {
	    res.send('Data was not inserted.');
	    }
    });
});

/* <select> dealer */
router.get('/select', function(req, res) {
    res.render('selectDealer.ejs', req.body);
});

router.post('/select', function(req, res) {
    console.log(req.body);
    db.GetAllDealer(function(err, result) {
        if(err) throw err;
	var responseHTML = '<select id="dealer-list">';
        for (var i=0; result.length > i; i++) {
           var option = '<option value="' + result[i].DealerID + '">' +
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
        db.FindDealer (req.body.id, function(err, result) {
            console.log (result);
            if (result.length > 0) {
                var responseHTML =   '<table>'+
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
