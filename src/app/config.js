const fs = require('fs')
const path = require('path')
const dotenv = require('dotenv')

dotenv.config()

const PrivateKey = fs.readFileSync(path.resolve(__dirname,'./keys/private.key'))
const PublicKey = fs.readFileSync(path.resolve(__dirname,'./keys/public.key'))

// console.log('process.env.APP_PORT',process.env.APP_PORT)


module.exports = { APP_PORT, MYSQL_HOST, MYSQL_PORT, MYSQL_DATABASE, MYSQL_ROOT, MYSQL_PASSWORD } = process.env
module.exports.PrivateKey = PrivateKey
module.exports.PublicKey = PublicKey
