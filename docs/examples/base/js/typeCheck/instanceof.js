/*
 * 1. 基本类型无效
 * 2. 跨窗口/框架对象检测失效（不同上下文的构造函数不共享原型链）
 * 3. 显式修改原型链可能导致误判
 * */
;[] instanceof Array // true
;[] instanceof Object // true
'str' instanceof String // false
new Object('str') instanceof String // true [!code error]
