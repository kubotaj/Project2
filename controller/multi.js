var express = require('express');
var router = express.Router();

var db = require('../models/db');

/* create customer */
router.get('/territory', function(req, res) {
    res.render('addSalesTerritory.ejs', {action: '/multi/territory'});
});

router.post('/territory', function(req, res) {
    db.InsertSalesTerritory(req.body, function(err, result) {
	if (err) throw err;
	if (result.EmployeeID != 'undefined') {
	    console.log(result.EmployeeID);
	}
	res.render('displaySalesTerritory.ejs', 
		   {mssg:'Data successfully entered'});
    });
});

/*
router.post('/territory', function(req, res) {
    db.InsertSalesTerritory(req.body.name, req.body.territory, 
			    function(err, result1) {
        if(err) throw err;
//
	console.log("result1=" +result1.EmployeeID);
        if(result1[0].EmployeeID != 'undefined') {
            var placeHolderValues1 = {
                FirstName: req.body.name
                };
	}
	if(result2[0].TerritoryID != 'undefined') {
	    var placeHolderValues2 = {
		City: req.body.territory
		}
	}
        else {
            res.send('Data was not inserted.');
            }

	res.render('displaySalesTerritoryData.ejs',
                   placeHolderValues);
//
	res.render('displaySalesTerritory.ejs', {mssg:'Data successfully Entered'});
    });
});
*/

module.exports = router;
