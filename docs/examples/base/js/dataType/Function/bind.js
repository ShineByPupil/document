// const boundFn = fn.bind(thisArg, arg1, arg2, ..., argN)

// 示例1：永久绑定上下文
const obj1 = { name: 'obj1' }
const obj2 = { name: 'obj2' }
function showName() {
  console.log(this.name)
}
const boundShow = showName.bind(obj1)

boundShow() // "obj1"
boundShow.call(obj2) // "obj1"
obj2.method = boundShow
obj2.method() // "obj1"

// 示例2：参数预设（柯里化）
function multiply(a, b) {
  return a * b
}
const double = multiply.bind(null, 2)
console.log(double(3)) // 6（等效于 multiply(2, 3)）
