const userModel = require('../models/users');
const User = new userModel();
const JWT = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

const authController = {
    login: async function (req, res, next) {
        let phone = req.body.phone;
        let password = req.body.password;

        if (!phone || !password) {
            res.json({ code: 0, data: 'params empty!' });
            return
        }

        try {
            const users = await User.select({ phone, password });
            const user = users[0];
            if (user) {
                let token = JWT.sign({
                    user_id: user.id,
                    phone: user.phone,
                    password: user.password,
                }, JWT_SECRET, { expiresIn: "30d" });
                res.cookie('web_token', token, { maxAge: 30 * 24 * 60 * 60 });
                res.json({ code: 200, message: '登录成功！', data: { token: token } });
            } else {
                res.json({ code: 0, data: { msg: '登录失败，没有此用户！' } })
            }
        } catch (e) {
            res.json({ code: 0, data: e })

        }
    },
    logout:function (req, res, next) {

        res.clearCookie('web_token');

        res.json({ code: 200, message: '退出成功！' }); 
    }
}

module.exports = authController;