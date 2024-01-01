var express = require('express');
var router = express.Router();
var authController = require('./../controllers/auth.js');
var userController = require('./../controllers/user.js');
var classifyController = require('./../controllers/classify.js');
var articleController = require('./../controllers/article.js');
var authController = require('./../controllers/auth.js');


//登录页api
router.post('/login', authController.login);

//用户管理api
router.post('/user', userController.insert);
router.put('/user/:id', userController.edit)
router.delete('/user/:id', userController.delete)

//分类管理api
router.post('/classify', classifyController.insert);
router.put('/classify/:id', classifyController.edit)
router.delete('/classify/:id', classifyController.delete)

//文章管理api
router.get('/article/:id', articleController.getSomeArticle);
router.post('/article', articleController.insert);
router.put('/article/:id', articleController.edit);
router.delete('/article/:id', articleController.delete);


module.exports = router;