// 使用 ESM 版本库 + 按需导入
const getLodashDebounce = () => import('lodash-es/debounce')

// 动态加载重型库（如图表库）
chartButton.addEventListener('click', async () => {
  const echarts = await import('echarts')
  const chart = echarts.init(dom)
})
