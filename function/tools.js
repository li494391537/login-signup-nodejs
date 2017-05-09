var tools = new function () {
    this.checkUserName= function (username) {
        var flag = false
        if (username != "") {
            var reg = /^[a-zA-Z_]+[a-zA-Z0-9_]{3,19}$/
            if (reg.test(username)) {
                flag = true
            }
        }
        if(!flag){
            alert('用户名格式不对')
        }
    }
    this.checkPassWord= function (password) {
        var flag = false;
        if (password != "") {
            var reg = /^[a-zA-Z0-9_+-=,.~!@#$%^&*]{8,16}$/
            if (reg.test(password)) {
                flag = true
            }
        }
        if(!flag){
            alert('新密码格式不对')
        }
    }

    this.checkEmail =function (email) {
        var flag = false
        if (email != "") {
            var reg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]+$/
            if (reg.test(email)) {
                flag = true
            }
        }
        if(!flag){
            alert('邮箱格式不对')
        }       
    }
}

module.exports = tools