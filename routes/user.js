var express = require('express')
var router = express.Router()

router.get('/', (req, res, next) => {
    if (req.cookies.session_id) {
        res.render('user', {
            title: req.cookies.username,
            session_id: req.cookies.session_id
        })
    } else {
        next('route')
    }
})

router.get('/:uid', (req, res, next) => {
    if (req.cookies.session_id) {
        res.render('user', {
            title: req.cookies.username,
            session_id: req.cookies.session_id
        });
    } else {
        next('route')
    }
})

module.exports = router