/*
 * 转换过程：
 *  1. Date 的 hint 为 "default" 时视为 "string"
 * 2. 优先调用 toString() → "2023-01-01"
 * 3. "2023-01-01" + 0 → 字符串拼接
 * */
const date = new Date()
date.toString = () => '2023-01-01'
date.valueOf = () => 1672531200000
console.log(date + 0) // "2023-01-010"
