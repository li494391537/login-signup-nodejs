var express = require('express')

var router = express.Router()

router.use((req, res, next) => {
    if (req.session.isLogin) {
        next('route')
    } else {
        res.redirect('/signin')
    }
})

router.use('/:id', (req, res, next) => {
    if (req.params.id == 1) {
        if (req.session.role & 1) {
            next('route')
        } else {
            res.render('error', {
                message: '没有权限',
                error: {
                    stack: '',
                    status: '403'
                }
            })
        }
    } else if (req.params.id == 2) {
        if (req.session.role & 2) {
            next('route')
        } else {
            res.render('error', {
                message: '没有权限',
                error: {
                    stack: '',
                    status: '403'
                }
            })
        }
    } else if (req.params.id == 3) {
        if (req.session.role & 4) {
            next('route')
        } else {
            res.render('error', {
                message: '没有权限',
                error: {
                    stack: '',
                    status: '403'
                }
            })
        }
    } else if (req.params.id == 4) {
        if (req.session.role & 8) {
            next('route')
        } else {
            res.render('error', {
                message: '没有权限',
                error: {
                    stack: '',
                    status: '403'
                }
            })
        }
    } else {
        res.render('error', {
            message: 'Not Found',
            error: {
                stack: '',
                status: '404'
            }
        })
    }
})

router.get('/:id', (req, res, next) => {
    res.render('power', {
        'power': req.params.id,
        userInfo: {
            username: req.session.username
        }
    })
})

module.exports = router