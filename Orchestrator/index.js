module.exports = async function (context, req) {
    var Connection = require('tedious').Connection;
    var Request = require('tedious').Request;
    var config = require('./creds.js');

    var connection = new Connection(config);

    connection.on('connect', function(err){

        var routes = {
            "getAllUsers": "SELECT * FROM Users",
            "getAllRobots":"SELECT * FROM Robots",
            "getAllTimeSlots": "SELECT * FROM TimeSlots", 

            "addUserOld": "INSERT INTO Users (uID) VALUES (5)",
            "addUser": "INSERT INTO Users DEFAULT VALUES",
            "addTimeSlotOld": "INSERT INTO TimeSlots (TimeID) VALUES (5)",
            "addTimeSlot": "INSERT INTO TimeSlots(IsReserved, StartTime, EndTime) VALUES (0,07:30,10:30)",
            "addRobotOld": "INSERT INTO Robots (RobotID) VALUES (5)", 
            "addRobot": "INSERT INTO Robots(IsReserved) VALUES (0)",

            "deleteUser": "DELETE FROM Users WHERE uID = '25'",
            "deleteTimeSlot": "DELETE FROM TimeSlots WHERE TimeID = '5'",
            "deleteRobot": "DELETE FROM Robots WHERE RobotID = '5'"
        };

        if (err) {
            context.log(err);
        }
        else {
            execDbCommand(routes[req.query.func])
        }

        /*
        if (req.query.name || (req.body && req.body.name)) {
            execDbCommand(routes[req.query.func])
        }
        else {
            context.res = {
                status: 400,
                body: "Please pass a name on the query string or in the request body"
            };
        }
        */
    });


    /* 
        Executes sql request passed in as first parameter 
    */
    function execDbCommand(sqlStatement)
    {
        console.log('Reading rows from the Table...');

        var retval = ' ';

        // Read all rows from table
        var request = new Request(
            sqlStatement,
            function(err, rowCount, rows)
            {
                context.log(rowCount + ' rows returned');
                // context.log(retval);
            
                context.res = {
                    status: 200, 
                    body: JSON.stringify(retval)
                };
                
                context.done();

                process.exit();
            }
        );
        
        request.on('row', function(columns) {            
            retval += columns;
            /*
            columns.forEach(function(column) {
                console.log("%s\t%s", column.metadata.colName, column.value);
            });
            */
        });
        
        connection.execSql(request);
    }
};