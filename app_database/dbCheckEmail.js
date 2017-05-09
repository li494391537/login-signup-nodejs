module.exports = function checkEmail(sqlparams, pool, callback) {
    pool.getConnection((err, conn) => {
        if (err) {
            console.log('[pool error] : ' + err.message)
            callback(null)
        } else {
            var sql = 'SELECT * FROM users WHERE emailcheck = ?'
            conn.query(sql, [sqlparams[0], uid.sync(128), (new Date()).getTime(), 2], (err, result) => {
                conn.release()
                if (err) {
                    console.log('[select error] : ' + err.message)
                    callback(null)
                } else {
                    if (result[0].emailchecktype == 1) {
                        if ((new Date()).getTime() - result[0].emailchecktime < 1000 * 60 * 60 * 6) {
                            
                        }
                    }
                }
            })
        }
    })
}