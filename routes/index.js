var express = require('express');
var router = express.Router();
var userController = require('./../controllers/user.js');
var classifyController = require('./../controllers/classify.js');
var articleController = require('./../controllers/article.js');
var authController = require('./../controllers/auth.js');

//用户管理api
router.get('/user', userController.getAllUsers);
router.get('/logout', authController.logout);

//分类管理api
router.get('/classify', classifyController.getAllClassify);

//文章管理api
router.get('/article', articleController.getAllArticles);
//router.get('/article?classify_id=1', articleController);
router.get('/article/:id', articleController.getSomeArticle);



module.exports = router;
