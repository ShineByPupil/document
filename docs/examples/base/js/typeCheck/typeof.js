typeof 'str' // "string"
typeof 42 // "number"
typeof true // "boolean"
typeof undefined // "undefined"
typeof Symbol() // "symbol"
typeof 123n // "bigint"

// 无法区分数组、null与object
typeof {} // "object" [!code error]
typeof [] // "object" (注意数组判断需用Array.isArray()) [!code error]
typeof null // "object" [!code error]
