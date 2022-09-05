const fs = require('fs')
const Router = require('koa-router')
const Multer = require('koa-multer')
const uuid = require('uuid')
const { create } = require('../controller/file.controller')
// 文件上传中间件
const { handlerAvatar, handlerFile } = require('../middleware/file.middleware')

// 鉴权
const { verifyToken } = require('../middleware/auth.token')

// const avatarUpload = Multer({
//   dest: './uploads/avatar', // 保存的文件的目录
//   // 解决中文乱码问题
//   fileFilter(req, file, callback) {
//     // file.originalname = Buffer.from(file.originalname, 'latin1').toString('utf8')
//     callback(null, true)
//   },
// })

const storage = Multer.diskStorage({
  destination: './uploads/avatar',
  filename(req, file, cb) {
    const fileExt = file.originalname.slice(file.originalname.lastIndexOf('.'))
    const fullPath = uuid.v4().replaceAll('-', '') + fileExt
    cb(null, fullPath)
  },
})

const avatarUpload = Multer({
  storage,
})

// single 代表单张图片， 后面的参数代表图片上传时的字段名
const avatarHandler = avatarUpload.single('avatar')

const uploadRouter = new Router({ prefix: '/upload' })

// 上传头像
uploadRouter.post('/upAvatar', verifyToken, avatarHandler, handlerAvatar, create)

const storage_file = Multer.diskStorage({
  destination: './uploads/file',
  filename(req, file, cb) {
    console.log('file', file)
    const fileExt = file.originalname.slice(file.originalname.lastIndexOf('.'))
    const fullPath = uuid.v4().replaceAll('-', '') + fileExt
    cb(null, fullPath)
  },
})

const fileUpload = Multer({
  storage: storage_file,
})

// single 代表单张图片， 后面的参数代表图片上传时的字段名
const fileHandler = fileUpload.single('file')

// 上传其他类型的文件(单个上传)
uploadRouter.post('/upFile', verifyToken, fileHandler, handlerFile, create)

uploadRouter.get('/getFile', async (ctx, next) => {
  ctx.response.set('content-type', 'application/zip')
  ctx.body = fs.createReadStream(`c:/Users/csh/Desktop/evil-hub/uploads/file/e636daadb56f44a795916bf8923618dc.zip`)
  // ctx.body = {
  //   data: fs.readFileSync('c:/Users/csh/Desktop/evil-hub/uploads/file/e93e1e83d6aa4fdbbaa3bfa532c4bbca.zip'),
  //   message: '成功',
  // }
})

module.exports = uploadRouter
