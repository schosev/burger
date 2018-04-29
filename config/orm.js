var connection = require("./connection.js");

function objToSql(ob) {
  var obFormatted;

  for (var key in ob) {
    var value = ob[key];
    
    if (value === "0") {
      value = "true";
    } else {
      value = "false";
    }
    obFormatted = key + "=" + value;
  }
  return obFormatted;
}

var orm = {

    all: function(tableName, cb) {
      var queryString = "SELECT* FROM " + tableName + ";";
      connection.query(queryString, function(err, res) {
          if (err) {
              throw err;
            }
        // Log all results of the SELECT statement
          cb(res)
      })
    },
    insert: function(tableName, cols, vals, cb) {
      var queryString = "INSERT INTO " + tableName;

      queryString += " (";
      queryString += cols.toString();
      queryString += ") ";
      queryString += "VALUES (?,?) ";

      connection.query(queryString, vals, function(err, res) {
          if (err) {
              throw err;
            }
        // Log all results of the SELECT statement
          cb(res)
      })
    },
    update: function (tableName, objColVals, condition, cb) {
      var queryString = "UPDATE " + tableName;
      queryString += " SET ";
      queryString += objToSql(objColVals);  
      queryString += " WHERE ";
      queryString += condition;

      connection.query(queryString, function(err, res) {
        if (err) {
          throw err;
        }
        cb(res);
      });
    }

};

module.exports = orm;

