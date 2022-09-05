const path = require('path')
const Koa = require('koa')
const cors = require('koa2-cors')
const static = require('koa-static')
const koaMount = require('koa-mount')
const bodyParser = require('koa-bodyparser')
const errorHandler = require('./error-handle')
const paramsErrorHandler = require('./params-error-handle')
// const userRouter = require('../router/user.router')
// const autoRouter = require('../router/auth.router')
// 遍历使用所有路由
const routeIndex = require('../router/index')
const app = new Koa()


// 跨域处理
app.use(cors())
// 开启静态资源服务器:koa-static不能配置虚拟请求路径， 需要借助koa-mount来解决
app.use(koaMount('/uploads',static(path.join(__dirname,'../../uploads'))))


// 解析post请求的body体
app.use(bodyParser())



// app.use(userRouter.routes())
// app.use(userRouter.allowedMethods()) // 使用这个请求方法不对时会有提示method not allowed
// app.use(autoRouter.routes())
// app.use(autoRouter.allowedMethods())
routeIndex(app) // 这个方法就是上面的函数封装

// 错误处理
app.on('error', errorHandler)

// 参数错误
app.on('params-error',paramsErrorHandler)

module.exports = app
