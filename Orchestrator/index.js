var Connection = require("tedious").Connection;
var Request = require("tedious").Request;
var config = require("./creds.js");

module.exports = function(context, req) {
  var connection = new Connection(config);
  connection.on("connect", function(err) {
    var routes = {
      getAllUsers: "SELECT * FROM Users",
      getAllRobots: "SELECT * FROM Robots",
      getAllTimeSlots: "SELECT * FROM TimeSlots",
      getBookedReservations:
        "SELECT * FROM TimeSlots, Reservation WHERE TimeSlots.IsReserved = true AND Reservation.ResDate = '20190920'",
      getAvailableReservations:
        "SELECT * FROM TimeSlots, Reservation WHERE TimeSlots.IsReserved = false AND Reservation.ResDate = '20190920'",
      getReservations:
        "SELECT * FROM Reservation WHERE Reservation.ResDate = '20190920'",

      addUserOld: "INSERT INTO Users (uID) VALUES (5)",
      addUser: "INSERT INTO Users DEFAULT VALUES",
      addTimeSlotOld: "INSERT INTO TimeSlots (TimeID) VALUES (5)",
      addTimeSlot:
        "INSERT INTO TimeSlots(IsReserved, StartTime, EndTime) VALUES (0,07:30,10:30)",
      addRobotOld: "INSERT INTO Robots (RobotID) VALUES (5)",
      addRobot: "INSERT INTO Robots(IsReserved) VALUES (0)",
      addReservation:
        "INSERT INTO Reservation(RobotID, uID, TimeID, ResDate) VALUES(1, 1, 1, '20190920')",

      deleteUser: "DELETE FROM Users WHERE uID = '25'",
      deleteTimeSlot: "DELETE FROM TimeSlots WHERE TimeID = '5'",
      deleteRobot: "DELETE FROM Robots WHERE RobotID = '5'",
      deleteReservation: "DELETE FROM Reservation WHERE uID = 1"
    };

    // execDbCommand("SELECT * FROM Users");

    if (err) {
      context.log(err);
      context.res = {
        status: 400,
        body: "error"
      };
      context.done();
    } else if (req.query.func && req.query.func in routes) {
      // || (req.body && req.body.func)) {
      execDbCommand(routes[req.query.func]);
    } else {
      context.res = {
        status: 400,
        body: "Please pass a name on the query string or in the request body"
      };
      context.done();
    }

    /* 
            Executes sql request passed in as first parameter 
        */
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

        // connection.close();
        context.done();
        // process.exit();
      });

      request.on("row", function(columns) {
        retval += JSON.stringify(columns);
      });

      connection.execSql(request);
    }
  });
};
