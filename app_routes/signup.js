var signup = require('../app_database/dbSignup')
var existsUser = require('../app_database/dbExistsUser')
var express = require('express')

var router = express.Router()

router.getPool = function (pool) {
    this.pool = pool;
}

router.get('/', (req, res, next) => {
    res.render('signup')
})

router.post('/', (req, res, next) => {
    var username = req.body.username
    var password = req.body.password
    var email = req.body.email

    var sqlparams = [username, email]
    existsUser(sqlparams, (result) => {
        if (result > 0) {
            res.render('error', {
                'message': '用户名或邮箱已被注册！',
                'error': {
                    'stack': 'undefined',
                    'status': 'undefined'
                }
            })
        } else {
            sqlparams = [username, password, email]
            signup(sqlparams, (result) => {
                res.redirect("/signin")
            })
        }
    })
})

module.exports = router