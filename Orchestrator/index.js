// module.exports = async function (context, req) {
    var Connection = require('tedious').Connection;
    var Request = require('tedious').Request
    var config = require('../creds.js');

    var connection = new Connection(config);

    connection.on('connect', function(err){
        if (err) {
            console.log(err)
        }
        else {
            // get all robots:              "SELECT * FROM Robots"
            // get all timeslots:           "SELECT * FROM TimeSlots" 
            // get all users:               "SELECT * FROM Users"
            // delete specific user:        "DELETE FROM Users WHERE uID = '25'"
            // delete specific timeslot:    "DELETE FROM TimeSlots WHERE TimeID = '5'"
            // delete specific robot by ID: "DELETE FROM Robot WHERE RobotID = '5'"
            // add user by ID:              "INSERT INTO Users (uID) VALUES (5)"
            // add new timeslot:            "INSERT INTO TimeSlots (TimeID) VALUES (5)"
            // add robot by ID:             "INSERT INTO Robot (RobotID) VALUES (5)"

            execDbCommand("SELECT * FROM Users");
        }
    });


    /* 
        Executes sql request passed in as first parameter 
    */
    function execDbCommand(sqlStatement)
    {
        console.log('Reading rows from the Table...');

        // Read all rows from table
        var request = new Request(
            sqlStatement,
            function(err, rowCount, rows)
            {
                console.log(rowCount + ' rows returned');
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
// };