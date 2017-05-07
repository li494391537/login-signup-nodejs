var mysql = require('mysql')

module.exports = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'toor',
    database: 'test',
    port: '3306'
})