const service = require('../service/user.service')

class UserController {
  // 操作数据库需要异步操作 要加async
  async create(ctx, next) {
    
    const result = await service.create(ctx.request.body)

    ctx.body = result
  }
}

module.exports = new UserController()
