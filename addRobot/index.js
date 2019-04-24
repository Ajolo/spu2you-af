var Connection = require('tedious').Connection;
var Request = require('tedious').Request
var TYPES = require('tedious').TYPES;


var config = {
    authentication: {
        options: {
            userName: 'spu2you-admin',
            password: 'pp123wxyz!' 
        },
        type: 'default'
    },
    server: 'spu2you-reservations.database.windows.net',
    options:
    {
        database: 'spu2you-reservations',
        encrypt: true
    }
};

var connection = new Connection(config);

connection.on('connect', function(err){
    if (err) {
        console.log(err)
    }
    else {
        addRobot();
    }
});

function addRobot()
{
    console.log('Adding a robot...');
    var request = new Request(
        "INSERT INTO Robot (RobotID) VALUES (5)",
        function(err, rowCount, rows)
        {
            process.exit();
        }
    );

    connection.execSql(request);
}
