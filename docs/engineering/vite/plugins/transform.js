import { version } from '../package.json'

const myPlugin = () => ({
  // 对匹配到的文件内容做修改
  transform(code, id) {
    // 针对 js、ts、vue 文件生效
    if (/\.(js|ts|vue)$/.test(id)) {
      // 将代码中所有占位符 替换为 package.json 中的实际版本号
      const replaced = code.replace(/__APP_VERSION__/g, version)

      if (replaced !== code) {
        return {
          code: replaced,
        }
      }
    }

    return null
  },
})
