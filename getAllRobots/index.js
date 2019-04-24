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
        getAllRobots();
    }
});

function getAllRobots()
{
    console.log('Reading rows from the Table...');

    // Read all rows from table
    var request = new Request(
        "SELECT * FROM Robot",
        function(err, rowCount, rows)
        {
            console.log(rowCount + ' robots');
            process.exit();
        }
    );

    request.on('row', function(columns) {
        columns.forEach(function(column) {
            console.log("%s\t%s", column.metadata.colName, column.value);
        });
    });

    connection.execSql(request);
}
