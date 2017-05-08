var showUserInfo = new function () {
    this.showUserInfoByID = function (sqlparams, pool, callback) {
        pool.getConnection((err, conn) => {
            var sql = 'SELECT * FROM users where uid = ?'
            if (err) {
                console.log('[pool error] : ' + err.message)
            } else {
                conn.query(sql, sqlparams, (err, result) => {
                    if (err) {
                        console.log('[select error] : ' + err.message)
                    } else {
                        if (result.length) {
                            callback({
                                'uid': result[0].uid,
                                'username': result[0].username,
                                'email': result[0].email,
                                'regtime': result[0].regtime,
                                'bantime': result[0].bantime,
                                'role': result[0].role
                            })
                        }
                    }
                    conn.release()
                })
            }
        })
    }

    this.showAllUserInfo = function (sqlparams, pool, callback) {
        pool.getConnection((err, conn) => {
            if (err) {
                console.log('[pool error] : ' + err.message)
            } else {
                var sql = 'SELECT uid, username, email, regtime, bantime, lognum, logtime, role FROM users;'
                conn.query(sql, (err, result) => {
                    if (err) {
                        console.log('[select error] : ' + err.message)
                    } else {
                        if (result.length) {
                            callback(result)
                        }
                    }
                    conn.release()
                })
            }
        })
    }
}

module.exports = showUserInfo