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

const uploadRouter = new Router({ prefix: '/upload' })

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

// 流文件发送给前端
uploadRouter.get('/getFile', async (ctx, next) => {
  ctx.response.set('content-type', 'application/zip')
  ctx.body = fs.createReadStream(`c:/Users/csh/Desktop/evil-hub/uploads/file/e636daadb56f44a795916bf8923618dc.zip`)
  // ctx.body = {
  // 以同步的方式读的文件需要前端做特殊的处理才能拿到
  //   data: fs.readFileSync('c:/Users/csh/Desktop/evil-hub/uploads/file/e93e1e83d6aa4fdbbaa3bfa532c4bbca.zip'),
  //   message: '成功',
  // }
})

const storage_multiple_files = Multer.diskStorage({
  destination: './uploads/files',
  filename(req, file, cb) {
    // console.log('file', file)
    const fileExt = file.originalname.slice(file.originalname.lastIndexOf('.'))
    const fullPath = uuid.v4().replaceAll('-', '') + fileExt
    cb(null, fullPath)
  },
})

const filesUpload = Multer({
  storage: storage_multiple_files,
})

const filesHandler = filesUpload.fields([{ name: 'files' }])


// insert into userInfo(name,password) values('ddf','8979'),('fsd','343'),('sf','45');
uploadRouter.post('/upFiles', filesHandler, (ctx, next) => {
  console.log(ctx.req.files.files )
  ctx.body = {
    status: 200,
    message: '成功',
  }
})

module.exports = uploadRouter
