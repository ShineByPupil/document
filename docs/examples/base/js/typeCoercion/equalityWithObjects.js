/*
 * 转换过程：
 * 1. hint 为 "default"，优先调用 valueOf() → 42
 * 2. 42 == 42 → true
 * */
const obj = { valueOf: () => 42, toString: () => '100' }
console.log(obj == 42) // true
