require('./router/index')

const app = require('./app')

// 启动数据库连接
require('./app/database')

const config = require('./app/config')
console.log(config.BASE_URL,999)
app.listen(config.APP_PORT, () => {
  console.log('服务器启动成功')
})
