import path from 'path'
import fs from 'fs'
import { files as sidebars } from '../config/sidebars'

// 统一路径格式并移除扩展名
const normalizePath = (p: string) => {
  return p
    .replace(/\\/g, '/') // 统一为Unix路径分隔符
    .replace(/\/$/, '') // 移除末尾斜杠
    .replace(/^\//, '') // 移除开头斜杠
}

// 生成未引用的文件列表
export function generateExclude(): string[] {
  const docsRoot = path.join(__dirname, '../../')

  const referencedFiles = new Set(
    sidebars.map((file) => normalizePath(file)), // 假设sidebars是文件名数组
  )
  const allFiles = new Set<string>()

  // 扫描所有Markdown文件
  const scan = (dir: string) => {
    fs.readdirSync(dir).forEach((file) => {
      const fullPath = path.join(dir, file)
      const stat = fs.statSync(fullPath)

      if (stat.isDirectory()) {
        scan(fullPath)
      } else if (path.extname(file).toLowerCase() === '.md') {
        const relativePath = path.relative(docsRoot, fullPath)
        allFiles.add(normalizePath(relativePath))
      }
    })
  }

  scan(docsRoot)

  // 排除
  allFiles.delete('index.md')

  // 计算未引用的文件（差集）
  const exclude = Array.from(allFiles).filter(
    (file) => !referencedFiles.has(file),
  )
  console.log('未使用的md文件：', exclude)

  return exclude.map((file) => `**/${file}`)
}
