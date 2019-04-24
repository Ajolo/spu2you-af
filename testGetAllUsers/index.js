/* 
Driver={ODBC Driver 13 for SQL Server};Server=tcp:spu2you-reservations.database.windows.net,1433;Database=spu2you-reservations;Uid=spu2you-admin@spu2you-reservations;Pwd={your_password_here};Encrypt=yes;TrustServerCertificate=no;Connection Timeout=30;
*/

// module.exports = async function (context, req) {

var Connection = require('tedious').Connection;
var Request = require('tedious').Request;
var TYPES = require('tedious').TYPES;
var config = require('../creds.js');

var connection = new Connection(config);

connection.on('connect', function(err){
    if (err) {
        console.log(err)
    }
    else {
        queryDatabase();
    }
});


function queryDatabase()
{
    console.log('Reading rows from the Table...');

    // Read all rows from table
    var request = new Request(
        "SELECT * FROM Users",
        function(err, rowCount, rows)
        {
            console.log(rowCount + ' row(s) returned');
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

// }