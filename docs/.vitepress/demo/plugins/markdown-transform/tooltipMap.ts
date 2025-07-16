// 匹配 :::tooltip-map 容器，提取内容
const tooltipMapRE = /:::tooltip-map\s+([\s\S]*?):::/

// 转义正则表达式中的特殊字符，确保安全构造 RegExp
function escapeRegExp(str: string) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

// 转义 HTML 字符，防止注入和渲染问题
function escapeHtml(str: string) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

export default function (markdown: string): string {
  const match = markdown.match(tooltipMapRE)
  if (!match) return markdown

  // 解析 JSON 内容为 tooltip 映射表
  let tooltipMap: Record<string, string> = {}
  try {
    tooltipMap = JSON.parse(match[1])
  } catch (e) {
    console.warn('tooltip-map JSON 格式错误')
  }

  // 移除 :::tooltip-map 容器部分
  let result = markdown.replace(tooltipMapRE, '')

  // 遍历所有映射的术语，替换内容
  for (const term in tooltipMap) {
    const desc = escapeHtml(tooltipMap[term])
    const pattern = new RegExp(
      `(?<![\\w-])(\`${escapeRegExp(term)}\`|\\b${escapeRegExp(term)}\\b)(?![\\w-])`,
      'g',
    )

    result = result.replace(pattern, (matched) => {
      return `<el-tooltip content="${desc}"><span>${matched}<sup style="user-select: none;">?</sup></span></el-tooltip>`
    })
  }

  return result
}
