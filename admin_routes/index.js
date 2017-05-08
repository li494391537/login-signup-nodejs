var existsUser = require('../admin_database/dbExistsUser')
var userInfo = require('../admin_database/dbUserInfo')
var express = require('express')
var router = express.Router()

router.getPool = function (pool) {
    this.pool = pool;
}

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