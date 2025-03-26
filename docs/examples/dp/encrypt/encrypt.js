export const encrypt = (str) => {
  // 动态生成参数
  const seed = Math.floor(Math.random() * 256) // 0-255
  const salt = Math.random().toString(36).slice(2, 6) // 4位随机串
  const layer = Math.floor(Math.random() * 3) + 1 // 1-3层

  // 递归加密核心
  let result = str
  for (let i = 0; i < layer; i++) {
    result = _process(result, salt, seed, i % 2 === 0)
  }

  // 编码结构：种子(HEX) + 层数 + 盐值 + 密文
  return [
    seed.toString(16).padStart(2, '0'), // 2位HEX
    layer,
    salt,
    result,
  ].join('')
}

const _process = (str, salt, seed, forward) => {
  const saltCode = salt.charCodeAt(0) + salt.charCodeAt(2) // 快速计算
  return Array.from(str)
    .map((c, i) => {
      const code = c.charCodeAt(0)
      const delta = i % 2 === 0 ? saltCode : seed
      const newCode = forward ? code + delta : code - delta
      return String.fromCharCode((newCode + 65536) % 65536)
    })
    .join('')
}
