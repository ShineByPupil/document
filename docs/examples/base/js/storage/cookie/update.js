// 新增 Cookie
document.cookie = `theme=dark; Max-Age=2592000; Path=/admin;`

// 更新 Cookie
document.cookie = `theme=dark1; Max-Age=2592000; Path=/admin;`
document.cookie = `theme=dark1; Max-Age=2592000;` // 新增而非修改 [!code error]
