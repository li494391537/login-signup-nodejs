var showUserInfo = require('../admin_database/dbShowUserInfo')
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
            'title': req.session.userName + '的个人信息',
            'userInfo': {
                'isLogin': req.session.isLogin,
                'username': result.username,
                'email': result.email,
                'regtime': result.regtime,
                'role': result.role,
            }
        })
    })

})
module.exports = router