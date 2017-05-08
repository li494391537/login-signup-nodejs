var crypto = require('crypto')

var updateUserInfo = new function () {
    this.updatePassword = function (sqlparams, pool, callback) {
        pool.getConnection((err, conn) => {
            if (err) {
                console.log('[pool error] : ' + err.message)
            } else {
                var sql = 'UPDATE users SET password=? WHERE uid=?'

                var salt1 = crypto.randomBytes(32)
                salt1 = salt1.toString('hex')
                var content = sqlparams[0]
                var sha256 = crypto.createHash('sha256')
                sha256.update(salt1)
                sha256.update(content)
                var d = sha256.digest('hex')

                var salt2 = crypto.randomBytes(32)
                salt2 = salt2.toString('hex')
                var content = d
                sha256 = crypto.createHash('sha256')
                sha256.update(salt2)
                sha256.update(content)
                var dd = sha256.digest('hex')

                sqlparams = [dd, sqlparams[1]]

                conn.query(sql, sqlparams, (err, result) => {
                    if (err) {
                        console.log('[select error] : ' + err.message)
                    } else {
                        callback(result)
                    }
                    conn.release()
                })
            }
        })
    }

    this.updateEmail = function (sqlparams, pool, callback) {
        pool.getConnection((err, conn) => {
            if (err) {
                console.log('[pool error] : ' + err.message)
            } else {
                var sql = 'UPDATE users SET email=? WHERE uid=?'
                conn.query(sql, sqlparams, (err, result) => {
                    if (err) {
                        console.log('[select error] : ' + err.message)
                    } else {
                        callback(result)
                    }
                    conn.release()
                })
            }
        })
    }

    this.updateLogInfo = function (sqlparams, pool, callback) {
        pool.getConnection((err, conn) => {
            if (err) {
                console.log('[pool error] : ' + err.message)
            } else {
                var sql = 'UPDATE users SET lognum=?, logtime=? WHERE uid=?'
                conn.query(sql, sqlparams, (err, result) => {
                    if (err) {
                        console.log('[select error] : ' + err.message)
                    } else {
                        callback(result)
                    }
                    conn.release()
                })
            }
        })
    }
}
module.exports = updateUserInfo