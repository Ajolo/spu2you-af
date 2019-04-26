module.exports = async function (context, req) {
    var Connection = require('tedious').Connection;
    var Request = require('tedious').Request
    var config = require('../creds.js');

    var connection = new Connection(config);

    connection.on('connect', function(err){
        if (err) {
            console.log(err)
        }
        else {
            deleteUser();
        }
    });

    function deleteUser()
    {
        console.log('Attempting to delete user...');

        // Read all rows from table
        var request = new Request(
            "DELETE FROM Users WHERE uID = '5'",
            function(err, rowCount, rows)
            {
                process.exit();
            }
        );

        connection.execSql(request);
    }
};
