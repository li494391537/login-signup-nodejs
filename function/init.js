var mysql = require('mysql')
var crypto = require('crypto')

var mysql = mysql.createConnection({
    host: 'localhost',
    user: process.argv[2],
    password: process.argv[3],
    database: 'test',
    port: '3306'
});

(() => {
    mysql.connect()
    var sql = 'DROP TABLE users'
    mysql.query(sql, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            console.log('Drop table sussess')
        }
        var sql = 'CREATE TABLE users(uid int primary key auto_increment,username varchar(40) unique not null,password varchar(64) not null,salt1 varchar(64) not null,salt2 varchar(64) not null,email varchar(40) unique not null,regtime varchar(40) not null,lognum tinyint,logtime bigint,emailcheck varchar(128),emailchecktime bigint,emailchecktype tinyint not null default 0,role tinyint not null default 0);'
        mysql.query(sql, (err, result) => {
            if (err) {
                console.log(err)
            } else {
                console.log('Create table sussess')
            }
            var salt1 = crypto.randomBytes(32).toString('hex')
            var salt2 = crypto.randomBytes(32).toString('hex')
            var content = 'admin123'
            var sha256 = crypto.createHash('sha256')
            sha256.update(salt1)
            sha256.update(content)
            var d = sha256.digest('hex')
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
                    (parseInt(time % 60) < 10 ? '0' + parseInt(time % 60) : parseInt(time % 60))
            })()
            var sqlparams = ['admin', dd, salt1, salt2, 'admin@test.local', regtime, 63]
            var sql = 'INSERT INTO users (username, password, salt1, salt2, email, regtime, role) VALUES (?, ?, ?, ?, ?, ?, ?);'
            mysql.query(sql, sqlparams, (err, result) => {
                if (err) {
                    console.log(err)
                } else {
                    console.log('Insert "admin" sussess')

                    var total = 100;
                    if (typeof process.argv[4] != 'undefined') {
                        total = process.argv[4]
                    } else {}

                    console.log('Start insert ' + total + ' test records:')
                    test(1, total, mysql)
                }
            })
        })
    })
})();


function test(count, total, mysql) {
    var salt1 = crypto.randomBytes(32).toString('hex')
    var salt2 = crypto.randomBytes(32).toString('hex')
    var content = 'password' + count
    var sha256 = crypto.createHash('sha256')
    sha256.update(salt1)
    sha256.update(content)
    var d = sha256.digest('hex')
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
            (parseInt(time % 60) < 10 ? '0' + parseInt(time % 60) : parseInt(time % 60))
    })()
    var sqlparams = ['test' + count, dd, salt1, salt2, 'test' + count + '@test.lan', regtime, (count & 31)]
    var sql = 'INSERT INTO users (username, password, salt1, salt2, email, regtime, role) VALUES (?, ?, ?, ?, ?, ?, ?);'
    mysql.query(sql, sqlparams, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            console.log('Insert user ' + '"' + sqlparams[0] + '"' + ' sussess')
        }
        count++;
        if (count <= total) {
            test(count, total, mysql)
        } else {
            console.log('End insert ' + total + ' test records.')
            mysql.end()
        }
    })
}