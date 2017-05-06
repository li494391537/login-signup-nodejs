var mysql = require('../database/mysql');
var express = require('express');
var router = express.Router();

router.get('/', (req, res, next) => {
  res.render('signin');
});

router.post('/', (req, res, next) => {
  var sqlparams = [req.body.username, req.body.password];
  mysql.login(sqlparams, (result) => {
    console.log(JSON.stringify(result));
    res.send(JSON.stringify(result));
  });
});

module.exports = router;