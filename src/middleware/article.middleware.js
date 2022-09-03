// 引入服务层
const service = require('../service/article.service')
const errorType = require('../constants/params-error.type')

const pubArticle = async (ctx, next) => {
  const { userId } = ctx.userInfo
  const { articleTitle, content } = ctx.request.body

  // 调用之前一定要确保这几个参数存在
  if (!articleTitle || !content) {
    const error = new Error(errorType.PARAMS_IS_REQUIRED)
    return ctx.app.emit('params-error', error, ctx)
  }

  const result = await service.pubArticle(userId, articleTitle, content)

  if (result) return await next()

  ctx.body = {
    status: 400,
    message: '发表失败',
  }
}

// 删除文章（支持单个删除，或者批量删除）
const delArticle = async (ctx, next) => {
  const { articleId } = ctx.request.query

  const result = await service.delArticle(articleId)
  if (result) return await next()
  ctx.body = {
    status: 400,
    message: '文章删除失败',
  }
}

// 获取文章列表 idDel 0
const getList = async (ctx, next) => {
  const result = await service.getArticleList()
  console.log('result', result)

  if (result) {
    ctx.body = {
      status: 200,
      message: '获取成功',
      records: result,
    }
  } else {
    ctx.body = {
      status: 400,
      message: '服务出现了一些问题请重试',
    }
  }
}

module.exports = {
  pubArticle,
  delArticle,
  getList,
}
