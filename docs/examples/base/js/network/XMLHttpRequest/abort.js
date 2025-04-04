// 监听中断事件
xhr.onabort = function () {
  console.log('请求被中止')
}

// 中止请求
setTimeout(() => {
  xhr.abort()
}, 1000) // 1秒后中止请求
