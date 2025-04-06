export class UserCard extends HTMLElement {
  static observedAttributes = ['name', 'age']

  constructor() {
    super()

    this.attachShadow({ mode: 'open' })
    this.shadowRoot.innerHTML = `
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
        <h3></h3>
        <p>年龄: <span class="age"></span></p>
      </div>
    `

    this.nameElement = this.shadowRoot.querySelector('h3')
    this.ageElement = this.shadowRoot.querySelector('.age')
  }

  // 元素的被观察属性变化时触发
  attributeChangedCallback(name, oldVal, newVal) {
    if (name === 'name') {
      this.nameElement.textContent = newVal
    } else if (name === 'age') {
      this.ageElement.textContent = newVal
    }
  }
}
