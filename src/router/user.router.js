const Router = require('koa-router')
const { create,getUserListController } = require('../controller/user.controller')
const { verifyUser, handlePassword,handGetUserList } = require('../middleware/user.middleware')
const userRouter = new Router({ prefix: '/user' }) // prefix：路由的前缀

// 用户注册
userRouter.post('/register', verifyUser, handlePassword, create)

// 用户列表
userRouter.get('/getUserList', handGetUserList, getUserListController)

module.exports = userRouter
