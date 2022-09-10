const jwt = require('jsonwebtoken')
const { PublicKey } = require('../app/config')
const errorType = require('../constants/error-type')

const verifyToken = async (ctx, next) => {
  const { authorization } = ctx.request.headers
  // console.log('authorization', authorization)

  // 这里可能没有传token所以要用可选链条
  const token = authorization?.replace('Bearer ', '')


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
    // console.log(result)
    // 把通过解析的token返回给下一个中间件
    console.log('result',result)
    ctx.userInfo = result

    await next()
  } catch (err) {
    console.log(err)
    const error = new Error(errorType.TOKEN_ERROR)
    return ctx.app.emit('error', error, ctx)
  }
}

module.exports = {
  verifyToken,
}
