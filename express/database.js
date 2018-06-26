const fs = require("fs");
const mysql = require("mysql");
const connection = mysql.createConnection(
    Object.assign(
        JSON.parse(fs.readFileSync(__dirname + "/database-connection.json").toString()),
        {
            dateStrings: true
        }
    )
);

// example file database-connection:
// {
//     "host": "example.com",
//     "port": 123,
//     "user": "username",
//     "password": "password",
//     "database": "databasename"
// }

connection.connect((err) => {
    if (err) {
        console.error('MySQL: error connecting: ' + err.stack);
        return;
    }
    console.log('MySQL: connected as id ' + connection.threadId);
});

module.exports = {
    connection: connection
}