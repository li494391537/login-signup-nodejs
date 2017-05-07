var pool = require('./dbHandle');
var crypto = require('crypto');

exports.signin = (sqlparams, callback) => {
    var sql = 'SELECT * FROM users where username = ?';
    pool.getConnection((err, connection) => {
        if (err) {
            console.log('[pool error] : ' + err.message);
        } else {
            connection.query(sql, sqlparams, (err, result) => {
                if (err) {
                    console.log('[select error] : ' + err.message);
                } else {
                    if (result) {
                        var dd = result[0].password;
                        var salt1 = result[0].salt1;
                        var salt2 = result[0].salt2;

                        var sha256 = crypto.createHash("sha256");
                        sha256.update(salt1);
                        sha256.update(sqlparams[1]);
                        var d1 = sha256.digest('hex');

                        sha256 = crypto.createHash("sha256");
                        sha256.update(salt2);
                        sha256.update(d1);
                        var d2 = sha256.digest('hex');

                        if (dd === d2) {
                            result = {
                                'uid': result[0].uid,
                                'username': result[0].username
                            };
                        }
                        else
                        {
                            result = null;
                        }
                    }
                    callback(result);
                };
            });
            connection.release();
        }
    });
};

