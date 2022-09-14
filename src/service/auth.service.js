const connection = require('../app/database')

class AuthService {
  // 验证数据库中是否有该用户
  async verifyUserIsOrNotExist(name) {
    const statement = `SELECT * FROM users WHERE name = (?)`
    try {
      const result = await connection.execute(statement, [name])
      if (result[0].length === 0) return true
      else return false
    } catch {
      console.log('部分语法错误')
    }
  }

  // 验证数据库中的用户名和密码是否一致
  async verifyUserAndPwd(name, password) {
    const statement = `SELECT * FROM users WHERE name = ? AND password = ?`
    const result = await connection.execute(statement, [name, password])
    console.log('result', result[0][0])
    if (result[0].length === 0) return false
    return {
      userId: result[0][0].userId,
      name: result[0][0].name,
      nickName: result[0][0].nickName,
      roles: JSON.parse(result[0][0].roles),
    }
  }
}

module.exports = new AuthService()
