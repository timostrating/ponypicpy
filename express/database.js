const fs = require("fs");
const mysql = require("mysql");
const connection = mysql.createConnection(
    JSON.parse(fs.readFileSync("./database-connection.json").toString())
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