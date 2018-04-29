var mysql = require("mysql");
var orm = require("./orm");
// create the connection information for the sql database
var connection = mysql.createConnection({
host: "localhost",
port: 3306,
user: "root",
password: "odessa01",
database: "burgers_db"
});

// connect to the mysql server and sql database
connection.connect(function(err) {
if (err) throw err;
// run the start function after the connection is made to prompt the user
//start();
console.log("connected as id " + connection.threadId);

});

module.exports = connection;