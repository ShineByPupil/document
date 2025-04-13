// 客户端实现
function handleJSONP(data) {
  console.log('收到数据:', data)
}

const script = document.createElement('script')
script.src = 'https://api.example.com/data?callback=handleJSONP&q=test'
document.body.appendChild(script)

// 服务端响应示例（返回内容）
handleJSONP({
  status: 'success',
  result: [],
})
