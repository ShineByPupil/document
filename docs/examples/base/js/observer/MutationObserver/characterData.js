const element = document.createElement('div')
const textNode = document.createTextNode('foo')
element.appendChild(textNode)

const observer = new MutationObserver((mutations) => {
  console.table(
    mutations.map((mutation) => ({
      type: mutation.type, // "characterData"
      target: mutation.target, // text
      newValue: mutation.target.data,
      oldValue: mutation.oldValue,
    })),
  )
})

// 两种写法都可行，但最终只有一条记录，同一个观察者实例会合并相同变动
observer.observe(textNode, {
  characterData: true,
  characterDataOldValue: true,
})
observer.observe(element, {
  characterData: true,
  subtree: true, // 深度监听
})

textNode.data = 'bar' // 触发变化
// ❌ 不会触发characterData，而是触发 childList
element.textContent = 'baz' // [!code error]
