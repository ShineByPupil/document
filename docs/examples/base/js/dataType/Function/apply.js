// fn.apply(thisArg, [argsArray])

// 示例1：动态参数计算
const numbers = [5, 2, 8, 4]
console.log(Math.max.apply(null, numbers)) // 8
Math.max(...[5, 2, 8, 4]) // 8

// 示例2：合并数组
const arr1 = [1, 2]
const arr2 = [3, 4]
arr1.push.apply(arr1, arr2)
console.log(arr1) // [1, 2, 3, 4]
