var express = require('express');
var router = express.Router();

router.get('/', (req, res, next) => {
  res.render('signup');
});

router.post('/', (req, res, next) => {
  var username = req.body.username;
  var password = req.body.password;
  var email = req.body.email;
})

module.exports = router;