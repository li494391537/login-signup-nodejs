var express = require('express')

var router = express.Router()

router((req, res, next) => {
    if (req.session.isLogin) {
        next('route')
    } else {
        res.redirect('/', )
    }
})


router.use('/1', (req, res, next) => {
    if (req.session.role) {
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

router.use('/2', (req, res, next) => {
    if (req.session.role) {
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
    if (req.session.role) {
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
    if (req.session.role) {
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

routee.get('/1', ((req, res, next) => {
    res.render('power', {
        'power': 1
    })
}))