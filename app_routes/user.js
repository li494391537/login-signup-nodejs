var existsUsers = require('../app_database/dbExistsUser')
var userInfo = require('../app_database/dbUserInfo')
var signin = require('../app_database/dbSignin')
var express = require('express')
var router = express.Router()

router.get('/', (req, res, next) => {
    if (req.params.pwe) {
        if (req.session.isLogin) {
            userInfo([req.session.uid], req.pool, (result) => {
                res.render('user', {
                    'title': req.session.userName + '的个人信息',
                    'userInfo': {
                        'isLogin': req.session.isLogin,
                        'username': result.username,
                        'email': result.email,
                        'regtime': result.regtime,
                        'role': result.role,
                        'message': ''
                    }
                })
            })
        } else {
            res.redirect('/signin');
        }
    } else {
        if (req.session.isLogin) {
            userInfo([req.session.uid], req.pool, (result) => {
                res.render('user', {
                    'title': req.session.userName + '的个人信息',
                    'userInfo': {
                        'isLogin': req.session.isLogin,
                        'username': result.username,
                        'email': result.email,
                        'regtime': result.regtime,
                        'role': result.role,
                        'message': '密码错误！'
                    }
                })
            })
        } else {
            res.redirect('/signin');
        }
    }
})

route.post('/password', (req, res, next) => {
    if (req.session.isLogin) {
        signin([req.session.userName, req.body.oldpassword], req.pool, (result) => {
            if (result.isLogin) {
                updateUserInfo.updatePassword([req.session.uid, req.body.newpassword], req.pool, (result) => {
                    res.redirect('/user')
                })
            } else {

                req.checkBanIP(req.ip)

                if ((new Date()).getTime() - result.logtime < 1000 * 60 * 5) {
                    var lognum = result.lognum + 1
                    var logtime = (new Date()).getTime()
                    updateUserInfo.updateLogInfo([req.session.uid, lognum, logtime], req.pool, (result) => {
                        res.redirect('/user?pwe=1')
                    })
                }
            }
        })
    }
})

route.post('/email', (req, res, next) => {

})

module.exports = router