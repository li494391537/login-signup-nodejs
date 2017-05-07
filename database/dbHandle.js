var mysql = require('mysql');

module.exports = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'toor',
    database: 'test',
    port: '3306'
});