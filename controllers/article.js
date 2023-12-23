const articleModel = require('./../models/users.js');
const Article = new articleModel();

const articleController = {
    getAllArticles: async function (req, res, next) {
        try {
            const articles = await Article.all();
            res.json({ code: 200, data: articles });
        }
        catch (e) {
            res.json({ error: e.message });
        }
    },
    getSomeArticle: async function (req, res, next) {
        let id = req.params.id;

        if (!id) {
            res.json({ code: 0, data: '找不到文章' });
            return
        }

        try {
            const articles = await Article.select(id);
            res.json({ code: 200, data: articles });
        }
        catch (e) {
            res.json({ error: e.message });
        }
    },
    insert: async function (req, res, next) {
        let title = req.body.title;
        let content = req.body.content;
        let category = req.body.category;

        if (!title || !content || !category) {
            res.json({ code: 0, data: 'params empty!' });
            return
        }

        try {
            const articles = await Article.insert({ title, content, category });
            res.json({ code: 200, data: articles })
        } catch (e) {
            res.json({ code: 0, data: e })
        }
    },
    edit: async function (req, res, next) {
        let id = req.params.id;
        let title = req.body.title;
        let content = req.body.content;
        let category = req.body.category;

        if (!id || !title || !content || !category) {
            res.json({ code: 0, data: 'params empty' });
            return
        }

        try {
            const articles = await Article.update(id, { title, content, category });
            res.json({ code: 200, data: articles })
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
            const articles = await Article.delete({ id });
            res.json({ code: 200, data: articles })
        } catch (e) {
            res.json({ code: 0, data: e })
        }
    }
}

module.exports = articleController;