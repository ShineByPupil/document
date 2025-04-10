const obj = {
  name: 'obj',
  method: function () {
    this.name = 'method'
    const arrow = () => this.name
    function regularFunc() {
      return this?.name
    }

    return {
      name: 'return method',
      arrow,
      regularFunc,
      innerObj: {
        name: 'innerObj',
        method: arrow,
        nested: function () {
          const arrow2 = () => this?.name
          return arrow2()
        },
      },
    }
  },
}
const instance = new (obj.method.bind({ name: 'boundObj' }))()
const {
  arrow,
  regularFunc,
  innerObj,
  innerObj: { method, nested },
} = instance

console.log('instance.regularFunc():', instance.regularFunc()) // ?
console.log('regularFunc():', regularFunc()) // ?
console.log('arrow():', arrow()) // ?
console.log('method():', method()) // ?
console.log('nested():', nested()) // ?
console.log('innerObj.nested():', innerObj.nested()) // ?
console.log('innerObj.nested.call(obj):', innerObj.nested.call(obj)) // ?
