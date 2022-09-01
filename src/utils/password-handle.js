const crypto = require('crypto')

const md5password = (pwd) => {
  if(typeof pwd === 'number') pwd = String(pwd)
  const md5 = crypto.createHash('md5')
  const pwdRet = md5.update(pwd).digest('hex')
  return pwdRet
}

module.exports = md5password
