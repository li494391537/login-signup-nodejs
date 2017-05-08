var crypto = require('crypto')

module.exports = function (sqlparams, pool, callback) {
    pool.getConnection((err, connection) => {
        var sql = 'SELECT * FROM users where username = ?'
        if (err) {
            console.log('[pool error] : ' + err.message)
        } else {
            connection.query(sql, sqlparams, (err, result) => {
                if (err) {
                    console.log('[select error] : ' + err.message)
                } else {
                    if (result.length) {
                        if (!result[0].role & 32) {
                            callback({
                                isLogin: false
                            })
                        }

                        var dd = result[0].password
                        var salt1 = result[0].salt1
                        var salt2 = result[0].salt2

                        var sha256 = crypto.createHash("sha256")
                        sha256.update(salt1)
                        sha256.update(sqlparams[1])
                        var d1 = sha256.digest('hex')

                        sha256 = crypto.createHash("sha256")
                        sha256.update(salt2)
                        sha256.update(d1)
                        var d2 = sha256.digest('hex')

                        if (dd == d2) {
                            crypto.randomBytes(32, function (err, session_id) {
                                session_id = session_id.toString('hex')
                                var sql = 'UPDATE users SET cookie=? WHERE uid=?'
                                connection.query(sql, [session_id, result[0].uid], (err, res) => {
                                    if (err) {
                                        console.log('[select error] : ' + err.message)
                                    } else {
                                        callback({
                                            'isLogin': true,
                                            'uid': result[0].uid,
                                            'username': result[0].username,
                                            'session_id': session_id
                                        })
                                    }
                                })
                            })
                        } else {
                            callback({
                                'isLogin': false,
                                'logNum': result[0].lognum,
                                'logTime': result[0].logtime
                            })
                        }
                    } else {
                        callback(null)
                    }
                }
                connection.release()
            })
        }
    })
}