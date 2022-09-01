const errorType = require('../constants/error-type')

const errorHandler = (error, ctx) => {
  let status, message

  switch (error.message) {
    case errorType.NAME_OR_PASSWORD_REQUIRED:
      status = 400
      message = '用户名或者密码不能为空~'
      break
    case errorType.USER_IS_EXISTS:
      status = 400
      message = '该用户名已经存在~'
      break
    case errorType.USER_IS_NOT_EXISTS:
      status = 400
      message = '该用户名不存在，请注册~'
      break
    case errorType.USER_PASSWORD_NOT_MATCH:
      status = 400
      message = '用户名密码不匹配，请输入正确的用户名密码~'
      break
    case errorType.TOKEN_ERROR:
      status = 401
      message = 'token无效，请重新登陆'
      break
    default:
      status = 404
      message = 'NOT FOUND'
  }

  ctx.body = {
    status,
    message,
  }
}

module.exports = errorHandler
