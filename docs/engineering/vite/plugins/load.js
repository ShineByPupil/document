const myPlugin = (options) => {
  const { modules } = options

  return {
    // 当模块 id 在 modules 映射中时，直接返回 '\0' + id
    resolveId(id) {
      if (id in modules) {
        // 虚拟模块，跳过正常处理链
        return '\0' + id
      }
    },

    // load 钩子，根据 id 返回对应的模块代码
    async load(id) {
      if (id.startsWith('\0')) {
        const key = id.slice(1)
        const moduleFn = modules[key]
        if (typeof moduleFn === 'function') {
          return moduleFn()
        } else {
          this.error(`Module ${key} is not a function`)
        }
      }
    },
  }
}
