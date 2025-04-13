// 每次新增只能设置一条 cookie，不支持批量设置
// 新增不同路径的同名 Cookie
document.cookie = `theme=dark; Max-Age=2592000; Path=/; Secure`
document.cookie = `theme=dark1; Max-Age=2592000; Path=/admin; Secure`

// 新增不同名称的 Cookie
document.cookie = `theme=dark; Max-Age=2592000; Path=/; Secure`
document.cookie = `language=en; Max-Age=2592000; Path=/; Secure`

// ❌ 错误示例
document.cookie = 'user=john; session=123' // 仅第一个生效 [!code error]
document.cookie = 'temp=1; Max-Age=30' // 设置30秒而非30天 [!code error]
