// fn.call(thisArg, arg1, arg2, ..., argN)

// 示例1：改变 this 指向
const person = { name: 'Alice' }
function greet(greeting) {
  console.log(`${greeting}, ${this.name}`)
}
greet.call(person, 'Hello') // "Hello, Alice"

// 示例2：借用数组方法
const arrayLike = { 0: 'a', 1: 'b', length: 2 }
Array.prototype.push.call(arrayLike, 'c')
console.log(arrayLike) // {0: 'a', 1: 'b', 2: 'c', length: 3}
