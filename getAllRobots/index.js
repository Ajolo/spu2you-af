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
        getAllRobots();
    }
});

function getAllRobots()
{
    console.log('Reading rows from the Table...');

    // Read all rows from table
    var request = new Request(
        "SELECT * FROM Robot",
        function(err, rowCount, rows)
        {
            console.log(rowCount + ' robot(s)');
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
