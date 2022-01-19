var express = require('express');
var router = express.Router();
const { SuccessModel, ErrorModel } = require('../model/resModel')
const {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog
} = require('../controller/blog')
const loginCheck = require("../middleware/loginCheck")

router.get('/list', function (req, res, next) {
  // express 会直接把 query 参数整合在 req.query 中
  let author = req.query.author || ''
  let keyword = req.query.keyword || ''
  if (req.query.isAdmin) {
    console.log("isAdmin", req.session.username)
    // 管理员
    if (!req.session.username) {
      // 未登录
      res.json(
        new ErrorModel("未登录")
      )
      return 
    }
    // 查询自己的博客列表
    author = req.session.username
  }
  const result = getList(author, keyword)
  result.then(listData => {
    res.json(
      new SuccessModel(listData)
    )
  })
});

router.get("/detail", (req, res, next) => {
  let id = req.query.id
  const result = getDetail(id)
  result.then(data => {
    res.json(
      new SuccessModel(data)
    )
  }) 
})

router.post("/new", loginCheck, (req, res, next) => {
  req.body.author = req.session.username
  const result = newBlog(req.body)
  result.then(data => {
    res.json(
      new SuccessModel(data)
    )
  })
})

router.post("/update", loginCheck, (req, res, next) => {
  let id = req.query.id
  const result = updateBlog(id, req.body)
  result.then(val => {
    if (val) {
      res.json(
        new SuccessModel()
      )
    } else {
      res.json(
        new ErrorModel('更新博客失败')
      )
    }
  })
})

router.get("/del", loginCheck, (req, res, next) => {
  const id = req.query.id
  const author = req.session.username
  const result = delBlog(id, author)
  result.then(val => {
    if (val) {
      res.json(
        new SuccessModel()
      )
    } else {
      res.json(
        new ErrorModel('删除博客失败')
      )
    }
  })
})

module.exports = router;
