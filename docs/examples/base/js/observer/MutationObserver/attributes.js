const element = document.createElement('div')
element.className = 'foo'

const observer = new MutationObserver((mutations) => {
  console.table(
    mutations.map((mutation) => ({
      type: mutation.type, // "attributes"
      target: mutation.target,
      attributeName: mutation.attributeName, // 监听属性
      newValue: mutation.target.getAttribute(mutation.attributeName),
      oldValue: mutation.oldValue,
    })),
  )
})

observer.observe(element, {
  attributes: true,
  attributeFilter: ['class'],
  attributeOldValue: true,
})

element.className = 'bar' // 触发变化
element.className = 'baz' // 触发变化
element.id = 'qux' // ❌ id不触发变化，因为attributeFilter设置 [!code error]
