var existsUsers = require('../app_database/dbExistsUser')
var showUserInfo = require('../app_database/dbShowUserInfo')
var signin = require('../app_database/dbSignin')
var tools = require('../tools/tools')

var express = require('express')
var router = express.Router()

router.get('/', (req, res, next) => {
    var message = null
    if (req.params.message == 1) {
        message = 1
    } else if (req.params.message == 2) {
        message = 2
    } else if (req.params.message == 3) {
        message = 3
    } else if (req.params.message == 4) {
        message = 4
    } else {
        message = 0;
    }
    if (req.session.isLogin) {
        showUserInfo([req.session.uid], req.pool, (result) => {
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

router.post('/password', (req, res, next) => {
    if (req.session.isLogin) {
        //使用输入的密码尝试登陆
        signin([req.session.userName, req.body.oldpassword], req.pool, (result) => {
            //登陆成功则更改密码
            if (result.isLogin) {
                updateUserInfo.updatePassword([req.session.uid, req.body.newpassword], req.pool, (result) => {
                    res.redirect('/usermessage=1')
                })
            } else {
                //登陆失败记录IP
                req.checkBanIP()
                res.redirect('/user?message=2') //原密码错误
            }
        })
    } else {
        //未登录尝试更改密码，识别为恶意行为，记录IP
        req.checkBanIP()
        res.redirect('/signin')
    }
})

router.post('/email', (req, res, next) => {
    if (req.session.isLogin) {
        if (tools.checkEmail(req.body.newemail)) {
            updateUserInfo.updateEmail([req.session.uid, req.body.newemail], req.pool, (result) => {
                res.redirect('/user?message=3') //修改Email成功
            })
        } else {
            res.redirect('/user?message=4') //邮箱名不符合规则
        }
    } else {
        req.checkBanIP()
        res.redirect('/signin')
    }
})

module.exports = router