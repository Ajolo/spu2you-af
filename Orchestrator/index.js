var Connection = require('tedious').Connection;
var Request = require('tedious').Request;
var config = require('./creds.js');

module.exports = function (context, req) {

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

        var gimme = execDbCommand("SELECT * FROM Users");
        console.log("~~~~~~~~~~~~~~~~~~~~");

        console.log(gimme);

        console.log("~~~~~~~~~~~~~~~~~~~~");

        /*
        if (err) {
            context.log(err);
            context.res = {
                status: 400,
                body: "error"
            };
        }
        else if (req.query.func || (req.body && req.body.func)) {
            execDbCommand(routes[req.query.func]);
        }
        else {
            context.res = {
                status: 400,
                body: "Please pass a name on the query string or in the request body"
            };
        }
        */
    


    /* 
        Executes sql request passed in as first parameter 
    */
        function execDbCommand(sqlStatement)
        {
            console.log('Reading rows from the Table...');

            var retval = ' ';
            // console.log(sqlStatement);
            // Read all rows from table
            var r;
            var request = new Request(
                sqlStatement,
                function(err, rowCount, rows)
                {
                    console.log(rowCount + ' rows returned');
                    
                    // console.log(retval)
                    
                    /*
                    context.res = {
                        status: 200, 
                        body: retval
                    };

                    context.done();
                    */
                    return(retval)
                    process.exit();
                }
            );
            
            request.on('row', function(columns) {     
                // console.log(columns)       
                retval += JSON.stringify(columns);
                /*columns.forEach(function(column) {
                    console.log("%s\t%s", column.metadata.colName, column.value);
                });*/
            });
            
            connection.execSql(request);
        }
    });
};