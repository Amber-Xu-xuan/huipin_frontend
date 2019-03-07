var http = require('http')
http.get('www.baidu.com', function (res) {
  let data = ''
  // 当获取到数据之后调用function
  res.on('data', function (chunk) {
    data += chunk
  })
  res.on('end', function () {
    let result = JSON.parse(data)
  })
})
