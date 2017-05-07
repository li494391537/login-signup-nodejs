var pool = require('./dbHandle')
var crypto = require('crypto')

module.exports = function (sqlparams, callback) {
    crypto.randomBytes(32, function (err, salt1) {
        if (err) {
            throw err
        }
        salt1 = salt1.toString('hex')
        var content = sqlparams[1]
        var sha256 = crypto.createHash('sha256')
        sha256.update(salt1)
        sha256.update(content)
        var d = sha256.digest('hex')

        crypto.randomBytes(32, (err, salt2) => {
            if (err) {
                throw err
            }
            salt2 = salt2.toString('hex')
            var content = d
            sha256 = crypto.createHash('sha256')
            sha256.update(salt2)
            sha256.update(content)
            var dd = sha256.digest('hex')

            var regtime = (() => {
                var date = new Date()
                var time = date.getTime()
                date = new Date(time)
                time = parseInt(time / 1000)
                return date.getFullYear() +
                    '-' +
                    (date.getMonth() < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)) +
                    '-' +
                    (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) +
                    ' ' +
                    (parseInt(time / 60 / 60 % 24) < 10 ? '0' + parseInt(time / 60 / 60 % 24) : parseInt(time / 60 / 60 % 24)) +
                    ':' +
                    (parseInt(time / 60 % 60) < 10 ? '0' + parseInt(time / 60 % 60) : parseInt(time / 60 % 60)) +
                    ':' +
                    (parseInt(time % 60) < 10 ? '0' + parseInt(time % 60) : parseInt(time % 60));
            })()

            sqlparams = [sqlparams[0], dd, salt1, salt2, sqlparams[2], regtime]
            var sql = 'INSERT INTO users (username, password, salt1, salt2, email, regtime) VALUES (?, ?, ?, ?, ?, ?)'
            pool.getConnection((err, connection) => {
                if (err) {
                    console.log('[pool error] : ' + err.message)
                } else {
                    connection.query(sql, sqlparams, (err, result) => {
                        if (err) {
                            console.log('[select error] : ' + err.message)
                        } else {
                            callback(result)
                        }
                    })
                    connection.release()
                }
            })
        })
    })
}