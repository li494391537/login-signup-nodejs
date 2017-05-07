# signin-signup-nodejs

## A node.js project about signin and signup.

第一次打开使用项目请运行以下SQL语句:
``` 
create database test;

show databases;

use test;

drop table users;

create table users(
    uid int primary key auto_increment,
    username varchar(40) unique not null,
    password varchar(64) not null,
    salt1 varchar(64) not null,
    salt2 varchar(64) not null,
    email varchar(40) unique not null,
    regtime varchar(40) not null,
    bantime varchar(40),
    cookie varchar(64),
    cookiestart bigint,
    role tinyint not null default 0
);
```

然后创建init.js： 
``` 
var mysql = require('mysql');
var crypto = require('crypto');

var mysql = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'toor',
    database: 'test',
    port: '3306'
});


(() => {
    mysql.connect();
    crypto.randomBytes(32, function (err, salt1) {
        if (err) {
            throw err;
        }
        salt1 = salt1.toString('hex');
        console.log(salt1);
        var content = 'admin';
        var sha256 = crypto.createHash('sha256');
        sha256.update(salt1);
        sha256.update(content);
        var d = sha256.digest('hex');

        crypto.randomBytes(32, (err, salt2) => {
            if (err) {
                throw err;
            }
            salt2 = salt2.toString('hex');
            console.log(salt2);
            var content = d;
            sha256 = crypto.createHash('sha256');
            sha256.update(salt2);
            sha256.update(content);
            var dd = sha256.digest('hex');

            var regtime = (() => {
                var date = new Date();
                var time = date.getTime();
                date = new Date(time)
                time = parseInt(time / 1000);
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
            })();

            sqlparams = ['admin', dd, salt1, salt2, 'admin@test.local', regtime, 63];
            var sql = 'INSERT INTO users (username, password, salt1, salt2, email, regtime, role) VALUES (?, ?, ?, ?, ?, ?, ?)';

            mysql.query(sql, sqlparams, (err, result) => {
                if (err) {
                    console.log('[select error] : ' + err.message);
                } else {};
                mysql.end();
            });
        });
    })
})();

```
然后运行

```
node init.js
```