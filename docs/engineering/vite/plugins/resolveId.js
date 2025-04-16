import path from 'path'

const myPlugin = () => {
  // 通过环境变量设置当前语言，默认为 'en'
  const lang = process.env.LANG || 'en'
  // 根据语言设置资源文件夹，如英文资源在 'src/utils', 中文资源在 'src/utils-zh'
  const resourceFolder = lang === 'zh' ? 'src/utils-zh' : 'src/utils'

  return {
    resolveId(source, importer) {
      // 处理 @utils/ 路径别名
      if (source.startsWith('@utils/')) {
        return path.resolve(
          process.cwd(),
          source.replace('@utils/', `${resourceFolder}/`),
        )
      }
    },
  }
}
