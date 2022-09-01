const errorType = require('../constants/error-type')
const service = require('../service/auth.service')
const md5password = require('../utils/password-handle')

const verifyLogin = async (ctx, next) => {
  // 判断用户名密码是否为空
  const { name, password } = ctx.request.body
  if (!name || !password) {
    const error = new Error(errorType.NAME_OR_PASSWORD_REQUIRED)
    return ctx.app.emit('error', error, ctx)
  }

  // 判断用户是否存在(需要在数据库中查询)
  const isExist = await service.verifyUserIsOrNotExist(name)
  // isExist为true 代表该表中没有该用户，不能往下走
  if (isExist) {
    const error = new Error(errorType.USER_IS_NOT_EXISTS)
    return ctx.app.emit('error', error, ctx)
  }

  // 判断密码和数据库中的密码是否一致(密码为加密后的)
  try {
    const isExist = await service.verifyUserAndPwd(name, md5password(password))
    if (isExist) {
      ctx.user = isExist
      return await next()
    }

    const error = new Error(errorType.USER_PASSWORD_NOT_MATCH)
    return ctx.app.emit('error', error, ctx)
  } catch (err) {
    console.log(err)
  }
}


module.exports = {
  verifyLogin,
}
