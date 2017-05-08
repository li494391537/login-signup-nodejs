var express = require('express')

var router = express.Router()

router.use((req, res, next) => {
    if (req.session.isLogin) {
        next('route')
    } else {
        res.redirect('/signin', )
    }
})

router.use('/1', (req, res, next) => {
    if (req.session.role & 1) {
        next('route')
    } else {
        res.render('error', {
            message: 'IP失败次数过多！',
            error: {
                stack: '',
                status: '403'
            }
        })
    }
})

router.use('/2', (req, res, next) => {
    if (req.session.role & 2) {
        next('route')
    } else {
        res.render('error', {
            'message': 'IP失败次数过多！',
            'error': {
                'stack': '',
                'status': '403'
            }
        })
    }
})

router.use('/3', (req, res, next) => {
    if (req.session.role & 4) {
        next('route')
    } else {
        res.render('error', {
            'message': 'IP失败次数过多！',
            'error': {
                'stack': '',
                'status': '403'
            }
        })
    }
})

router.use('/4', (req, res, next) => {
    if (req.session.role & 8) {
        next('route')
    } else {
        res.render('error', {
            'message': 'IP失败次数过多！',
            'error': {
                'stack': '',
                'status': '403'
            }
        })
    }
})

router.get('/1', (req, res, next) => {
    res.render('power', {
        'power': 1
    })
})

router.get('/2', (req, res, next) => {
    res.render('power', {
        'power': 2
    })
})

router.get('/3', (req, res, next) => {
    res.render('power', {
        'power': 3
    })
})

router.get('/4', (req, res, next) => {
    res.render('power', {
        'power': 4
    })
})