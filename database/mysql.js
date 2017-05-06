var mysql = require('mysql');

var pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'toor',
    database: 'test',
    port: '3306'
});

exports.signin = (sqlparams, callback) => {
    var sql = 'SELECT * FROM user where username = ? and password = ?';
    pool.getConnection((err, connection) => {
        if (err) {
            console.log('[pool error] : ' + err.message);
        } else {
        connection.query(sql, sqlparams, (err, result) => {
            if (err) {
                console.log('[select error] : ' + err.message);
            } else {
                callback(result);
            };
        });
        connection.release();
        }
    });
};

exports.signup = (sqlparams, callback) => {
    var sql = '';
    pool.getConnection((err, connection) => {
        if (err) {
            console.log('[pool error] : ' + err.message);
        } else {
        connection.query(sql, sqlparams, (err, result) => {
            if (err) {
                console.log('[select error] : ' + err.message);
            } else {
                callback(result);
            };
        });
        connection.release();
        }
    });
}