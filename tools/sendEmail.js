var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport')


var mailTransport = nodemailer.createTransport(smtpTransport({
    host: 'smtp.126.com',
    port: '465',
    secure: 'true',
    auth: {
        user: 'signinsignup@126.com',
        pass: 'signin126'
    }
}))

var mailOptions = {
    from: 'Signin Signup <signinsignup@126.com>',
    to: '494391537@qq.com',
    subject: '操作系统作业',
    text: '老师请查收附件',
    html: '<p>老师请查收附件</p>'
}
mailTransport.sendMail(mailOptions, function (err, msg) {
    if (err) {
        console.log(err);
    } else {
        console.log(msg);
    }
})