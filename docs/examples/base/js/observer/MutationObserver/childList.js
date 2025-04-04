const element = document.createElement('div')

const observer = new MutationObserver((mutations) => {
  console.log('mutations', mutations)
  console.table(
    mutations.map((mutation) => ({
      type: mutation.type, // "childList"
      target: mutation.target,
      addedNodes: mutation.addedNodes, // 被添加的节点
      removedNodes: mutation.removedNodes, // 被移除的节点
      previousSibling: mutation.previousSibling, // 被移除的节点的前一个节点
      nextSibling: mutation.nextSibling, // 被移除的节点的后一个节点
    })),
  )
})

observer.observe(element, { childList: true })

element.appendChild(document.createTextNode('foo')) // 触发变化
element.appendChild(document.createTextNode('bar')) // 触发变化
