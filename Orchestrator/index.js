module.exports = async function (context, req) {
    var Connection = require('tedious').Connection;
    var Request = require('tedious').Request;
    var config = require('../creds.js');

    var connection = new Connection(config);

    connection.on('connect', function(err){

        var routes = {
            "getAllUsers": "SELECT * FROM Users",
            "getAllRobots":"SELECT * FROM Robots",
            "getAllTimeSlots": "SELECT * FROM TimeSlots", 

            "addUser": "INSERT INTO Users (uID) VALUES (5)", 
            "addTimeSlot": "INSERT INTO TimeSlots (TimeID) VALUES (5)",
            "addRobot": "INSERT INTO Robot (RobotID) VALUES (5)",

            "deleteUser": "DELETE FROM Users WHERE uID = '25'",
            "deleteTimeSlot": "DELETE FROM TimeSlots WHERE TimeID = '5'",
            "deleteRobot": "DELETE FROM Robot WHERE RobotID = '5'"
        };

        // execDbCommand(routes[req[]])

        if (err) {
            console.log(err);
        }
        else {
            // execDbCommand("SELECT * FROM Users");
            // execDbCommand(routes["getAllUsers"]);
            if (req.query.func) {
                var returnData = execDbCommand(routes[req.query.func])
                context.res = {
                    status: 200, 
                    body: returnData
                };
            }
            else { 
                context.res = {
                    status: 400,
                    body: "Please pass a name on the query string or in the request body"
                };
            }
            // execDbCommand(routes[req.query.func])
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
                // console.log(rows);
                process.exit();
            }
        );
        
        request.on('row', function(columns) {
            columns.forEach(function(column) {
                console.log("%s\t%s", column.metadata.colName, column.value);
            });
        });
        
        var result = connection.execSql(request);
        // console.log(result);
        return(result);
    }
};