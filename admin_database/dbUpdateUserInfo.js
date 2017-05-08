module.exports =  function (sqlparams, pool, callback) {
    pool.getConnection((err, conn) => {
        if (err) {
            console.log('[pool error] : ' + err.message);
        } else {
            var sql = 'UPDATE users SET email=?, bantime=?, role=?, lognum=?, logtime=? WHERE uid=?'
            conn.query(sql, sqlparams, (err, result) => {
                if (err) {
                    console.log('[select error] : ' + err.message)
                } else {
                    callback(result)
                }
                conn.release();
            })
        }
    })
}
