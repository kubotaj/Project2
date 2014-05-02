/* Module dependencies */
var express = require('express'),
    mysql = require('mysql'),
    ejs = require('ejs'),
    connect = require('connect');

var routes = require('./controller/index');
var customer = require('./controller/customer');
var view = require('./controller/view');
var update = require('./controller/update');
var multi = require('./controller/multi');
var product = require('./controller/product');
var dealer = require('./controller/dealer');
var sales = require('./controller/sales');

/* Application initialization */
var app = express();
app.use(connect.urlencoded());
app.use(connect.json());
app.use(express.static('public'));

/* Configuration */
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

/* Static content directory. */
app.use(express.static(__dirname+'/public'));
app.use('/', routes);
app.use('/customer', customer);
app.use('/view', view);
app.use('/update', update);
app.use('/multi', multi);
app.use('/product', product);
app.use('/dealer', dealer);
app.use('/sales', sales);

// Begin listening
app.set('port', 8010);
app.listen(app.get('port'));
console.log("Express server listening on port",
	    app.get('port'));
