// 引入 sql 执行函数
const { exec, escape } = require('../db/mysql')
const { genPassword } = require("../utils/cryp")

const login = (username, password) => {
  // 生成加密密码
  password = genPassword(password)
  username = escape(username)
  password = escape(password)
  const sql = `
    select username from users where username=${username} and password=${password};
  `
  return exec(sql).then(rows => {
    return rows[0] || []
  })
}

// 方便测试，不加密使用
const loginTest = (username, password) => {
  const sql = `
    select username from users where username='${username}' and password='${password}';
  `
  return exec(sql).then(rows => {
    return rows[0] || []
  })
}

module.exports = {
  login,
  loginTest
}