module.exports = function checkBanIP(req, res, next) {
    if (req.banIP[req.ip.toString] &&
        req.banIP[req.ip.toString].logNum > 4) {
        if ((new Date()).getDate() - req.banIP[req.ip.toString].logTime < 1000 * 60 * 60 * 6) {
            res.render('error', {
                'message': 'Forbidden',
                'error': {
                    'stack': '',
                    'status': '403'
                }
            })
        }
    } else {
        next()
    }
}