import { writeFile } from 'fs/promises'
import path from 'path'

const myPlugin = () => ({
  // 保存解析后的 Vite 配置
  configResolved(config) {
    this.buildPath = path.resolve(config.root, config.build.outDir)
  },

  // 实际使用 buildStart 钩子的部分
  async buildStart() {
    try {
      // 构造版本信息内容
      const versionContent = JSON.stringify(
        {
          buildTime: new Date().toISOString(),
          commitHash: process.env.GIT_COMMIT_HASH || 'unknown',
          env: process.env.NODE_ENV,
        },
        null,
        2,
      )
      // 写入文件到构建目录
      await writeFile(path.join(this.buildPath, 'version.json'), versionContent)
    } catch (error) {
      this.error('生成版本信息文件失败: ' + error.message)
    }
  },
})
