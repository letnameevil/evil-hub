const Router = require('koa-router')
const Multer = require('koa-multer')
const { create } = require('../controller/file.controller')
// 文件上传中间件
const { handlerAvatar } = require('../middleware/file.middleware')

// 鉴权
const { verifyToken } = require('../middleware/auth.token')

const avatarUpload = Multer({
  dest: './uploads/avatar', // 保存的文件的目录
  // 解决中文乱码问题
  // fileFilter(req, file, callback) {
  //   console.log(file.originalname.toString('utf-8'))
  //   // file.originalname = Buffer.from(file.originalname, 'latin1').toString('utf8')
  //   callback(null, true)
  // },
})

// single 代表单张图片， 后面的参数代表图片上传时的字段名
const avatarHandler = avatarUpload.single('avatar')

const uploadRouter = new Router({ prefix: '/upload' })

uploadRouter.post('/upAvatar', verifyToken, avatarHandler, handlerAvatar, create)

module.exports = uploadRouter
