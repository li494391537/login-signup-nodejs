var mysql = require('../database/dbSignup');
var express = require('express');

var router = express.Router();

router.get('/', (req, res, next) => {
    res.render('signup');
});

router.post('/', (req, res, next) => {
    var username = req.body.username;
    var password = req.body.password;
    var email = req.body.email;

    var sqlparams = username;
    mysql.existsUser(sqlparams, (result) => {
        if (result > 0) {
            res.send('用户名已被注册');
        } else {
            sqlparams = [username, password, email, 'regtime'];
            mysql.signup(sqlparams, (result) => {
                if (result.length == 0) {
                    res.send('用户名已被注册');
                } else {
                    res.redirect("/signin");
                };
            });
        };
    });
})

module.exports = router;