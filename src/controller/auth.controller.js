const jwt = require('jsonwebtoken')
const { PrivateKey } = require('../app/config')

class AuthController {
  // 操作数据库需要异步操作 要加async
  async create(ctx, next) {
    const { userId, name, roles } = ctx.user

    const token =
      'Bearer ' +
      jwt.sign({ userId, name }, PrivateKey, {
        expiresIn: 60 * 60 * 24, // 单位是s
        algorithm: 'RS256',
      })

    ctx.body = {
      status: 200,
      message: 'success',
      userId,
      name,
      roles,
      token,
    }
  }
}

module.exports = new AuthController()
