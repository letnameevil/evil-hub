const connection = require('../app/database')

class FileService {
  async upLoadAvatar(...info) {
    console.log(info)
    const statement = `
    INSERT INTO avatars (userId,fileName,size,mimeType,avatarUrl) VALUES (?,?,?,?,?);
    `

    try {
      const result = await connection.execute(statement, info)
      if(result[0].affectedRows === 1) return true
    } catch (err) {
      console.log('err', err)
      return false
    }
  }
}

module.exports = new FileService()
