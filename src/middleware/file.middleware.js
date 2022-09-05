const Service = require('../service/file.service')
const { BASE_URL } = require('../app/config')
const handlerAvatar = async (ctx, next) => {
  // console.log(ctx.request.body) // 拿post 请求中的json body中的内容
  console.log(ctx.req.file, 99999) // 拿FormData格式的文件对象
  // console.log(ctx.req.body) // 拿FormData格式的非文件对象 例如：formData.append('username','letnameevil')
  // console.log('ctx.userInfo',ctx.userInfo)
  const { userId } = ctx.userInfo
  const { originalname, size, mimetype, path, filename } = ctx.req.file

  // 1.拼接服务器地址
  const avatarUrl = `${BASE_URL}/${path}`
  const ret = await Service.upLoadAvatar(userId, originalname, size || null, mimetype || null, avatarUrl || null)
  if (ret) {
    ctx.body = {
      status: 200,
      message: `${BASE_URL}/uploads/avatar/${filename}`,
    }
    // await next()  // 后面的server层不用执行了
  } else {
    // 错误处理(偷个懒)
    ctx.body = {
      status: 400,
      message: '头像上传失败，请联系后端解决问题',
    }
  }
}

const handlerFile = async (ctx, next) => {
  // console.log(ctx.request.body) // 拿post 请求中的json body中的内容
  console.log(ctx.req.file, 99999) // 拿FormData格式的文件对象
  // console.log(ctx.req.body) // 拿FormData格式的非文件对象 例如：formData.append('username','letnameevil')
  // console.log('ctx.userInfo',ctx.userInfo)
  // const { userId } = ctx.userInfo
  // const { originalname, size, mimetype, path } = ctx.req.file

  await next()
}

module.exports = {
  handlerAvatar,
  handlerFile,
}
