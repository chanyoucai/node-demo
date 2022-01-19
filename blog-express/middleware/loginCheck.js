const { ErrorModel } = require("../model/resModel")

module.exports = (req, res, next) => {
  console.log("middleware")
  if (req.session.username) {
    next()
    return
  }
  res.json(
    new ErrorModel("未登录")
  )
}