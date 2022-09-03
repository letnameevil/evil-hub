class ArticleController {
  async create(ctx, next) {
    ctx.body = {
      status: 200,
      message: '文章发表成功~',
    }

    await next() // 这里可以写可以不写
  }

  // 删除文章
  async del(ctx, next) {
    ctx.body = {
      status: 200,
      message: '文章删除成功~',
    }
  }

}

module.exports = new ArticleController()
