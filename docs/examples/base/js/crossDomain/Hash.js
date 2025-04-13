// 设置哈希值
window.location.hash = '#section=2'

// 监听哈希变化
window.addEventListener('hashchange', () => {
  const params = new URLSearchParams(window.location.hash.slice(1))
  console.log('当前区块:', params.get('section'))
})

// 跨域通信示例（父页面与 iframe）
// 父页面
iframe.contentWindow.location.hash = encodeURIComponent(JSON.stringify(data))

// 子页面
window.onhashchange = () => {
  const data = JSON.parse(decodeURIComponent(location.hash.slice(1)))
}
