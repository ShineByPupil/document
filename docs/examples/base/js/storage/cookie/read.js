// 无法读取特殊属性，浏览器开发者工具能查看特殊属性
const cookies = document.cookie.split(';').reduce((acc, str) => {
  const [k, v] = str.split('=')
  acc[k.trim()] = v
  return acc
}, {})

console.log(cookies)
// {
//   key1: "val1",
//   key2: "val2"
// }
