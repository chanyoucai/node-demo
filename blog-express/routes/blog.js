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

router.get('/list', function (req, res, next) {
  // res.json({
  //   errno: 0,
  //   data: [1,2,3]
  // })
  // express 会直接把 query 参数整合在 req.query 中
  let author = req.query.author || ''
  let keyword = req.query.keyword || ''
  // if (req.query.isAdmin) {
  //   // 管理员
  //   const loginCheckResult = loginCheck(req)
  //   if (loginCheckResult) {
  //     // 未登录
  //     return loginCheckResult
  //   }
  //   // 查询自己的博客列表
  //   author = req.session.username
  // }
  const result = getList(author, keyword)
  result.then(listData => {
    res.json(
      new SuccessModel(listData)
    )
  })
});

module.exports = router;
