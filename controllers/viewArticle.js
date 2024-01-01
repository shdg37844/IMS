const viewArticleModel = require('./../models/articles.js');
const viewClassifyModel = require('../models/classify');
const ViewClassify = new viewClassifyModel();
const ViewArticle = new viewArticleModel();

const viewArticleController = {
    showHomepage: async function (req, res, next) {
        try {
            const articles = await ViewArticle.all();
            const classify = await ViewClassify.all();
            res.render('homepage.tpl', { articles: articles, classify: classify });
        }
        catch (e) {
            res.locals.error = e;
            res.render('error', res.locals)
        }
    },
    showCategory: async function (req, res, next) {
        try {
            const classify = await ViewClassify.all();
            const category = req.query.category;
            const articles = await ViewArticle.select({ category: category });
            res.render('categories.tpl', { articles: articles, classify: classify });
        }
        catch (e) {
            res.locals.error = e;
            res.render('error', res.locals)
        }
    },
    showContent: async function (req, res, next) {
        try {
            const classify = await ViewClassify.all();
            const id = req.params.id;
            const content = await ViewArticle.select({ id: id });
            res.render('content.tpl', { classify: classify, content: content[0] });
    }
        catch(e) {
        res.locals.error = e;
        res.render('error', res.locals)
    }
},
}

module.exports = viewArticleController;