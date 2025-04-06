export function createSlotComponent() {
  const host = document.createElement('div')
  const shadowRoot = host.attachShadow({ mode: 'open' })

  shadowRoot.innerHTML = `
    <style>
      header {
        margin-bottom: 20px;
        border-bottom: 2px solid #ccc;
        color: red;
        font-size: 20px;
        font-weight: bold;
      }
      /* 使用 ::slotted() 给具名插槽中带 slot="header" 的元素定义样式 */
      ::slotted([slot="header"]) {
        color: #0a0a0a;
        font-size: 24px;
      }
      main {
        color: blue;
        font-size: 16px;
        line-height: 1.6;
        background: #f5f5f5;
        padding: 20px;
        border-radius: 8px;
      }
      /* 仅针对默认插槽中 <span> 元素生效 */
      main ::slotted(span) {
        font-style: italic;
        color: green;
      }
      /* 演示：默认插槽中 <h1> 的样式 */
      main ::slotted(h1) {
        color: purple;
        margin-top: 0;
      }
    </style>

    <header>
      <!-- 具名插槽：使用 slot="header" 插入的内容将渲染在这里 -->
      <slot name="header"></slot>
    </header>
    <main>
      <!-- 匿名插槽：没有指定 slot 属性的内容将渲染在这里 -->
      <slot></slot>
    </main>
  `

  return host
}
