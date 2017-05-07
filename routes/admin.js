var express = require('express');
var router = express.Router();

router.get('/', (req, res, next) => {
  if (req.cookies.isVisit) {
    res.send("再次欢迎访问");
  } else {
    res.cookie('isVisit', 1);
    res.send("欢迎第一次访问");
  }
});


router.get('/test', function (req, res, next) {
  if (req.cookies.username) {
    res.render('index', {
      title: 'test'
    });
  } else {
    res.render('index', {
      title: 'test'
    });
  };
});

module.exports = router;