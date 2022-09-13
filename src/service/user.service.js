const connection = require('../app/database')
const uuid = require('uuid')

// 逻辑处理
class UserService {
  async create(user) {
    // 获取用户请求传递的参数
    const { name, password, roles = JSON.stringify(['user']) } = user

    const statement = `INSERT INTO users (userId,name,password,roles) VALUES (?,?,?,?)`

    try {
      // 这里需要给没个用户生成一个唯一的userId
      const result = await connection.execute(statement, [uuid.v4().replaceAll('-', ''), name, password, roles])
      return {
        status: 200,
        message: '创建用户成功',
      }
    } catch (err) {
      console.log('err', err.sqlMessage)
      return {
        status: 400,
        message: err.sqlMessage,
      }
    }
  }

  // 验证用户是否注册过
  async verifyUserIsOrNotExist(name) {
    const statement = `SELECT * FROM users WHERE name = (?)`
    const result = await connection.execute(statement, [name])
    if (result[0].length === 0) return true
    else return false
  }

  // 获取用户表中的所有的数据
  async getUserLists() {
    const statement = `SELECT * FROM users`
    const result = await connection.execute(statement)
    return result[0]
  }
}

module.exports = new UserService()
