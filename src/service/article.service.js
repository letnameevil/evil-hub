const connection = require('../app/database')
const dayjs = require('dayjs')
class ArticleService {
  // 发表文章
  async pubArticle(...args) {
    const statement = `INSERT INTO articles (publicUserId, articleTitle, content,isDel) VALUES (?,?,?,?);`

    try {
      const result = await connection.execute(statement, [...args, 0])
      return true
    } catch (err) {
      return false
    }
  }

  //  TODO:
  //  删除文章
  async delArticle(articleId) {
    // const formatArticleId = JSON.parse(articleId)
    let statement
    let stateParams

    if (articleId.includes('[')) {
      stateParams = JSON.parse(articleId)
      statement = `UPDATE articles SET isDel = 1 WHERE articleId in (${stateParams.join()});`
    } else {
      stateParams = parseInt(articleId)
      statement = `UPDATE articles SET isDel = 1 WHERE articleId = ${stateParams};`
    }

    try {
      const result = await connection.execute(statement)
      console.log('result', result)
      if (result[0].affectedRows === 0) return false
      return true
    } catch (err) {
      console.log('err', err)
      return false
    }
  }

  // 获取文章(分页处理)
  async getArticleList(pageNumber = 1, pageSize = 10) {
    let total = 0

    const statementCount = `
  SELECT
    COUNT(*)
  FROM
    users
    RIGHT JOIN articles ON users.userId = articles.publicUserId 
  WHERE
    isDel = 0
    `
    try {
      const result = await connection.execute(statementCount)
      const ret = Object.values(result[0][0])[0]
      total = ret
    } catch (err) {
      console.log(err)
    }

    const statement = `SELECT
    articleId,
    publicUserId,
    articleTitle,
    content,
    nickName,
    publicAt 
  FROM
    users
    RIGHT JOIN articles ON users.userId = articles.publicUserId 
  WHERE
    isDel = 0
  ORDER BY 
    publicAt DESC
  LIMIT ${(pageNumber - 1) * pageSize} , ${pageSize};
    `
    try {
      const result = await connection.execute(statement)
      if (result[0].length === 0) {
        return {
          total,
          records: []
        }
      } else {
        const records = result[0]
        // 处理时间
        records.forEach((item) => {
          item.publicAt = dayjs(item.publicAt).format('YY-MM-DD hh:mm:ss')
        })
        return {
          total,
          records
        }
      }
    } catch (err) {
      return false
    }
  }
}

module.exports = new ArticleService()
