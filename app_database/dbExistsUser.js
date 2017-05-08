var mysql = require('mysql')

module.exports = function (sqlparams, pool, callback) {
    if (sqlparams.length == 1) {
        pool.getConnection((err, connection) => {
            var sql = 'SELECT * FROM users WHERE username = ?'
            if (err) {
                console.log('[pool error] : ' + err.message)
            } else {
                connection.query(sql, sqlparams, (err, result) => {
                    if (err) {
                        console.log('[select error] : ' + err.message)
                    } else {
                        callback(result.length)
                    }
                })
                connection.release()
            }
        })
    } else {
        var sql = 'SELECT COUNT(*) FROM users WHERE username = ? or email = ?';
        pool.getConnection((err, connection) => {
            if (err) {
                console.log('[pool error] : ' + err.message)
            } else {
                connection.query(sql, sqlparams, (err, result) => {
                    if (err) {
                        console.log('[select error] : ' + err.message)
                    } else {
                        callback(result);
                    }
                })
                connection.release();
            }
        })
    }
}