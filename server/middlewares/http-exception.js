class HttpException extends Error {
  constructor(msg='服务器异常', errorCode=10000, code=400) {
    super()
    this.errorCode = errorCode
    this.code = code
    this.msg = msg
  }
}

class Success extends HttpException {
  constructor(msg, errorCode) {
    super()
    this.code = 201
    this.msg = msg || 'ok'
    this.errorCode = errorCode || 0
  }
}

class Rejct extends HttpException {
  constructor(msg, errorCode) {
    super()
    this.code = 401
    this.msg = msg || 'reject'
  }
}

module.exports = {
  HttpException,
  Success
}