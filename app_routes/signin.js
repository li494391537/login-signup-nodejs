var signin = require('../app_database/dbSignin')
var existsUser = require('../app_database/dbExistsUser')
var express = require('express')
var router = express.Router()

router.getPool = function (pool) {
    this.pool = pool;
}

router.getBanIP = function (banIP) {
    this.banIP = banIP;
}

router.get('/', (req, res, next) => {
    res.render('signin', {
        'message': ''
    })
})

router.post('/', (req, res, next) => {
    var sqlparams = [req.body.username, req.body.password]
    existsUser([sqlparams[0]], this.pool, (result) => {
        if (result) {
            signin(sqlparams, this.pool, (result) => {
                if (result.isLogin) {
                    req.session.isLogin = true
                    req.session.username = result.username
                    req.session.uid = result.uid
                    res.redirect('/')
                } else {
                    checkBanIP(this.banIP, req.ip)
                    req.session.isLogin = false
                    res.render('signin', {
                        'message': '用户名或密码错误！'
                    })
                }
            })
        } else {
            checkBanIP(this.banIP, req.ip)
            req.session.isLogin = false
            res.render('signin', {
                'message': '用户名或密码错误！'
            })
        }
    })
})

function checkBanIP(banIP, ip) {
    if (banIP[ip.toString] &&
        (new Date()).getTime() - banIP[ip.toString].logTime < 1000 * 60 * 60 * 6) {
        banIP[ip.toString].logNum += 1
        banIP[ip.toString].logTime = (new Date()).getTime()
    } else {
        banIP[ip.toString] = {
            'logNum': 1,
            'logTime': (new Date()).getTime()
        }
    }
}

module.exports = router