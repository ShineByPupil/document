const myPlugin = () => ({
  options(rollupOptions) {
    // 返回修改后的选项对象（将自动与现有选项合并）
    return {
      ...rollupOptions,
      // 排除模块打包
      external: [
        // 保留原配置
        ...[].concat(rollupOptions?.external || []),
        'lodash', // 排除 lodash
        /^@babel\//, // 正则匹配
      ],
    }
  },
})
