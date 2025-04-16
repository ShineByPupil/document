const myPlugin = () => ({
  handleHotUpdate({ server, modules, timestamp }) {
    server.ws.send({ type: 'full-reload' })
    // 手动使模块失效
    const invalidatedModules = new Set()
    for (const mod of modules) {
      server.moduleGraph.invalidateModule(
        mod,
        invalidatedModules,
        timestamp,
        true,
      )
    }
    return []
  },
})
