class BaseModel {
  constructor(data, message) {
    if (typeof data === 'string') {
      this.message === data
      this.data = null
    }
    if (data) {
      this.data = data
    }
    if (message) {
      this.message = message
    }
    console.log('message:', this.message, 'data:', data)
  }
}

class SuccessModel extends BaseModel {
  constructor(data, message) {
    super(data, message)
    this.error = 0
  }
}

class ErrorModel extends BaseModel {
  constructor(data, message) {
    console.log('error-data:', data)
    console.log(typeof data === 'string')
    super(data, message)
    this.error = -1
  }
}

module.exports = {
  SuccessModel,
  ErrorModel
}