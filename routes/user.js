var express = require('express');
var router = express.Router();

router.get('/', (req, res, next) => {
    if (req.cookies.uid && req.cookies.username) {
        res.render('user', {
            title: req.cookies.username
        });
    }
});

router.get('/:uid', (req, res, next) => {
    if (req.cookies.uid && req.cookies.username && req.params.uid == req.cookies.uid) {
        res.render('user', {
            title: req.cookies.username
        });
    }
});

module.exports = router;