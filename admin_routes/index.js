var existsUser = require('../admin_database/dbExistsUser')
var showUserInfo = require('../admin_database/dbShowUserInfo')
var updateUserInfo = require('../admin_database/dbUpdateUserInfo')
var express = require('express')
var router = express.Router()

router.get((req, res, next) => {
    if (req.session.isLogin) {
        next('route')
    } else {
        req.session.isLogin = false
        res.redirect('/signin');
    }
})

router.post((req, res, next) => {
    if (req.session.isLogin) {
        next('route')
    } else {
        req.session.isLogin = false
        req.checkBanIP()
        res.redirect('/');
    }

})

router.get('/', (req, res, next) => {
    showUserInfo([req.session.uid], req.pool, (result) => {
        res.render('index', {
            'userInfo': {
                'isLogin': true,
                'username': req.session.username
            },
            'userinfos': result
        })
    })
})

router.get('/:uid', (req, res, next) => {
    existsUser([req.params.uid], (result) => {
        if (result) {
            showUserInfo(req.params.uid, req.pool, (result) => {
                res.render('updateUserInfo', {
                    'userInfo': {
                        'admin': {
                            'isLogin': req.session.isLogin,
                            'username': req.session.username,
                        },
                        'uid': result[0].uid,
                        'username': result[0].username,
                        'email': result[0].email,
                        'regtime': result[0].regtime,
                        'bantime': result[0].bantime,
                        'role': result[0].role,
                        'lognum': result[0].lognum,
                        'logtime': result[0].logtime,
                    }
                })
            })
        } else {
            next('route')
        }
    })
})


//?????
router.post('/:uid', (req, res, next) => {
    existsUser(uid, (result) => {
        if (result) {
            var email = req.body.email
            var bantime = req.body.bantime
            var role = req.body.role
            var lognum = req.body.lognum
            var logtime = req.body.logtime
            var sqlparams = [email, bantime, role, lognum, logtime, uid]
            updateUserInfo(sqlparams, req.pool, (result) => {
                res.redirect('/' + uid)
            })
        }
        else {
            res.redirect('/')
        }
    })
})

module.exports = router



