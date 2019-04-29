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
            insertTest();
        }
    });


    function insertTest() 
    {
        console.log('Attempting insert...');

        var request = new Request(
            "INSERT INTO users (uID) VALUES (00027)",
            function(err, rowCount, rows)
            {
                process.exit();
            }
        );

        connection.execSql(request);
    }
};