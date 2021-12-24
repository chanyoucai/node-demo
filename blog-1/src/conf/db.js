/**
 * 数据库配置文件
 */

const env = process.env.NODE_ENV // 获取环境变量

let MYSQL_CONF

if (env === 'dev') { // 开发环境数据库配置
  MYSQL_CONF = {
    host: 'localhost',
    user: 'root',
    password: 'chanyocai',
    port: '3306',
    database: 'myblog'
  }
}

if (env === 'production') { // 生产环境数据库配置
  MYSQL_CONF = {
    host: 'localhost',
    user: 'root',
    password: 'chanyocai',
    port: '3306',
    database: 'yocai'
  }
}

module.exports = {
  MYSQL_CONF
}