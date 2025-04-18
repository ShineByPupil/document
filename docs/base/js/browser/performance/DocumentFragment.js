const fragment = document.createDocumentFragment() // 创建内存文档片段
const ul = document.createElement('ul')

for (let i = 0; i < 1000; i++) {
  const li = document.createElement('li')
  li.textContent = `Fragment Item ${i}`
  fragment.appendChild(li) // 内存操作，不触发重排
}

ul.appendChild(fragment) // 一次性插入
document.body.appendChild(ul)
