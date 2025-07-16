import { camelize } from 'vue'
import path from 'path'

// 匹配结构：:::demo 任意内容 + 换行 + 路径 + 换行 + :::
const demoRE = /:::demo[\s\S]*?\r?\n\s*(\S+)\r?\n\s*:::/g

export default function (markdown: string, id: string): string {
  const imports: string[] = []
  let match: RegExpExecArray | null

  while ((match = demoRE.exec(markdown)) !== null) {
    // 清洗路径（处理可能包含的代码标记）
    const cleanPath = match[1].replace(/`/g, '').trim()
    const name = camelize(`Ep-${cleanPath.replace(/\//g, '-')}`)
    const relativePath = path
      .relative(
        path.dirname(id),
        path.resolve('docs/examples', `${cleanPath}.vue`), // 要指向的目标文件
      )
      .replace(/\\/g, '/')
    imports.push(`import ${name} from '${relativePath}'`)
  }

  if (!imports.length) return markdown

  const scriptRE = /<script\s+setup.*?>([\s\S]*?)<\/script>/m
  const importCode = imports.join('\n')

  if (scriptRE.test(markdown)) {
    // 插入到已有 <script setup> 内部的开头
    return markdown.replace(
      scriptRE,
      (full, content) =>
        `<script setup>\n${importCode}\n${content.trim()}\n</script>`,
    )
  } else {
    // 创建 <script setup>，添加在结尾
    return `${markdown.trim()}\n\n<script setup>\n${importCode}\n</script>\n`
  }
}
