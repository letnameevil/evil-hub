const mysql = require('mysql2')

const { MYSQL_HOST, MYSQL_PORT, MYSQL_DATABASE, MYSQL_ROOT, MYSQL_PASSWORD } = require('../app/config')

const connections = mysql.createPool({
  host: MYSQL_HOST,
  port: MYSQL_PORT,
  database: MYSQL_DATABASE,
  user: MYSQL_ROOT,
  password: MYSQL_PASSWORD,
})

// 连接数据库
connections.getConnection((err, conn) => {
  conn.connect((err) => {
    if (err) {
      console.log('err', err)
    } else {
      console.log('数据库连接成功')
    }
  })
})

// console.log(connections.promise())
module.exports = connections.promise()
