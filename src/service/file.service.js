const connection = require('../app/database')

class FileService {
  async upLoadAvatar(...info) {
    // const statement = `
    // INSERT INTO avatars (userId,fileName,size,mimeType,avatarUrl) VALUES (?,?,?,?,?);
    // `

    // const result = await connection.execute(statement, info)
    // console.log(result)
    return true
  }
}

module.exports = new FileService()
