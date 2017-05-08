var crypto = require('crypto')

var updateUserInfo = new function (){
    this.updatePassword = function (sqlparams, pool, callback) {
        var sql = 'UPDATE users SET password=? WHERE uid=?'
        pool.getConnection((err, conn) => {
        if (err) {
            console.log('[pool error] : ' + err.message)
        } else {
            conn.query(sql, sqlparams, (err, result) => {
                if (err) {
                    console.log('[select error] : ' + err.message)
                } else {
                    
                }
                connection.release()
    })

    this.updateEmail= function (sqlparams, pool, callback) {
        var sql = 'UPDATE users SET email=? WHERE uid=?'
    }
}

module.exports = updateUserInfo