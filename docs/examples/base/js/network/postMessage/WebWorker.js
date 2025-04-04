// 主线程 main.js
const worker = new Worker('worker.js')

// 发送复杂对象
worker.postMessage({
  action: 'CALCULATE',
  data: new Float32Array([1.2, 3.4, 5.6]),
})

// 接收处理结果
worker.onmessage = (e) => {
  console.log('计算结果:', e.data)
}

// worker.js
self.onmessage = function (e) {
  const input = e.data
  if (input.action === 'CALCULATE') {
    const result = input.data.reduce((a, b) => a + b)
    self.postMessage(result)
  }
}
