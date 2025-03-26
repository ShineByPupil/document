export const decrypt = (encoded) => {
  // 解析加密结构
  const seed = parseInt(encoded.slice(0, 2), 16)
  const layer = parseInt(encoded[2])
  const salt = encoded.slice(3, 7)
  let data = encoded.slice(7)

  // 递归解密
  for (let i = layer - 1; i >= 0; i--) {
    data = _reverse(data, salt, seed, i % 2 === 0)
  }
  return data
}

const _reverse = (str, salt, seed, wasForward) => {
  const saltCode = salt.charCodeAt(0) + salt.charCodeAt(2)
  return Array.from(str)
    .map((c, i) => {
      const code = c.charCodeAt(0)
      const delta = i % 2 === 0 ? saltCode : seed
      const newCode = wasForward ? code - delta : code + delta
      return String.fromCharCode((newCode + 65536) % 65536)
    })
    .join('')
}
