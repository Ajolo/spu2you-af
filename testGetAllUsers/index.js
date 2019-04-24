/* 
Driver={ODBC Driver 13 for SQL Server};Server=tcp:spu2you-reservations.database.windows.net,1433;Database=spu2you-reservations;Uid=spu2you-admin@spu2you-reservations;Pwd={your_password_here};Encrypt=yes;TrustServerCertificate=no;Connection Timeout=30;
*/

// module.exports = async function (context, req) {

var Connection = require('tedious').Connection;
var Request = require('tedious').Request
var TYPES = require('tedious').TYPES;


var config = {
    authentication: {
        options: {
            userName: 'spu2you-admin',
            password: 'pp123wxyz!' 
        },
        type: 'default'
    },
    server: 'spu2you-reservations.database.windows.net',
    options:
    {
        database: 'spu2you-reservations',
        encrypt: true
    }
};

var connection = new Connection(config);

connection.on('connect', function(err){
    if (err) {
        console.log(err)
    }
    else {
        // insertTest();
        queryDatabase();
    }
});


function insertTest() 
{
    console.log('Attempting insert...');

    var request = new Request(
        "INSERT INTO users (uID) VALUES (00024)",
        function(err, rowCount, rows)
        {
            process.exit();
        }
    );

    connection.execSql(request);
}


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