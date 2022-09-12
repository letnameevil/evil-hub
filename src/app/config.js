const fs = require('fs')
const path = require('path')
const dotenv = require('dotenv')

dotenv.config()

const PrivateKey = fs.readFileSync(path.resolve(__dirname, './keys/private.key'))
const PublicKey = fs.readFileSync(path.resolve(__dirname, './keys/public.key'))

let BASE_URL = 'http://localhost:8888'

if (process.env.NODE_ENV === 'production') {
  BASE_URL = 'http://121.40.238.136:8888'
}

module.exports = { APP_PORT, MYSQL_HOST, MYSQL_PORT, MYSQL_DATABASE, MYSQL_ROOT, MYSQL_PASSWORD } = process.env
module.exports.PrivateKey = PrivateKey
module.exports.PublicKey = PublicKey
module.exports.BASE_URL = BASE_URL
