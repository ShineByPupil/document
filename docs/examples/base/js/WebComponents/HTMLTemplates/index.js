export function renderList(container, items) {
  // 动态创建一个 <template> 元素，或直接写在HTML中
  const template = document.createElement('template')
  template.innerHTML = `
    <li class="item">
      <span class="text"></span>
      <button class="delete">×</button>
    </li>
  `

  items.forEach((item) => {
    // template.content 克隆模板元素中的内容节点
    const clone = template.content.cloneNode(true)
    clone.querySelector('.text').textContent = item
    container.appendChild(clone)
  })
}
