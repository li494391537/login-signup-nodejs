var existsUser = require('../database/dbExistsUser')
var userInfo = require('../database/dbUserInfo')
var authority = require('../database/dbAuthority')
var express = require('express')
var router = express.Router()

router.get('/', (req, res, next) => {
    res.send('None')
})

router.get('/:uid', (req, res, next) => {
    existsUser([req.params.uid], (result) => {
        if (result) {
            userInfo([req.params.uid], (result) => {
                res.send(JSON.stringify(result))
            })
        } else {
            next('route')
        }
    })
})

router.post('/:uid', (req, res, next) => {
    existsUser([req.params.uid], (result) => {
        if (result) {
            authority.ModifyAuth([req.params.uid], (result) => {
                res.redirect('/admin/' + req.params.uid)
            })
        }
    })
})

module.exports = router