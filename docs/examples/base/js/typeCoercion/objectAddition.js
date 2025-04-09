/*
 * 转换过程：
 * 1. hint 为 "default"，优先调用 valueOf() → 10
 * 2. 10 + 5 → 15
 * */
const obj = { valueOf: () => 10, toString: () => '20' }
console.log(obj + 5) // 15

/*
 * 转换过程：
 * 1. 双方 hint 为 "default"，优先调用 valueOf()
 * 2. 1 + 2 → 3
 * */
const obj1 = { valueOf: () => 1 }
const obj2 = { valueOf: () => 2 }
console.log(obj1 + obj2) // 3
