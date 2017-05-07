var mysql = require('../database/dbSignin');
var express = require('express');
var router = express.Router();

router.get('/', (req, res, next) => {
    res.render('signin');
});

router.post('/', (req, res, next) => {
    var sqlparams = [req.body.username, req.body.password];
    mysql.signin(sqlparams, (result) => {
        if (result) {
            res.cookie('username', result.username);
            res.cookie('uid', result.uid);
            res.redirect('/user/' + result.uid);
        } else {
            res.send('用户名或密码错误');
        };
    });
});

module.exports = router;