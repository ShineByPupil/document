// 合并多个文件到同一 chunk（减少 HTTP 请求）
const getUserModule = () =>
  import(/* webpackChunkName: "user" */ './userAPI.js')
const getProfileModule = () =>
  import(/* webpackChunkName: "user" */ './profile.js')

// 预加载关键路径资源
const checkoutModule = () => import(/* webpackPreload: true */ './Checkout.js')

// 当用户 hover 到按钮时预获取
button.addEventListener('mouseover', () => {
  import(/* webpackPrefetch: true */ './SettingsPanel.js')
})
