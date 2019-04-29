module.exports = async function (context, req) {
    var Connection = require('tedious').Connection;
    var Request = require('tedious').Request
    var config = require('./creds.js');

    var connection = new Connection(config);
    var retMsg = ""

    connection.on('connect', function(err){
        if (err) {
            console.log(err)
        }
        else {
            getAllUsers();
        }
    });

    function getAllUsers()
    {
        console.log('Reading rows from the Table...');

        // Read all rows from table
        var request = new Request(
            "SELECT * FROM Users",
            function(err, rowCount, rows)
            {
                context.log(rowCount + ' users');

                process.exit();
            }
        );

        request.on('row', function(columns) {
            columns.forEach(function(column) {
                retMsg += "%s\t%s", column.metadata.colName, column.value, '\n'
                context.log("%s\t%s", column.metadata.colName, column.value);
            });
        });
        

        connection.execSql(request);

        return {
            httpResponse: {
                body: retMsg
            },
            queueOutput: retMsg
        };
    }
};