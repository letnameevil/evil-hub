const Router = require('koa-router')
const { create } = require('../controller/user.controller')
const { verifyUser,handlePassword } = require('../middleware/user.middleware')
const userRouter = new Router({ prefix: '/user' }) // prefix：路由的前缀

userRouter.post('/register', verifyUser, handlePassword, create)

module.exports = userRouter
