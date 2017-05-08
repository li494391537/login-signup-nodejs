var signup = require('../app_database/dbSignup')
var existsUser = require('../app_database/dbExistsUser')
var tools = require('../tools/tools')
var express = require('express')

var router = express.Router()

router.get('/', (req, res, next) => {
    if (req.params.message) {
        res.render('signup', {
            message: req.params.message
        })
    } else {
        res.render('signup', {
            message: 0
        })
    }
})

router.post('/', (req, res, next) => {
    var username = req.body.username
    var password = req.body.password
    var email = req.body.email
    var usernameerr = 0;
    var passworderr = 0;
    var emailerr = 0;
    if (!tools.checkUserName(username)) {
        usernameerr = 1;
    }
    if (!tools.checkPassWord(password)) {
        passworderr = 2;
    }
    if (!tools.checkEmail(email)) {
        emailerr = 4;
    }
    var errcode = usernameerr + passworderr + emailerr
    if (errcode) {
        res.redirect('/signup?message=' + errcode)
    } else {
        var sqlparams = [username, email]
        existsUser(sqlparams, req.pool, (result) => {
            if (result > 0) {
                res.render('error', {
                    message: '用户名或邮箱已被注册！',
                    error: {
                        stack: '',
                        status: ''
                    }
                })
            } else {
                sqlparams = [username, password, email]
                signup(sqlparams, req.pool, (result) => {
                    res.redirect('/signin')
                })
            }
        })
    }
})

module.exports = router