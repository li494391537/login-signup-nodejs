var existsUser = require('../admin_database/dbExistsUser')
var showUserInfo = require('../admin_database/dbShowUserInfo')
var updateUserInfo = require('../admin_database/dbUpdateUserInfo')
var tools = require('../tools/tools')
var express = require('express')
var router = express.Router()

router.use((req, res, next) => {
    if (req.method === 'POST') {
        if (req.session.isLogin) {
            next('route')
        } else {
            req.session.isLogin = false
            req.checkBanIP()
            res.redirect('/signin');
        }
    } else if (req.method === 'GET') {
        if (req.session.isLogin) {
            next('route')
        } else {
            req.session.isLogin = false
            res.redirect('/signin');
        }
    } else {
        next('route')
    }
})

router.post('/', (req, res, next) => {


})

router.get('/', (req, res, next) => {
    showUserInfo.showAllUserInfo([], req.pool, (result) => {
        res.render('index', {
            'isLogin': true,
            'userInfo': {
                'username': req.session.userName
            },
            'userinfos': result
        })
    })
})

router.get('/:uid', (req, res, next) => {
    existsUser([req.params.uid], req.pool, (result) => {
        if (result) {
            showUserInfo.showUserInfoByID(req.params.uid, req.pool, (result) => {
                res.render('updateUserInfo', {
                    'isLogin': req.session.isLogin,
                    'userInfo': {
                        'username': req.session.userName,
                    },
                    'editInfo': {
                        'uid': result.uid,
                        'username': result.username,
                        'email': result.email,
                        'regtime': result.regtime,
                        'role': result.role,
                        'lognum': result.lognum,
                        'logtime': result.logtime,
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
    existsUser(uid, req.pool, (result) => {
        if (result) {
            if (tools.checkEmail(req.body.email) && (req.body.role & 32)) {
                var email = req.body.email
                var role = req.body.role
                var sqlparams = [email, role, uid]
                updateUserInfo(sqlparams, req.pool, (result) => {
                    res.redirect('/' + uid)
                })
            } else {
                res.redirect('/' + uid)
            }

        } else {
            res.redirect('/')
        }
    })
})

router.post('/:uid/password', (req, res, next) => {
    existsUser(uid, req.pool, (result) => {
        if (result) {
            if(tools.checkPassWord())
        }
        else { }
    })
})
module.exports = router