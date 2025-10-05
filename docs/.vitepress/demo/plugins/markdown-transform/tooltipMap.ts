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

const { protectedText, restore } = (() => {
  const codeBlocks: string[] = []
  let index = 0
  const protectPattern = /```[\s\S]*?```|^#{1,6} .+$/gm

  const protectedText = (rawText: string) =>
    rawText.replace(protectPattern, (match) => {
      const placeholder = `___CODE_BLOCK_PLACEHOLDER_${index++}___`
      codeBlocks.push(match)
      return placeholder
    })

  const restore = (text: string) => {
    return text.replace(/___CODE_BLOCK_PLACEHOLDER_(\d+)___/g, (_, i) => {
      return codeBlocks[+i]
    })
  }

  return { protectedText, restore }
})()

export default function (markdown: string): string {
  // 匹配 :::tooltip-map 容器，提取内容
  const tooltipMapRE = /:::tooltip-map\s+([\s\S]*?):::/g
  // 没有识别到 :::tooltip-map 容器，直接退出
  let tooltipMap: Record<string, string> = {}

  // 解析 JSON 内容为 tooltip 映射表
  for (let match of markdown.matchAll(tooltipMapRE)) {
    try {
      const obj = JSON.parse(match[1])
      Object.assign(tooltipMap, obj)
    } catch (e) {
      console.warn('tooltip-map JSON 格式错误')
    }
  }

  // 移除 :::tooltip-map 容器部分
  let result = markdown.replaceAll(tooltipMapRE, '')
  // 隔离代码块
  result = protectedText(result)

  // 遍历所有映射的术语，替换内容
  for (const term in tooltipMap) {
    const escaped = escapeRegExp(term) // 安全处理
    // 中文检测：只要包含一个中文字符，就当作中文词处理
    const isChinese = /[\u4e00-\u9fa5]/.test(term)
    let patternBody: string

    if (isChinese) {
      // 匹配规则：中文词前后不是字母数字（避免误伤拼音或变量名）
      patternBody = [
        `(?<![\\p{L}\\p{N}])`, // 前缀：前面不能是 Unicode 字母或数字（中文、英文都算）
        escaped,
        // 后缀：后面不能是 Unicode 字母或数字
        `(?![\\p{L}\\p{N}])`,
      ].join('')
    } else {
      // 匹配规则：英文词使用 \b 单词边界，确保完整匹配
      patternBody = `\\b${escaped}\\b`
    }

    const pattern = new RegExp(
      [
        // 不能被单词字符或 - 包围（避免 “foo-let-bar” 误匹配）
        `(?<![\\w-])`,
        // 支持 `term` 或 term（根据是否带反引号）
        `(\`${escaped}\`|${patternBody})`,
        `(?![\\w-])`,
      ].join(''),
      'g',
    )

    result = result.replace(pattern, (matched) => {
      return `___CODE_BLOCK_PLACEHOLDER_${matched}___`
    })
  }

  // 将占位符替换为 tooltip
  for (const term in tooltipMap) {
    const desc = escapeHtml(tooltipMap[term])
    result = result.replace(
      `___CODE_BLOCK_PLACEHOLDER_${term}___`,
      (matched) => {
        return `
        <el-tooltip content="${desc}" placement="top">
          <span class="tooltip-keyword">
            <u>${term}</u>
            <sup>?</sup>
          </span>
        </el-tooltip>
      `.replace(/\s*\n\s*/g, '')
      },
    )
  }

  // 恢复代码块
  result = restore(result)

  return result
}
