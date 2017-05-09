var express = require('express')
var path = require('path')
var favicon = require('serve-favicon')
var logger = require('morgan')
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
var session = require('express-session')
var mysql = require('mysql')
var fs = require('fs')
var fileStreamRotator = require('file-stream-rotator')
var crypto = require('crypto')

var index = require('./admin_routes/index')
var signin = require('./admin_routes/signin')
var signout = require('./admin_routes/signout')
var admin = require('./admin_routes/admin')

var app = express()

var banIP = new Array();

var pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    database: 'test',
    port: '3306'
})

// view engine setup
app.engine('.html', require('ejs').__express)
app.set('views', path.join(__dirname, 'admin_views'))
app.set('view engine', 'html')

// uncomment after placing your favicon in /public
var logDir = path.join(__dirname, 'admin_logs')
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir)
}
var accessLogStream = fileStreamRotator.getStream({
    date_format: 'YYYYMMDD',
    filename: path.join(logDir, 'log-%DATE%.log'),
    frequency: 'daily',
    verbose: true
})

app.use((req, res, next) => {
    if (banIP[req.ip.toString] &&
        banIP[req.ip.toString].logNum > 4) {
        if ((new Date()).getDate() - banIP[req.ip.toString].logTime < 1000 * 60 * 60 * 6) {
            res.render('error', {
                'message': 'IP失败次数过多！',
                'error': {
                    'stack': '',
                    'status': '403'
                }
            })
        }
    } else {
        next()
    }
})

app.use((req, res, next) => {
    req.banIP = banIP
    req.pool = pool
    req.checkBanIP = function () {
        if (req.banIP[req.ip.toString] &&
            (new Date()).getTime() - req.banIP[req.ip.toString].logTime < 1000 * 60 * 5) {
            req.banIP[req.ip.toString].logNum += 1
            req.banIP[req.ip.toString].logTime = (new Date()).getTime()
        } else {
            req.banIP[req.ip.toString] = {
                'logNum': 1,
                'logTime': (new Date()).getTime()
            }
        }
    }
    next()
})

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(logger('dev'))
app.use(logger('common', {
    stream: accessLogStream
}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: false
}))

app.use(session({
    'secret': crypto.randomBytes(64).toString('hex'),
    'cookie': {
        maxAge: 24 * 60 * 60 * 1000
    },
    'resave': false,
    'saveUninitialized': false
}));
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/signin', signin)
app.use('/admin', admin)
app.use('/signout', signout)
app.use('/', index)

// catch 404 and forward to error handler
app.use((req, res, next) => {
    var err = new Error('Not Found')
    err.status = 404
    next(err)
})

// error handler
app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {}

    // render the error page
    res.status(err.status || 500)
    res.render('error')
})

module.exports = app