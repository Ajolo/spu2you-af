
module.exports = async function (context, req) {
    var Connection = require('tedious').Connection;
    var Request = require('tedious').Request;
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
};