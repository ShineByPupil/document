// 传统方式（整个库打包进主包）
import lodash from 'lodash' // [!code error]

// 动态导入（生成独立 chunk）
button.addEventListener('click', async () => {
  try {
    showLoader() // 显示加载动画
    const modalModule = await import('./modal.js')
    modalModule.showModal()
  } catch (error) {
    showErrorToast('模块加载失败') // 错误反馈
  } finally {
    hideLoader() // 隐藏加载动画
  }
})
