
const { SuccessModel, ErrorModel } = require('../model/resModel')
const { 
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog
 } = require('../controller/blog')

// 统一的登录验证，正常应该是一个公用函数。
// 放在此处因为blog中只有此处需要
const loginCheck = (req) => {
  // 如果session.name不存在，则表示尚未登录
  if(!req.session.username) {
    return Promise.resolve(
      new ErrorModel("尚未登录")
    )
  }
}

const handleBlogRouter = (req, res) => {
  const method = req.method
  const id = req.query.id
  // 获取博客列表
  if (method === 'GET' && req.path === '/api/blog/list') {
    let author = req.query.author || ''
    let keyword = req.query.keyword || ''
    if(req.query.isAdmin) {
      // 管理员
      const loginCheckResult = loginCheck(req)
      if(loginCheckResult) {
        // 未登录
        return loginCheckResult
      }
      // 查询自己的博客列表
      author = req.session.username
    }
    const result = getList(author, keyword)
    return result.then(listData => {
      return new SuccessModel(listData)
    })
  }

  // 获取博客详情
  if (method === 'GET' && req.path === '/api/blog/detail') {
    const result = getDetail(id)
    return result.then(data => {
      return new SuccessModel(data)
    }) 
  }

  // 新增博客
  if (method === 'POST' && req.path === '/api/blog/new') {
    const loginCheckResult = loginCheck(req)
    // 如果 loginCheckResult 有值，则未登录
    if (loginCheckResult) {
      return loginCheckResult
    }
    req.body.author = req.session.username
    const result = newBlog(req.body)
    return result.then(data => {
      return new SuccessModel(data)
    })
  }

  // 更新博客
  if (method === 'POST' && req.path === '/api/blog/update') {
    const loginCheckResult = loginCheck(req)
    // 如果 loginCheckResult 有值，则未登录
    if (loginCheckResult) {
      return loginCheckResult
    }
    const result = updateBlog(id, req.body)
    return result.then(val => {
      if (val) {
        return new SuccessModel()
      } else {
        return new ErrorModel('更新博客失败')
      }
    })
  }

  // 删除博客
  if (method === 'POST' && req.path === '/api/blog/del') {
    const loginCheckResult = loginCheck(req)
    // 如果 loginCheckResult 有值，则未登录
    if (loginCheckResult) {
      return loginCheckResult
    }
    const author = req.session.username
    const result = delBlog(id, author)
    return result.then(val => {
      if (val) {
        return new SuccessModel()
      } else {
        return new ErrorModel('删除博客失败')
      }
    })
  }
}

module.exports = handleBlogRouter