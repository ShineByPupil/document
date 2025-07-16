import type { Plugin } from 'vite'
import processImports from './processImports'
import demo from './demo'

export function MarkdownTransform(): Plugin {
  return {
    name: 'demo-transform',
    enforce: 'pre',

    async transform(code, id) {
      if (!id.endsWith('.md')) return

      try {
        let transformed = null
        // 添加文件依赖
        const addDep = (file: string) => this.addWatchFile(file)

        // @import 功能
        transformed = await processImports(code, id, addDep)
        // :::demo 容器
        transformed = demo(transformed, id)

        return transformed
      } catch (e) {
        console.error(`Error processing ${id}:`, e)
        return code
      }
    },
  }
}
