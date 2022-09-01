const jwt = require('jsonwebtoken')
const { PublicKey } = require('../app/config')
const errorType = require('../constants/error-type')

const verifyToken = async (ctx, next) => {
  const { authorization } = ctx.request.headers

  const token = authorization.replace('Bearer ', '')

  // 验证token
  try {
    const result = jwt.verify(token, PublicKey, {
      algorithms: 'RS256',
    })
    // 这里如果解密成功的话， 拿到的就是
    /* 
      {
          userId: '8dd203be17234521a246c329e03e52b0',
          name: 'user_2',
          iat: 1662018693,
          exp: 1662105093
      }
    */
    console.log(result)
    await next()
  } catch (err) {
    const error = new Error(errorType.TOKEN_ERROR)
    // console.log(err.message)
    return ctx.app.emit('error', error, ctx)
  }
}



module.exports = {
  verifyToken,
}
