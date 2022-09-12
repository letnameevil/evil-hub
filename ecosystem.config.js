module.exports = {
  apps: [
    {
      name: 'app1',
      script: './src/main.js',
      watch: true,
      env_production: {
        NODE_ENV: 'production',
      },
      env_develop: {
        NODE_ENV: 'development',
      },
    },
  ],
}

/* 
env 默认环境变量，只要启动应用：pm2 start ecosystem.config.js(在有ecosystem.config.js这个文件的前提下，可以直接 pm2 start)
env_production 对应调用方式是：pm2 start ecosystem.config.js --env production(在有ecosystem.config.js这个文件的前提下，可以直接 pm2 start --env production)
env_develop 对应调用方式是：pm2 start ecosystem.config.js --env develop(在有ecosystem.config.js这个文件的前提下，可以直接 pm2 start --env develop)
规则是 ：配置文件中定义 env_ 开头的属性，那么就用 --env 参数调用。
*/
