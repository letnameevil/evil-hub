const errorType = require('../constants/params-error.type')

const paramsErrorHandler = (error, ctx) => {
  let status, message

  switch (error.message) {
    case errorType.PARAMS_IS_REQUIRED:
      status = 400
      message = '有必填项参数没有传入'
      break
    default:
      status = 400
      message = '参数错误'
  }

  ctx.body = {
    status,
    message,
  }
}

module.exports = paramsErrorHandler
