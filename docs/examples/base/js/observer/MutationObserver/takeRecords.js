const element = document.createElement('div')
const observer = new MutationObserver((mutations) => {
  // 不会执行，在微任务阶段之前已经同步断开了
  console.log('异步回调:', mutations)
})
observer.observe(element, { childList: true })

// 第一次触发变动
element.appendChild(document.createElement('span'))

// 手动获取变动记录（此时异步回调尚未执行）
const records = observer.takeRecords()
console.log('同步获取的记录:', records)

// 第二次触发变动
element.appendChild(document.createElement('p'))

observer.disconnect() // 断开观察者
const finalRecords = observer.takeRecords() // ❌ 第二次变动已经丢失 [!code error]
console.log('断开后的记录:', finalRecords)

// 同步获取的记录: [MutationRecord]
// 断开后的记录: []
