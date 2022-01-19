var express = require('express');
var router = express.Router();
const { SuccessModel, ErrorModel } = require('../model/resModel')
const { login, loginTest } = require('../controller/user')

router.post("/login", function (req, res, next) {
  const { username, password } = req.body
  const result = login(username, password)
  result.then(data => {
    if (data.username) {
      // 设置 session
      req.session.username = data.username
      res.json(
        new SuccessModel()
      )
      return 
    }
    res.json(
      new ErrorModel('登录失败')
    )
  })
})

// 方便测试，改为get请求
router.get("/logintest", function (req, res, next) {
  console.log("/logintest")
  const { username, password } = req.query
  const result = loginTest(username, password)
  result.then(data => {
    console.log("data:", data)
    if (data.username) {
      // 设置 session
      req.session.username = data.username
      res.json(
        new SuccessModel()
      )
      return
    }
    res.json(
      new ErrorModel('登录失败')
    )
  })
})

module.exports = router;