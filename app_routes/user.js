var existsUsers = require('../app_database/dbExistsUser')
var userInfo = require('../app_database/dbUserInfo')
var signin = require('../app_database/dbSignin')
var tools = require('../tools/tools')
var express = require('express')
var router = express.Router()

router.get('/', (req, res, next) => {
    var message = null
    if (req.params.message) {
        message = req.params.message
    } else {
        message = 0;
    }
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
                    'message': message
                }
            })
        })
    } else {
        res.redirect('/signin');
    }
})

route.post('/password', (req, res, next) => {
    if (req.session.isLogin) {
        signin([req.session.userName, req.body.oldpassword], req.pool, (result) => {
            if (result.isLogin) {
                updateUserInfo.updatePassword([req.session.uid, req.body.newpassword], req.pool, (result) => {
                    res.redirect('/usermessage=1')
                })
            } else {
                req.checkBanIP()
                if ((new Date()).getTime() - result.logtime < 1000 * 60 * 5) {
                    var lognum = result.lognum + 1
                    var logtime = (new Date()).getTime()
                    updateUserInfo.updateLogInfo([req.session.uid, lognum, logtime], req.pool, (result) => {})
                } else {
                    var lognum = 1
                    var logtime = (new Date()).getTime()
                    updateUserInfo.updateLogInfo([req.session.uid, lognum, logtime], req.pool, (result) => {})
                }
                res.redirect('/user?message=2')
            }
        })
    } else {
        req.checkBanIP()
        res.redirect('/signin')
    }
})

route.post('/email', (req, res, next) => {
    if (req.session.isLogin) {
        if (tools.checkEmail(req.body.newemail)) {
            updateUserInfo.updateEmail([req.session.uid, req.body.newemail], req.pool, (result) => {
                res.redirect('/user?message=3')   //修改Email成功
            })
        } else {
            res.redirect('/user?message=4')   //邮箱名不符合规则
        }
    } else {
        req.checkBanIP()
        res.redirect('/signin')
    }
})

module.exports = router