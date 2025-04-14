import type { Plugin } from 'vite'
import { camelize } from 'vue'
import path from 'path'
import fs from 'fs/promises'

export function MarkdownTransform(): Plugin {
  return {
    name: 'demo-transform',
    enforce: 'pre',

    async transform(code, id) {
      if (!id.endsWith('.md')) return

      try {
        const addDep = (file: string) => this.addWatchFile(file) // 添加文件依赖
        const formatCode = await processImports(code, id, addDep)
        return formatCode
      } catch (e) {
        console.error(`Error processing ${id}:`, e)
        return code
      }
    },
  }
}

async function processImports(
  markdown: string,
  filePath: string,
  addDep: (file: string) => void,
): Promise<string> {
  // 匹配 @import 语句
  const importRE = /@import\s+['"](.+?)['"]/g
  let match: RegExpExecArray | null
  let transformed = markdown

  while ((match = importRE.exec(markdown)) !== null) {
    const [fullMatch, importPath] = match
    // 解析绝对路径
    const targetPath = path.resolve(
      path.dirname(filePath),
      importPath.trim().replace(/^@/, path.join(process.cwd(), 'src')),
    )
    // 添加文件依赖
    addDep(targetPath)

    // 读取目标文件内容
    let content = await fs.readFile(targetPath, 'utf-8')

    // 替换原始语句
    transformed = transformed.replace(fullMatch, content.replace(/\$/g, '$$$$'))
  }

  return transformed + combineScriptSetup(transformed, filePath)
}

function combineScriptSetup(markdown: string, id: string): string {
  const imports = []
  // 匹配结构：:::demo 任意内容 + 换行 + 路径 + 换行 + :::
  const demoRE = /:::demo[\s\S]*?\r?\n\s*(\S+)\r?\n\s*:::/g
  let match: RegExpExecArray | null

  while ((match = demoRE.exec(markdown)) !== null) {
    const [_, componentPath] = match
    // 清洗路径（处理可能包含的代码标记）
    const cleanPath = componentPath.replace(/`/g, '').trim()
    const name = camelize(`Ep-${cleanPath.replace(/\//g, '-')}`)
    console.log(id)
    const relativePath = path
      .relative(
        path.dirname(id),
        path.resolve('docs/examples', `${cleanPath}.vue`), // 要指向的目标文件
      )
      .replace(/\\/g, '/')
    imports.push(`import ${name} from '${relativePath}'`)
  }

  return imports.length
    ? `\n<script setup>\n${imports.join('\n')}\n</script>\n`
    : ''
}
