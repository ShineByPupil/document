import path from 'path'
import fs from 'fs/promises'

export default async function (
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

    if (!importPath.endsWith('.md')) {
      continue
    }

    // 解析绝对路径
    const targetPath = path.resolve(
      path.dirname(filePath),
      importPath.trim().replace(/^@/, path.join(process.cwd(), 'src')),
    )
    try {
      await fs.access(targetPath)
      // 读取目标文件内容
      let content = await fs.readFile(targetPath, 'utf-8')

      // 替换原始语句
      transformed = transformed.replace(
        fullMatch,
        content.replace(/\$/g, '$$$$'),
      )
      // 添加文件依赖
      addDep(targetPath)
    } catch (e) {
      console.error(`${targetPath} 文件不存在`)
    }
  }

  return transformed
}
