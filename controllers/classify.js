const classifyModel = require('../models/classify');
const Classify = new classifyModel();

const classifyController = {
    getAllClassify: async function (req, res, next) {
        try {
            const classify = await Classify.all();
            res.json({ code: 200, data: classify });
        }
        catch (e) {
            res.json({ error: e.message });
        }
    },
    getSomeClassify: async function (req, res, next) {
        let id = req.params.id;

        if (!id) {
            res.json({ code: 0, data: '找不到分类' });
            return
        }

        try {
            const classify = await Classify.select({ id: id });
            res.json({ code: 200, data: classify });
        }
        catch (e) {
            res.json({ error: e.message });
        }
    },
    insert: async function (req, res, next) {
        let name = req.body.name;

        if (!name) {
            res.json({ code: 0, data: 'params empty!' });
            return
        }

        try {
            const classify = await Classify.insert({ name });
            res.json({ code: 200, data: classify })
        } catch (e) {
            res.json({ code: 0, data: e })
        }
    },
    edit: async function (req, res, next) {
        let id = req.params.id;
        let name = req.body.name;

        if (!id || !name) {
            res.json({ code: 0, data: 'params empty' });
            return
        }

        try {
            const updatNum = await Classify.update(id, { name });
            const classify = await Classify.select({ id });
            res.json({ code: 200, data: classify })
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
            const classify = await Classify.delete(id);
            res.json({ code: 200, data: classify })
        } catch (e) {
            res.json({ code: 0, data: e })
        }
    }
}

module.exports = classifyController;