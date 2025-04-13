// 通过设置相对过期时间删除 Cookie
document.cookie = `theme=; Max-Age=0;`
// 通过设置过去的日期删除 Cookie
document.cookie = `theme=; Expires=Thu, 01 Jan 1970 00:00:00 GMT;`
