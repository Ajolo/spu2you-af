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
        deleteRobot();
    }
});

function deleteRobot()
{
    console.log('Attempting to delete robot...');

    // Read all rows from table
    var request = new Request(
        "DELETE FROM Robot WHERE RobotID = '5'",
        function(err, rowCount, rows)
        {
            process.exit();
        }
    );

    connection.execSql(request);
}
