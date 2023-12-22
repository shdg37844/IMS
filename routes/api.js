var express = require('express');
var router = express.Router();
var authController = require('./../controllers/auth.js');
var userController = require('./../controllers/user.js');
var classifyController = require('./../controllers/classify.js');
var articleController = require('./../controllers/article.js');

//登录页api
router.post('/login', authController.login);

//用户管理api
router.post('/user', userController.insert);
router.put('/user/:id', userController)
router.delete('/user/:id', userController)

//分类管理api
router.post('/classify', classifyController.insert);
router.put('/classify/:id', classifyController)
router.delete('/classify/:id', classifyController)

//文章管理api
router.post('/article', articleController.insert);
router.put('/article/:id', articleController)
router.delete('/article/:id', articleController)


module.exports = router;