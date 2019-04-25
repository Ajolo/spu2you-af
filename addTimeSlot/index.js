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
        addTimeSlot();
    }
});

function addTimeSlot()
{
    console.log('Adding a timeslot...');
    var request = new Request(
        "INSERT INTO TimeSlots (TimeID) VALUES (5)",
        function(err, rowCount, rows)
        {
            process.exit();
        }
    );

    connection.execSql(request);
}
