const { HttpException } = require('./http-exception')

const catchError = async (ctx,next) => {
  try {
    await next()
  } catch (error) {
    const isHttpException = error instanceof HttpException

    if(!isHttpException) {
      throw error
    }
    
    if(isHttpException) {
      ctx.status = error.code
      ctx.body = {
        msg: error.msg,
        error_code: error.code,
        request: `${ctx.method}${ctx.path}`
      }
    } else {
      ctx.body = {
        msg: "we made a mistake",
        error_code: 999,
        request: `${ctx.method}${ctx.path}`
      }
      ctx.status = 500
    }
  }
}

module.exports = catchError