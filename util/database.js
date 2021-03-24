const mysql = require('mysql2');

const pool = mysql.createPool({
    host: "localhost", 
    user: "root",
    database: "nodeproj",
    password: "myrootpass"
});

module.exports = pool.promise();