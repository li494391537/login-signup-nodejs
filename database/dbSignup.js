var pool = require('./dbHandle');
var crypto = require('crypto');

exports.existsUser = (sqlparams, callback) => {
    var sql = 'SELECT COUNT(*) FROM user WHERE username = ?';
    pool.getConnection((err, connection) => {
        if (err) {
            console.log('[pool error] : ' + err.message);
        } else {
            connection.query(sql, sqlparams, (err, result) => {
                if (err) {
                    console.log('[select error] : ' + err.message);
                } else {
                    callback(result);
                };
            });
            connection.release();
        }
    });
}

exports.signup = function (sqlparams, callback) {
    crypto.randomBytes(64, function (err, salt1) {
        if (err) { throw err; }
        salt1 = salt1.toString('hex');
        var content = sqlparams[1];
        var sha256 = crypto.createHash('sha256');
        sha256.update(salt1);
        sha256.update(content);
        var d = sha256.digest('hex');

        crypto.randomBytes(64, (err, salt2) => {
            if (err) { throw err; }
            salt2 = salt2.toString('hex');
            var content = d;
            sha256 = crypto.createHash('sha256');
            sha256.update(salt2);
            sha256.update(content);
            var dd = sha256.digest('hex');

            sqlparams = [sqlparams[0], dd, salt1, salt2, 'email', 'regtime'];
            var sql = 'INSERT INTO user (username, password, salt1, salt2, email, regtime) VALUES (?, ?, ?, ?, ?, ?)';
            pool.getConnection((err, connection) => {
                if (err) {
                    console.log('[pool error] : ' + err.message);
                } else {
                    connection.query(sql, sqlparams, (err, result) => {
                        if (err) {
                            console.log('[select error] : ' + err.message);
                        } else {
                            callback(result);
                        };
                    });
                    connection.release();
                }
            });
        });
    })





}