var Connection = require('tedious').Connection;
var Request = require('tedious').Request
var TYPES = require('tedious').TYPES;
var config = require('../creds.js');

var connection = new Connection(config);

connection.on('connect', function(err){
    if (err) {
        console.log(err)
    }
    else {
        addUser();
    }
});

function addUser()
{
    console.log('Adding a user...');
    var request = new Request(
        "INSERT INTO Users (uID) VALUES (5)",
        function(err, rowCount, rows)
        {
            process.exit();
        }
    );

    connection.execSql(request);
}
