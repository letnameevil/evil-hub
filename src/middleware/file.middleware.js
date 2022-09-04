const Service = require('../service/file.service')

const handlerAvatar = async (ctx, next) => {
  // console.log(ctx.request.body) // 拿post 请求中的json body中的内容
  // console.log(ctx.req.file) // 拿FormData格式的文件对象
  // console.log(ctx.req.body) // 拿FormData格式的非文件对象 例如：formData.append('username','letnameevil')
  console.log('ctx.userInfo',ctx.userInfo)
  const {userId} = ctx.userInfo
console.log(ctx.req.file)

/* 
{
  fieldname: 'avatar',
  originalname: 'Snipaste_2022-09-04_22-21-19.png',
  encoding: '7bit',
  mimetype: 'image/png',
  destination: './uploads/avatar',
  filename: 'ee3fdc5f4029c2da40477a7a22b712d2',
  path: 'uploads\\avatar\\ee3fdc5f4029c2da40477a7a22b712d2',
  size: 33256
}

*/

// const  {}

  // Service.upLoadAvatar(userId,originalname,size,mimetype,path)
  // Service.upLoadAvatar()

  await next()
}

module.exports = {
  handlerAvatar,
}
