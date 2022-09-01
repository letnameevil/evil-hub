const service = require('../service/user.service')

const errorType = require('../constants/error-type')

const md5password = require('../utils/password-handle')

const verifyUser = async (ctx, next) => {
  // console.log('ctx.body', ctx.request.body)

  const { name, password } = ctx.request.body

  // console.log('name', name)

  if (!name || !password) {
    // ctx.body = '字段name不能为空'
    const error = new Error(errorType.NAME_OR_PASSWORD_REQUIRED)

    return ctx.app.emit('error', error, ctx)
  }

  // 查询表中是否具有同名的name字段
  const isExist = await service.verifyUserIsOrNotExist(name)
  // isExist为true 代表 表中之前不存在
  if (!isExist) {
    const error = new Error(errorType.USER_IS_EXISTS)
    return ctx.app.emit('error', error, ctx)
  }

  console.log('password', password)

  await next()
}

// 加密密码中间件
const handlePassword = async (ctx, next) => {
  // 解构之后的简单数据类型相当于是重新赋值了（这里并不能做到改变原对象中的对应属性）
  const { password } = ctx.request.body
  ctx.request.body.password = md5password(password)
  await next()
}

module.exports = {
  verifyUser,
  handlePassword,
}
