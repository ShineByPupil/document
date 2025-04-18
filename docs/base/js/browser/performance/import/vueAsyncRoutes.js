// 添加加载状态和错误处理组件
const routes = [
  {
    path: '/dashboard',
    component: () => import('./views/Dashboard.vue'),

    // Vue 3 的 defineAsyncComponent 写法
    component: defineAsyncComponent({
      loader: () => import('./Dashboard.vue'),
      loadingComponent: LoadingSpinner, // 加载中组件
      errorComponent: ErrorPopup, // 错误组件
      delay: 200, // 延迟显示加载状态
      timeout: 3000, // 超时时间
    }),
  },
]
