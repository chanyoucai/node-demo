// 一个解析 query 参数的 js 库
const querystring = require('querystring')
const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')


// 用于获取 post 请求的参数
const getPostData = (req) => {
  promise = new Promise((resolve, reject) => {
    if (req.method !== 'POST') {
      resolve({})
      return
    }
    if (req.headers['content-type'] !== 'application/json') {
      resolve({})
      return
    }
    let postData = ''
    req.on('data', chunk => {
      postData += chunk.toString()
    })
    req.on('end', () => {
      if (!postData) {
        resolve({})
        return
      }
      resolve(
        JSON.parse(postData)
      )
    })
  })
  return promise
}

const serverHandle = (req, res) => {
  // 设置返回格式 JSON
  res.setHeader('Content-type', 'application/json')

  // 获取 path
  const url = req.url
  req.path = url.split('?')[0]

  // 解析 query
  req.query = querystring.parse(url.split('?')[1])

  // 解析 cookie 
  // cookie 格式为 k1=v1;k2=v2;k3=v3
  req.cookie = {}
  const cookieStr = req.headers.cookie || ""
  // 通过 ; 分割成数组，遍历数组元素，再通过 = 分割成数组，拿到 key 和 val 赋值给 cookie 对象
  cookieStr.split(";").forEach(item => {
    if (!item) return
    const arr = item.split("=")
    const key = arr[0]
    const val = arr[1]
    req.cookie[key] = val
  });
  console.log("req cookie is",req.cookie)

  getPostData(req).then(postData => {
    req.body = postData

    // 处理 blog 路由
    const blogResult = handleBlogRouter(req, res)
    if (blogResult) {
      blogResult.then(blogData => {
        res.end(
          JSON.stringify(blogData)
        )
      })
      return
    }

    // 处理 user 路由
    const userResult = handleUserRouter(req, res)
    if (userResult) {
      userResult.then(userData => {
        res.end(
          JSON.stringify(userData)
        )
      })
      return
    }

    // 未命中路由
    res.writeHead(404, { 'Content-type': 'text/plain' })
    res.write('404 Not Found\n')
    res.end()
  })
}

module.exports = serverHandle