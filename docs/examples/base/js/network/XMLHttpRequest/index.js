// 1. 创建实例
const xhr = new XMLHttpRequest()

// 2. 配置请求（异步 GET）
xhr.open('GET', '/api/data', true)

// 3. 设置响应类型
xhr.responseType = 'json'

// 4. 监听状态变化
xhr.onreadystatechange = function () {
  if (xhr.readyState === 4) {
    if (xhr.status === 200) {
      console.log('响应数据:', xhr.response)
    } else {
      console.error('请求失败:', xhr.statusText)
    }
  }
}

// 5. 发送请求
xhr.send()

// 同步请求示例（慎用！会阻塞主线程）
const syncXhr = new XMLHttpRequest()
syncXhr.open('GET', '/api/data', false)
syncXhr.send()
console.log(syncXhr.responseText)

// POST 表单数据
const formData = new FormData()
formData.append('username', 'john')
const postXhr = new XMLHttpRequest()
postXhr.open('POST', '/submit')
postXhr.send(formData)
