const service = require('../service/user.service')
const dayjs = require('dayjs')

class UserController {
  // 操作数据库需要异步操作 要加async
  async create(ctx, next) {
    const result = await service.create(ctx.request.body)

    ctx.body = result
  }

  async getUserListController(ctx, next) {
    const records = []

    ctx.userList.forEach((item) => {
      records.push({
        name: item.name,
        nickName: item.nickName,
        roles: JSON.parse(item.roles),
        createAt: dayjs(item.createAt).format('YY-MM-DD hh:mm:ss'),
      })
    })

    ctx.body = {
      status: 200,
      message: '获取用户列表成功',
      records,
    }
    next()
  }
}

module.exports = new UserController()
