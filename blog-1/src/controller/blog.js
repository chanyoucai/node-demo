const getList = (author, keyword) => {
  // 先返回假数据
  return [
    {
      id: 1,
      title: '标题A',
      content: '内容A',
      createTime: '2021-12-19',
      author: 'zhangsan',
    },
    {
      id: 1,
      title: '标题B',
      content: '内容B',
      createTime: '2021-12-20',
      author: 'lisi',
    }
  ]
}

const getDetail = (id) => {
  return {
    id: 1,
    title: '标题A',
    content: '内容A',
    createTime: '2021-12-19',
    author: 'zhangsan',
  }
}

const newBlog = (blogData = {}) => {
  // blogData 是一个对象，包含 title，content 属性
  return {
    id: 3,
    title: '标题C',
    content: '内容C',
    createTime: '2021-12-20',
    author: 'wangwu'
  }
}

const updateBlog = (id, blogData = {}) => {
  return true
}

const delBlog = (id) => {
  return true
}

module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog
}