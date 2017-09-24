const colorMap = {
  //"black": "\x1b[30m",
  "Red": "\x1b[31m",
  "Green": "\x1b[32m",
  "Yellow": "\x1b[33m",
  "Blue": "\x1b[34m",
  "Megenta": "\x1b[35m",
  "Cyan": "\x1b[36m",
  "White": "\x1b[37m"
}
const DEFAULT_COLOR = "\x1b[37m"

let colors = (function() {
  let result = [];
  // 遍历颜色map  用for的话  要注意用 colorMap.hasOwnProperty[i] 不然会遍历对象里的所有属性
  // 这里object是node里的方法
  Object.keys(colorMap).forEach((key) => {
    result.push(colorMap[key])
  })
  return result
})()

function getColorRandom() {
  let index = parseInt(Math.random() * 7) 
  return colors[index]
}

module.exports = {
  printColorsInfo: function(...args) {
    // 这里 ...args就是参数数字
    let color = getColorRandom()
    console.log(color, ...args,DEFAULT_COLOR)
  }
}