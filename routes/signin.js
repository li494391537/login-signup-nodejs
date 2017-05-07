var mysql = require('../database/mysql');
var express = require('express');
var router = express.Router();

router.get('/', (req, res, next) => {
  res.render('signin');
});

router.post('/', (req, res, next) => {
  var sqlparams = [req.body.username, req.body.password];
  mysql.signin(sqlparams, (result) => {
    if (result.length == 0) {
      res.send('用户名或密码错误');
    } else {
      res.cookie('username', result[0].username);
      res.cookie('uid', result[0].uid);
      res.redirect('/user/' + result[0].uid);
    };
  });
});

module.exports = router;