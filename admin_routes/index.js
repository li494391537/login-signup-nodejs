var existsUser = require('../admin_database/dbExistsUser')
var userInfo = require('../admin_database/dbUserInfo')
var updateUserInfo = require('../admin_database/dbUpdateUserInfo')
var express = require('express')
var router = express.Router()


router.get('/', (req, res, next) => {
    if (req.session.isLogin && req.session.isLogin == true) {
        userInfo(req.session.uid, req.pool, (result) => {
            res.render('index', {
                'userInfo': {
                    'isLogin': true,
                    'username': req.session.username
                },
                'userinfos': result
            })
        })

    } else {
        req.session.isLogin = false;
        res.render('index', {
            'userInfo': {
                'isLogin': false
            }
        })
    }
})

router.get('/:uid', (req, res, next) => {
    if (req.session.isLogin && req.session.isLogin == true) {
        existsUser([req.params.uid], (result) => {
            if (result) {
                userInfo(uid, (result) => {
                    userInfo(req.session.uid, req.pool, (result) => {
                        res.render('updateUserInfo', {
                            userInfo: {
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
                })
            } else {
                next('route')
            }
        })
    } else {
        req.session.isLogin = false;
        res.redirect('/')
    }

})


//?????
router.post('/:uid', (req, res, next) => {/**/
    if (req.session.isLogin) {
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
                req.session.isLogin = false;
                res.redirect('/')
            }
        })
    } else {
        req.session.isLogin = false;
        res.redirect('/')
    }
})

module.exports = router



