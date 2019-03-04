// let user = require('./test')
// console.log(`userName:${user.userName}`)
let http = require('http')
let url = require('url')
let util = require('util')
let server = http.createServer((req, res) => {
  // 状态码,plain:解释性文本
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/plain; charset=uef-8')
  url.parse(req.url)
  // 将对象转化成字符串输出
  util.inspect(url.parse(req.url))
  res.end('endhhhhh')
})
server.listen(3000, '127.0.0.1', () => {
  console.log('test')
})
