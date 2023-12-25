const userModel = require('./../models/users.js');
const User = new userModel();

const userController = {
    getAllUsers: async function (req, res, next) {
        try {
            const users = await User.all();
            res.json({ code: 200, data: users });
        }
        catch (e) {
            res.status(500).json({ error: e.message });
        }
    },
    insert: async function (req, res, next) {
        let phone = req.body.phone;
        let password = req.body.password;

        if (!phone || !password) {
            res.json({ code: 0, data: 'params empty!' });
            return
        }

        try {
            const users = await User.insert({ phone, password });
            res.json({ code: 200, data: users })
        } catch (e) {
            res.json({ code: 0, data: e })
        }
    },
    edit: async function (req, res, next) {
        let id = req.params.id;
        let phone = req.body.phone;
        let password = req.body.password;

        if (!id || !phone || !password) {
            res.json({ code: 0, data: '手机号码或者密码不能为空' });
            return
        }

        try {
            const users = await User.update(id, { phone, password });
            res.json({ code: 200, data: users })
        } catch (e) {
            res.json({ code: 0, data: e })
        }
    },
    delete: async function (req, res, next) {
        let id = req.params.id;

        if (!id) {
            res.json({ code: 0, data: 'params empty!' });
            return
        }

        try {
            const users = await User.delete(id);
            res.json({ code: 200, data: users })
        } catch (e) {
            res.json({ code: 0, data: e })
        }
    }

}

module.exports = userController;

