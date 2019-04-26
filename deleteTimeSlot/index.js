module.exports = async function (context, req) {
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
            deleteTimeSlot();
        }
    });

    function deleteTimeSlot()
    {
        console.log('Attempting to delete timeslot...');

        // Read all rows from table
        var request = new Request(
            "DELETE FROM TimeSlots WHERE TimeID = '5'",
            function(err, rowCount, rows)
            {
                process.exit();
            }
        );

        connection.execSql(request);
    }
};