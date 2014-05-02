var mysql = require('mysql');

/* Database configuration */
var connection = mysql.createConnection({
        host : 'localhost',
        user : 'jkubota',
        password : '3924172'
    });

/* create db if it does not exist */
var dbToUse = 'jkubota'
var createDatabaseQry = 'CREATE DATABASE IF NOT EXISTS ' + dbToUse;
connection.query(createDatabaseQry, function (err) {
    if (err) throw err;

    //use the database for any queries run
    var useDatabaseQry = 'USE ' + dbToUse;

    //create the Customer table if it does not exist
    connection.query(useDatabaseQry, function (err) {
        if (err) throw err;

        var createTableQry = 'CREATE TABLE IF NOT EXISTS Customer('
            + 'CustomerID INT NOT NULL AUTO_INCREMENT,'
            + 'PRIMARY KEY(CustomerID),'
            + 'Name VARCHAR(30),'
            + 'Street VARCHAR(30),'
            + 'City VARCHAR(30),'
            + 'State VARCHAR(30),'
            + 'Zip VARCHAR(30),'
            + 'Phone VARCHAR(30)'
            + ')';
        connection.query(createTableQry, function (err) {
            if (err) throw err;
        });
    });
});

// Return all customers.
exports.GetAll = function(callback){
    connection.query('SELECT * FROM Customer',
		     function(err, result){
			 if(err){
			     console.log(err);
			     callback(true);
			     return;
			 }
			 callback(false, result);
		     }
		    );
}

// Insert a customer.
exports.Insert = function(customerData, callback){
    connection.query('INSERT INTO Customer SET ?', customerData,
		     function(err, result){
			 if(err){
			     console.log(err);
			     callback(true);
			     return;
			 }
			 callback(false, result);
		     }
		    );
}

// Insert salesperson & territory.
var id
exports.InsertSalesTerritory = function(data, callback){
    console.log(data.name);
    connection.query('INSERT INTO SalesPerson(FirstName) VALUES( ? )',
		     data.name,
		     function(err, result) {
			 if (err) {
			     console.log(err);
			     callback(true);
			     return;
			     }
			 else {
			     console.log(data.territory);
			     console.log(result.EmployeeID);
			     console.log(result);
                             query = 'INSERT INTO Territory(EID, State) VALUES(' +
				      result.insertId + ', "' + data.territory + '")';
			     console.log(query);
                             connection.query(query, function(err, result) {
                                 if (err) {
                                     console.log(err);
                                     callback(true);
                                     return;
                                 }
				 callback(false, "Data Successfully Entered");
			     });
			 }
		     });
}

/*
    connection.query('SELECT LAST_INSERT_ID()', function(err, result) {
	if (err) {
	    console.log(err);
	    callback(true);
	    return;
	    }
	else {
	    id = result;
	    console.log(id);
	}
    });
	
    console.log(data.territory);
    var query;
    query = 'INSERT INTO Territory(EID, State) VALUES(' + 
	id + ', '+ data.territory + ')';
    connection.query(query,
		     function(err, result) {
			 if (err) {
			     console.log(err);
			     callback(true);
			     return;
			     }
		     });
    callback(false, "Data Successfully Entered");
}
*/  
/*
exports.InsertSalesTerritory = function(data1, data2, callback){
    var res1, res2;
    connection.query('INSERT INTO SalesPerson(FirstName) VALUES ( ? )', data1,
		     function(err, result) {
			 if (err) {
			     console.log(err);
			     callback(true);
			     return;
			     }
		     });

    connection.query('INSERT INTO Territory(State) VALUES ( ? )', data2,
		     function(err, result2) {
			 console.log("result2=" +result2);
			 if (err) {
			     console.log(err);
			     callback(true);
			     return;
			     }
		     });
    callback(false, "Data Successfully Entered");
}
*/  
    

// Edit a cutomer.
exports.Edit = function(customerData, callback) {
    console.log("this is the test resutl: " + customerData.customerid);
    connection.query('DELETE FROM Customer WHERE CustomerID = ?', customerData.customerid);
    connection.query('INSERT INTO Customer SET ?', customerData,
		     function(err, result){
			 if(err){
			     console.log(err);
			     callback(true);
			     return;
			 }
			 callback(false, result);
			 }
		    );
}

// Find customer list by product
exports.FindProduct = function (productName, callback) {
    var query;
    query = ' SELECT * FROM CustomerByProduct WHERE ProductName LIKE "%' + 
	productName + '%"';
//    connection.query('SELECT * FROM CustomerByProduct WHERE ProductName = ?',
//                      productName,
    connection.query(query,
		     function (err, result) {
			 if (err) {
			     console.log (err);
			     callback (true);
			     return;
			     }
			 callback (false, result);
			 }
		     );
}

// Return one customer.
exports.FindCustomer = function (customerID , callback) {
    connection.query('SELECT * FROM Customer WHERE CustomerID = ?', customerID,
		     function (err, result) {
			 if (err) {
			     console.log (err);
			     callback (true);
			     return;
			 }
			 callback (false, result);
			 }
		     );
}

// Search customer.
exports.SearchCustomer = function (customerName, callback) {
    //console.log(customerName);
//    connection.query('SELECT * FROM Customer WHERE Name = ?', customerName,
    var query;
    query = 'SELECT * FROM Customer WHERE Name LIKE "%' + customerName + '%"';
    console.log(query);
    connection.query(query,
		     function (err, result) {
			 if (err) {
			     console.log (err);
			     callback (true);
			     return;
			 }
//			 console.log(result);
			 callback (false, result);
		     }
		    );
}


// Return compelte list of sales order.
exports.completeList = function(callback){
    connection.query('SELECT * FROM CompleteList',
                     function(err, result){
                         if(err){
                             console.log(err);
                             callback(true);
                             return;
                         }
                         callback(false, result);
                     }
                    );
}


// Insert a product.
exports.InsertProduct = function(productData, callback){
    connection.query('INSERT INTO Product SET ?', productData,
                     function(err, result){
                         if(err){
                             console.log(err);
                             callback(true);
                             return;
                         }
                         callback(false, result);
                     }
                    );
}

// Search product.
exports.SearchProduct = function (productName, callback) {
    var query;
    query = 'SELECT * FROM Product WHERE Name LIKE "%' + productName + '%"';
//    connection.query('SELECT * FROM Product WHERE Name = ?', productName,
    connection.query(query,
		     function (err, result) {
			 if (err) {
			     console.log (err);
			     callback (true);
			     return;
			 }
			 console.log(result);
			 callback (false, result);
		     }
		    );
}

// Insert a dealer.
exports.InsertDealer = function(dealerData, callback){
    connection.query('INSERT INTO Dealer SET ?', dealerData,
                     function(err, result){
                         if(err){
                             console.log(err);
                             callback(true);
                             return;
                         }
                         callback(false, result);
                     }
                    );
}


// Return all dealer
exports.GetAllDealer = function(callback){
    connection.query('SELECT * FROM Dealer',
                     function(err, result){
                         if(err){
                             console.log(err);
                             callback(true);
                             return;
                         }
                         callback(false, result);
                     }
                    );
}

// Find dealer
exports.FindDealer = function (dealerID, callback) {
    connection.query('SELECT * FROM Dealer WHERE DealerID = ?',
                     dealerID,
                     function (err, result) {
                         if (err) {
                             console.log (err);
                             callback (true);
                             return;
                             }
                         callback (false, result);
                         }
                     );
}

// find sales total per dealer
exports.dealerSales = function (callback) {
    connection.query('SELECT * FROM DealerSales',
		     function (err, result) {
			 if (err) {
			     console.log (err);
			     callback (true);
			     return;
			     }
			 callback (false, result);
			 });
}

// find territory by salesperson
exports.FindSales = function (name, callback) {
    var query;
    query = 'SELECT * FROM SalesTerritory WHERE FirstName LIKE "%' + name + '%"';
//    connection.query ('SELECT * FROM SalesTerritory WHERE FirstName = ?', name,
    connection.query (query,
		      function (err, result) {
			  if (err) {
			      console.log(err);
			      callback(true);
			      return;
			  }
			  callback (false, result);
			  });
}
