var express = require('express');
var router = express.Router();
var userController = require('./../controllers/user.js');
var classifyController = require('./../controllers/classify.js');
var articleController = require('./../controllers/article.js');
var authController = require('./../controllers/auth.js');
var qiniuController = require('./../controllers/qiniu.js');
var viewArticleController = require('./../controllers/viewArticle.js');

//用户管理api
router.get('/user', userController.getAllUsers);
router.get('/logout', authController.logout);

//分类管理api
router.get('/classify', classifyController.getAllClassify);

//文章管理api
router.get('/article', articleController.getAllArticles);
router.get('/article/:id', articleController.getSomeArticle);

router.get('/qiniu-uploadtoken', qiniuController.uploadToken);


//前台页面
router.get('/homepage', viewArticleController.showHomepage);
router.get('/articles', viewArticleController.showCategory);

module.exports = router;
