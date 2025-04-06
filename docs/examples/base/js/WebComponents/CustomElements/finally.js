// 【HTML Templates】
const template = document.createElement('template')
template.innerHTML = `
  <style>
    .card {
      border: 1px solid #ccc;
      border-radius: 8px;
      padding: 10px;
      max-width: 200px;
      font-family: sans-serif;
    }
    .age {
      color: #888;
    }
  </style>
  <div class="card">
    <h3><slot name="name">默认名称</slot></h3> <!-- 【slot】 -->
    <p>年龄: 
      <span class="age">
        <slot name="age">默认年龄</slot>
      </span>
    </p>
  </div>
`

// 【Custom Elements】
export class UserCard extends HTMLElement {
  static observedAttributes = ['name', 'age']

  constructor() {
    super()
    // 【Shadow DOM】
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))
  }

  // 元素的被观察属性变化时触发
  attributeChangedCallback(name, oldVal, newVal) {
    // 插槽内容不能直接通过属性更改，但你可以更新默认内容
    if (name === 'name') {
      const slotName = this.shadowRoot.querySelector('slot[name="name"]')
      if (slotName) {
        slotName.textContent = newVal // 更新默认插槽内容
      }
    } else if (name === 'age') {
      const slotAge = this.shadowRoot.querySelector('slot[name="age"]')
      if (slotAge) {
        slotAge.textContent = newVal // 更新默认插槽内容
      }
    }
  }
}
