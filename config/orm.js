//Importing the MySQL connection
const connection = require("../config/connection");

//Helper function for SQL syntax to create question marks in the query string
function printQuestionMarks(num) {
    var arr = [];

    for (var i = 0; i < num; i ++) {
        arr.push("?");
    }

    return arr.toString();
}

//this function helps key value pairs to a readable syntax for SQL
function objToSql(ob) {
    var arr = [];

    for (var key in ob){
        var value = ob[key];
        if(Object.hasOwnProperty.call(ob, key)) {
            if (typeof value === "string" && value.indexOf(" ") >= 0){
                value = "'" + value + "'";
            }
            arr.push(key + "=" + value);
        }
    }
    return arr.toString();
}

// function selectAll()
const orm = {
    all: function(tableInput, cb) {
        var queryString = "SELECT * FROM " + tableInput + ";";
        connection.query(queryString, function (err, result){
            if (err) {
                throw err;
            }
            cb(result)
        });
    },
// function insertOne()
    create: function(table, cols, vals, cb) {
        var queryString = "INSERT INTO " + table;

        queryString += " (";
        queryString += cols.toString();
        queryString += ") ";
        queryString += "VALUES (";
        queryString += printQuestionMarks(vals.length);
        queryString += ") ";

        console.log(queryString);
        connection.query(queryString, vals, function(err, result){
            if (err){
                throw err;
            }
            cb(result);
        });
    },
    //function updateOne()
    update: function(table, objColVals, condition, cb) {
        var queryString = "UPDATE " + table;

        queryString += " SET ";
        queryString += objToSql(objColVals);
        queryString += " WHERE ";
        queryString += condition;

        console.log(queryString);
        connection.query(queryString, function(err, result){
            if (err) {
                throw err;
            }
            cb(result);
        });
    },
    //function delete()
    delete: function(table, condition, cb) {
        var queryString = "DELETE FROM " + table;
        queryString += " WHERE ";
        queryString += condition;

        connection.query(queryString, function(err, result){
            if (err){
                throw err;
            }
            cb(result)
        });
    }
};
//export the orm object for the model (burger.js)
module.exports = orm;