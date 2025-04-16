const myPlugin = () => ({
  configureServer(server) {
    server.middlewares.use((req, res, next) => {
      // 自定义请求处理...
    })
  },
})
