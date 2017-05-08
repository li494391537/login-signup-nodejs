var express = require('express')
var router = express.Router()

router.get('/', function (req, res, next) {
    if (req.session.isLogin && req.session.isLogin == true) {
        res.render('index', {
            userInfo: {
                isLogin: true,
                username: req.session.username
            }
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

module.exports = router