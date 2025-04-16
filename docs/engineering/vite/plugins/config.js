// 返回部分配置（推荐）
const myPlugin = () => ({
  config: () => ({
    resolve: {
      alias: {
        foo: 'bar',
      },
    },
  }),
})

// 直接改变配置（应仅在合并不起作用时使用）
const myPlugin = () => ({
  config(config, { command }) {
    if (command === 'build') {
      config.root = 'foo'
    }
  },
})
