var signup = require('../database/dbSignup');
var existsUser = require('../database/dbExistsUser');
var express = require('express');

var router = express.Router();

router.get('/', (req, res, next) => {
    res.render('signup');
});

router.post('/', (req, res, next) => {
    var username = req.body.username;
    var password = req.body.password;
    var email = req.body.email;

    var sqlparams = [username, email];
    existsUser(sqlparams, (result) => {
        if (result > 0) {
            res.send('用户名或邮箱已被注册');
        } else {
            sqlparams = [username, password, email];
            signup(sqlparams, (result) => {
                res.redirect("/signin");
            });
        };
    });
})

module.exports = router;