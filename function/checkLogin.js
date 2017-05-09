module.exports = function checkLogin(req, res, next) {
    if (req.method === 'POST') {
        if (req.session.isLogin) {
            next('route')
        } else {
            req.session.isLogin = false
            req.checkBanIP()
            res.redirect('/signin');
        }
    } else if (req.method === 'GET') {
        if (req.session.isLogin) {
            next('route')
        } else {
            req.session.isLogin = false
            res.redirect('/signin');
        }
    } else {
        next('route')
    }
}