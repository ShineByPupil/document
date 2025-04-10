/* 特性:
 * 1. 无法作为构造函数
 * 2. 没有自己的 this, 继承自定义时的词法作用域
 * 3. 没有 arguments 对象(现在有剩余参数)
 * 4. 没有 prototype 属性
 * */
const sum = (a, b) => a + b

window.name = '全局作用域'
;(function () {
  this.name = '函数作用域'

  const obj = {
    name: 'obj',
    log: () => console.log(this.name), // 继承 middleware 的 this
  }

  obj.log() // "函数作用域"
  obj.log.call(window) // "函数作用域"
}).call({}) // 隔离window
