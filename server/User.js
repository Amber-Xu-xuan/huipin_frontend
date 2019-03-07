// let user = require('./test')
// console.log(`userName:${user.userName}`)
let http = require('http')
let url = require('url')
let util = require('util')
// 加载文件系统
let fs = require('fs')
let server = http.createServer((req, res) => {
  // 状态码,plain:解释性文本
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/plain; charset=uef-8')

  var pathname = url.parse(req.url).pathname
  fs.readFile(pathname.substring(1), function (error, data) {
    if (error) {
      res.writeHead(404, {
        'Content-Type': 'text/html'
      })
    } else {
      res.writeHead(200, {
        'Content-Type': 'text/html'
      })
      res.write(data.toString())
    }
    res.end()
  })
  // url.parse(req.url) // 返回对象，res.url为字符串
  // 将对象转化成字符串输出
  // 只是获取相对路径
  // 在request框架中通过originalUrl获取路径的所有内容
  // res.end(util.inspect(url.parse(req.url)))
})
server.listen(3000, '127.0.0.1', () => {
  console.log('test')
})
