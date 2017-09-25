// 引入相关模块
let colors = require('./colors')
let redline = require('readline')
let http = require('http')
// 定义一些默认参数
const HOST_NAME = "www.tuling123.com",
      API_KEY = '732e65a87485416bbb171abf865b0e1c'  // 去网站申请   免费的有次数限制
const RESPONSE_TYPE = {
    TEXT: 100000,
    LINK: 200000,
    NEWS: 302000
}
let rl = redline.createInterface({
  input: process.stdin,
  output: process.stdout
})

let name = "";
function initChat() {
  let welcomeMsg = '嘿'
  //可以用for循环遍历  这里学习一下别的方式
  Array.prototype.forEach.call(welcomeMsg,(index) => {
    colors.printColorsInfo('---------------'+index+'--------------')
  })
  rl.question("名字：",(answer) => {
    name = answer
    console.log("哦！" + name)
    chat()
  })
}

function chat() {
  rl.question(' >有啥问题！！！！！\n请输入问题：', (query) =>{
    if(!query) {
      colors.printColorsInfo('走好不送！！')
      process.exit()
    }
    let req = http.request({
      hostname: HOST_NAME,
      path: '/openapi/api',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    },(res) => {
      let data = ''
      res.on('data', (backInfo) => {
        data += backInfo
      })
      res.on('end',() => {
        console.log(getResponse(data));
        chat()
      })
    })
    req.write(JSON.stringify({
      "key": API_KEY,
      "info": query,
      "userid": name
    }))
    req.end()
  })
  
}

function getResponse(data) {
  let res = JSON.parse(data)
  switch(res.code){
    case RESPONSE_TYPE.TEXT:
      return res.text
    case RESPONSE_TYPE.LINK:
      return res.text + ':' + res.url
    case RESPONSE_TYPE.NEWS:
      let Infos = ''
      (res.list || []).forEach((item) => {
        Infos += '\n文章：' + item.article + '\n来源：' + item.source + '\n链接：' + item.detailurl
      })
      return res.text + '\n' + Infos
    default:
      return res.text
  }
}
initChat()