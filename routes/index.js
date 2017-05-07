var express = require('express')
var router = express.Router()

router.get('/', function (req, res, next) {
    if (req.cookies.username) {
        res.render('index', {
            title: req.cookies.username
        })
    } else {
        res.render('index', {
            title: 'Express'
        })
    }
})

module.exports = router