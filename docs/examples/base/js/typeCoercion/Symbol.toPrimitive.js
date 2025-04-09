let obj = {
  [Symbol.toPrimitive](hint) {
    switch (hint) {
      case 'number':
        return 123
      case 'string':
        return 'str'
      case 'default':
        return 'default'
      default:
        throw new Error()
    }
  },
}
2 * obj // 246
3 + obj // '3default'
obj == 'default' // true
String(obj) // 'str'
