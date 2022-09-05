class FileController {
  async create(ctx, next) {
    ctx.body = {
      status: 200,
      message: ctx.avatarUrl,
    }
  }
}

module.exports = new FileController()
