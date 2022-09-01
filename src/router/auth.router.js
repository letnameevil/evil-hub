const Router = require('koa-router')
const { create } = require('../controller/auth.controller')
const { verifyLogin } = require('../middleware/auth.middleware')
const { verifyToken } = require('../middleware/auth.token')

const authRouter = new Router({ prefix: '/user' }) // prefix：路由的前缀

authRouter.post('/login', verifyLogin, create)
// 测试验证token
authRouter.get('/test', verifyToken, (ctx, next) => {
  ctx.body = '成功'
})


module.exports = authRouter
