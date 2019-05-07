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
            //addUser: "INSERT INTO Users DEFAULT VALUES", -- deprecated, should now add and include email
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

        // set routes/SQL for query values when specified 
        if (req.query.date) {
            routes["getReservations"] =
                "SELECT * FROM Reservation WHERE Reservation.ResDate = '" +
                req.query.date +
                "'";
            routes["getUsedTimeSlots"] =
                "SELECT T.TimeID FROM TimeSlots T, Reservation R WHERE R.ResDate = '" +
                req.query.date +
                "' AND R.TimeID = T.TimeID";
            if (req.query.timeID) {
                routes["addReservationOld"] = // remove me when addReservation works 
                    "INSERT INTO Reservation(RobotID, uID, TimeID, ResDate) VALUES(1, 1, " +
                    req.query.timeID +
                    ", '" +
                    req.query.date +
                    "')";
                if (req.query.uEmail) {
                    routes["addReservation"] =
                        "INSERT INTO Reservation(RobotID, uID, TimeID, ResDate) Values(1, " +
                        req.query.uEmail +
                        ", " +
                        req.query.timeID + 
                        ", " +
                        req.query.date +
                        "')";
                }
            }
            if (req.query.uEmail) {
                routes["getUserReservationsDate"] =
                    "SELECT R.ResDate, R.TimeID, R.uID, U.uEmail FROM Reservation R, Users U " +
                    "WHERE R.uID = U.uID AND U.uEmail = '" +
                    req.query.uEmail +
                    "' AND R.ResDate = '" +
                    req.query.date +
                    "'";
            }
        }
        if (req.query.uEmail) {
            routes["addUser"] =
                "INSERT INTO Users (uEmail) VALUES ('" +
                req.query.uEmail +
                "')";
            routes["getUserReservations"] = 
                "SELECT R.ResDate, R.TimeID, R.uID, U.uEmail FROM Reservation R, Users U " +
                "WHERE R.uID = U.uID AND U.uEmail = '" +
                req.query.uEmail +
                "'";
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
                body:
                    "Please pass a name on the query string or in the request body"
            };
            context.done();
        }

        // executes sql request passed in as first parameter
        function execDbCommand(sqlStatement) {
            console.log("Reading rows from the Table...");
            // var retval = "";

            var returnContainer = {}; // Object

            // Read all rows from table
            var request = new Request(sqlStatement, function(
                err,
                rowCount,
                rows
            ) {
                console.log(rowCount + " rows returned");
                var retval = JSON.stringify(returnContainer);
                context.res = {
                    status: 200,
                    body: retval
                };
                context.done();
            });

            var iterator = 0;
            // returnContainer[column.metadata.colName] = column.value;
            request.on("row", function(columns) {
                iterator += 1;
                returnContainer[iterator] = columns;
            });

            connection.execSql(request);
        }
    });
};

// ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~
// change output to return *something* so that it is clear when getUsedTimeSlots does not
// have anything to return as intended -- not to be confused with a connection error
// ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~
