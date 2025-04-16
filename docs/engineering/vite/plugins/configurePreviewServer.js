const myPlugin = () => ({
  configurePreviewServer(server) {
    // 返回一个钩子，会在其他中间件安装完成后调用
    return () => {
      server.middlewares.use((req, res, next) => {
        // 自定义处理请求 ...
      })
    }
  },
})
