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
    }
}

module.exports = articleController;