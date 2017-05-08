var mysql = require('mysql')
var crypto = require('crypto')

module.exports = function signin(sqlparams, pool, callback) {
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
                        //判断是否被冻结且处于冻结期内
                        if (result[0].lognum > 4 &&
                            (new Date()).getTime() - result[0].logtime < 1000 * 60 * 60 * 12) {
                            callback({
                                'isLogin': false
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
                            callback({
                                'isLogin': true,
                                'uid': result[0].uid,
                                'username': result[0].username,
                            })
                        } else {
                            //密码错误，记录进数据库
                            if ((new Date()).getTime() - result[0].logtime < 1000 * 60 * 5) {
                                var lognum = result[0].lognum + 1
                                var logtime = (new Date()).getTime()
                                updateUserInfo.updateLogInfo([req.session.uid, lognum, logtime], req.pool, (result) => {})
                            } else {
                                var lognum = 1
                                var logtime = (new Date()).getTime()
                                updateUserInfo.updateLogInfo([req.session.uid, lognum, logtime], req.pool, (result) => {})
                            }
                            callback({
                                'isLogin': false
                            })
                        }
                    } else {
                        //用户名错误
                        callback(null)
                    }
                }
                connection.release()
            })
        }
    })
}