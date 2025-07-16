import type { Plugin } from 'vite'
import processImports from './processImports'
import demo from './demo'
import tooltipMap from './tooltipMap'

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
        // :::tooltip-map 容器
        transformed = tooltipMap(transformed)

        return transformed
      } catch (e) {
        console.error(`Error processing ${id}:`, e)
        return code
      }
    },
  }
}
