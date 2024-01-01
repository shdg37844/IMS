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
    getSomeUsers: async function (req, res, next) {
        let id = req.params.id;

        if (!id) {
            res.json({ code: 0, data: '找不到用户' });
            return
        }

        try {
            const user = await User.select({ id: id });
            res.json({ code: 200, data: user });
        }
        catch (e) {
            res.json({ error: e.message });
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
            const insertId = await User.insert({ phone, password });  //insert返回的是新增对象的id，而不是完整内容
            res.json({ code: 200, data: insertId })
        } catch (e) {
            res.json({ code: 0, message: e.message })
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
            const updatNum = await User.update(id, { phone, password });
            const users = await User.select({id});
            res.json({ code: 200, data: users })
        } catch (e) {
            res.json({ code: 0, message: e.message });
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

