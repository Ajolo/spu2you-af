var Connection = require("tedious").Connection;
var Request = require("tedious").Request;
var config = require("./creds.js");

module.exports = function(context, req) {
    var connection = new Connection(config);
    connection.on("connect", function(err) {
        // routes not needing date 
        var routes = {
            getAllUsers: "SELECT * FROM Users",
            getAllRobots: "SELECT * FROM Robots",
            getAllTimeSlots: "SELECT * FROM TimeSlots",
            getAllReservations: "SELECT * FROM Reservation",
            
            addUserOld: "INSERT INTO Users (uID) VALUES (5)",
            addUser: "INSERT INTO Users DEFAULT VALUES",
            addTimeSlotOld: "INSERT INTO TimeSlots (TimeID) VALUES (5)",
            addTimeSlot:
                "INSERT INTO TimeSlots(IsReserved, StartTime, EndTime) VALUES (0,07:30,10:30)",
            addRobotOld: "INSERT INTO Robots (RobotID) VALUES (5)",
            addRobot: "INSERT INTO Robots(IsReserved) VALUES (0)",

            deleteUser: "DELETE FROM Users WHERE uID = '25'",
            deleteTimeSlot: "DELETE FROM TimeSlots WHERE TimeID = '5'",
            deleteRobot: "DELETE FROM Robots WHERE RobotID = '5'",
            deleteReservation: "DELETE FROM Reservation WHERE uID = 1"
        };

        // if date is specified, add and set necessary routes / SQL
        if (req.query.date) {
            routes["getReservations"] =
                "SELECT * FROM Reservation WHERE Reservation.ResDate = '" + 
                req.query.date + "'";
            if (req.query.timeID) {
                routes["addReservation"] =
                    "INSERT INTO Reservation(RobotID, uID, TimeID, ResDate) VALUES(1, 1, "
                    + req.query.timeID + ", '" + req.query.date + "')";
            }
            
        }

        // try to exec sql based on specified req.query.func parameters 
        if (err) {
            context.log(err);
            context.res = {
                status: 400,
                body: "error"
            };
            context.done(); 
        } 
        if (req.query.func && req.query.func in routes) {
            execDbCommand(routes[req.query.func]);
        } 
        else {
            context.res = {
                status: 400,
                body: "Please pass a name on the query string or in the request body"
            };
            context.done();
        }

        // executes sql request passed in as first parameter 
        function execDbCommand(sqlStatement) {
            console.log("Reading rows from the Table...");
            var retval = " ";

            // Read all rows from table
            var request = new Request(sqlStatement, function(err, rowCount, rows) {
                console.log(rowCount + " rows returned");
                context.res = {
                    status: 200,
                    body: retval
                };
                context.done();
            });

            request.on("row", function(columns) {
                retval += JSON.stringify(columns);
            });

            connection.execSql(request);
        }
    });
};