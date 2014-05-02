var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    res.render('index');
});

router.get('/about', function(req, res) {
    res.render('about.ejs', req.body);
});

router.get('/contact', function(req, res) {
    res.render('contact.ejs', req.body);
});

router.get('/privacy', function(req, res) {
    res.render('privacy.ejs', req.body);
});


module.exports = router;
