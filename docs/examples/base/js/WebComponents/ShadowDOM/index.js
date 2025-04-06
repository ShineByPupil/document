export function createShadowBox() {
  // 创建宿主元素
  const host = document.createElement('div')

  // 创建开放模式的 Shadow Root（可以通过 JavaScript 访问 shadowRoot 属性）
  const shadowRoot = host.attachShadow({ mode: 'open' })

  // 设置 Shadow DOM 内部的 HTML 和样式
  shadowRoot.innerHTML = `
    <style>
      /* 样式只作用于 Shadow DOM 内部，外部样式不会影响它 */
      button {
        background: #4CAF50;
        padding: 10px 20px;
        border: none;
        border-radius: 4px;
        color: white;
      }
    </style>
    <div>
      <p>Shadow DOM内部内容：</p>
      <button>Shadow按钮</button>
    </div>
  `

  // 返回包含 Shadow DOM 的宿主元素
  return host
}
