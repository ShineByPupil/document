// 创建 AbortController 实例
const abortController = new AbortController()

// 发起 fetch 请求，并传递 signal 参数
fetch('https://api.example.com/data', {
  signal: abortController.signal, // 绑定中断信号
})
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => {
    if (error.name === 'AbortError') {
      console.log('请求已被手动取消')
    } else {
      console.error('请求失败:', error)
    }
  })

// 通过调用 abort() 方法中断请求
abortController.abort()
