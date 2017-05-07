var mysql = require('../database/mysql');

var crypto = require('crypto');
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
            /////////////////
            var content = 'password';//加密的明文；
            var md5 = crypto.createHash('md5');//定义加密方式:md5不可逆,此处的md5可以换成任意hash加密的方法名称；
            md5.update(content);
            var d = md5.digest('hex');  //加密后的值d
            console.log("加密的结果：" + d);

            /////////////////////
            sqlparams = [username, password, email, 'regtime'];
            mysql.signup(sqlparams, (result) => {
                if (result.length == 0) {
                    res.send('用户名已被注册');
                } else {
                    res.redirect("../views/signin.html");
                };
            });
        };
    });
})

module.exports = router;