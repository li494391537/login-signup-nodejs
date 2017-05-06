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
      res.send('Hello ' + result[0].username + '!');
    };
  });
});

module.exports = router;