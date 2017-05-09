module.exports = function existsUser(sqlparams, pool, callback) {
    if (sqlparams.length == 1) {
        pool.getConnection((err, connection) => {
            var sql = 'SELECT * FROM users WHERE uid = ?'
            if (err) {
                console.log('[pool error] : ' + err.message)
                callback(null)
            } else {
                connection.query(sql, sqlparams, (err, result) => {
                    if (err) {
                        console.log('[select error] : ' + err.message)
                        callback(null)
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
                callback(null)
            } else {
                connection.query(sql, sqlparams, (err, result) => {
                    if (err) {
                        console.log('[select error] : ' + err.message)
                        callback(null)
                    } else {
                        callback(result)
                    }
                })
                connection.release()
            }
        })
    }
}