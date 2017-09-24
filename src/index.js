// 引入相关模块
let colors = require('./colors')
let redline = require('readline')
let http = require('http')
// 定义一些默认参数
const HOST_NAME = "www.tuling123.com",
      API_KEY = ''

let rl = redline.createInterface({
  input: process.stdin,
  output: process.stdout
})

let name = "";
function welcome() {
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
  rl.question(' >有啥问题！！！！！', (query) =>{
    let req = http.request({
      hostname: HOST_NAME,
      path: '/openapi/api',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })
  })

}

welcome()