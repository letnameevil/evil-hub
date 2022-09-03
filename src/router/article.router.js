const Router = require('koa-router')
const { create, del } = require('../controller/article.controller')
const { pubArticle, delArticle,getList } = require('../middleware/article.middleware')
const { verifyToken } = require('../middleware/auth.token')

const articleRouter = new Router({ prefix: '/article' })

articleRouter.post('/publicArticle', verifyToken, pubArticle, create)

articleRouter.get('/delArticle', delArticle, del)

articleRouter.get('/getArticleList',getList)

module.exports = articleRouter
