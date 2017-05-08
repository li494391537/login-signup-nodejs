var express = require('express')
var router = express.Router()

router.getPool = function (pool) {
    this.pool = pool;
}

router.get('/', (req, res, next) => {
    if (req.cookies.session_id) {
        res.render('user', {
            title: req.cookies.username,
            session_id: req.cookies.session_id
        })
    } else {
        res.redirect('/signin');
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