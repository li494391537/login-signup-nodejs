var existsUsers = require('../app_database/dbExistsUser')
var showUserInfo = require('../app_database/dbShowUserInfo')
var updateUserInfo = require('../app_database/dbUpdateUserInfo')
var signin = require('../app_database/dbSignin')
var tools = require('../tools/tools')

var express = require('express')
var router = express.Router()

router.get('/', (req, res, next) => {
    if (req.session.isLogin) {
        next('route')
    } else {
        res.redirect('/signin');
    }
})

router.post((req, res, next) => {
    if (req.session.isLogin) {
        next('route')
    } else {
        req.checkBanIP()
        res.redirect('/signin');
    }
})

router.get('/', (req, res, next) => {
    showUserInfo([req.session.uid], req.pool, (result) => {
        res.render('user', {
            title: req.session.userName + '的个人信息',
            isLogin: req.session.isLogin,
            userInfo: {
                username: result.username,
                email: result.email,
                regtime: result.regtime,
                role: result.role,
                message: req.params.message
            }
        })
    })
})

router.post('/password', (req, res, next) => {
    //使用输入的密码尝试登陆
    signin([req.session.userName, req.body.oldpassword], req.pool, (result) => {
        //登陆成功则更改密码
        if (result.isLogin) {
            updateUserInfo.updatePassword([req.body.newpassword, req.session.uid], req.pool, (result) => {
                res.redirect('/user?message=1')
            })
        } else {
            //登陆失败记录IP
            req.checkBanIP()
            res.redirect('/user?message=2') //原密码错误
        }
    })
})

router.post('/email', (req, res, next) => {
    if (tools.checkEmail(req.body.newemail)) {
        updateUserInfo.updateEmail([req.body.newemail, req.session.uid], req.pool, (result) => {
            res.redirect('/user?message=3') //修改Email成功
        })
    } else {
        res.redirect('/user?message=4') //邮箱名不符合规则
    }
})

module.exports = router