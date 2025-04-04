import type { Plugin } from 'vite'
import { camelize } from 'vue'
import path from 'path'

export function MarkdownTransform(): Plugin {
  return {
    name: 'demo-transform',
    enforce: 'pre',

    async transform(code, id) {
      if (!id.endsWith('.md')) return

      return code + combineScriptSetup(code, id)
    },
  }
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
