const template = document.createElement('template')
template.innerHTML = `
  <ul class="dynamic-list">
    <li class="list-header">Dynamic Template</li>
    <!-- 占位符 -->
  </ul>
`
const clone = template.content.cloneNode(true) // 克隆模板内容
const ul = clone.querySelector('ul')

for (let i = 0; i < 1000; i++) {
  const li = document.createElement('li')
  li.textContent = `Template Item ${i}`
  ul.appendChild(li) // 操作克隆节点，不触发渲染
}

document.body.appendChild(clone) // 最终一次性插入
