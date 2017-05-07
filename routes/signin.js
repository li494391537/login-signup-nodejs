var signin = require('../database/dbSignin');
var express = require('express');
var router = express.Router();

router.get('/', (req, res, next) => {
    res.render('signin');
});

router.post('/', (req, res, next) => {
    var sqlparams = [req.body.username, req.body.password];

    signin(sqlparams, (result) => {
        if (result) {
            res.cookie('username', result.username, {
                maxAge: 24 * 60 * 60 * 1000
            });
            res.cookie('uid', result.uid, {
                maxAge: 24 * 60 * 60 * 1000
            });
            res.cookie('session_id', result.session_id, {
                maxAge: 24 * 60 * 60 * 1000
            });
            res.redirect('/');
        } else {
            res.clearCookie('uid');
            res.clearCookie('username');
            res.clearCookie('session_id');
            res.render('error', {
                'message': '用户名或密码错误！',
                'error': {
                    'stack': 'undefined',
                    'status': 'undefined'
                }
            });
        };
    });
});

module.exports = router;