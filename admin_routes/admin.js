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
    showUserInfo.showUserInfoByID([req.session.uid], req.pool, (result) => {
        res.render('admin', {
            'isLogin': req.session.isLogin,
            'userInfo': {
                'username': result.username,
                'email': result.email,
                'regtime': result.regtime,
                'role': result.role,
            }
        })
    })

})
module.exports = router