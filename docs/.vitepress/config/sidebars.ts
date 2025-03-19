export const sidebars = {
  '/base/': [
    {
      text: 'HTML',
      base: '/base/html/',
      collapsed: false,
      items: [{ text: '基础语法与结构', link: '基础语法与结构' }],
    },
    {
      text: 'CSS',
      base: '/base/css/',
      collapsed: false,
      items: [
        { text: '核心机制', link: '核心机制' },
        { text: '布局系统', link: '布局系统' },
        { text: '视觉表现', link: '视觉表现' },
        { text: '工程实践', link: '工程实践' },
        { text: '性能优化', link: '性能优化' },
      ],
    },
    {
      text: 'JavaScript',
      base: '/base/js/',
      collapsed: false,
      items: [
        {
          text: 'ECMAScript 核心',
          items: [
            { text: '语言核心', link: '语言核心' },
            { text: '异步编程', link: '异步编程' },
          ],
        },
        {
          text: 'WEB API',
          items: [
            { text: 'BOM', link: 'browser/BOM' },
            { text: 'DOM', link: 'browser/DOM' },
            { text: '事件体系', link: 'browser/事件体系' },
            {
              text: '存储体系',
              base: '/base/js/browser/storage/',
              collapsed: true,
              items: [
                {
                  text: '会话级存储',
                  items: [
                    { text: 'cookie', link: 'cookie' },
                    { text: 'sessionStorage', link: 'sessionStorage' },
                  ],
                },
                {
                  text: '持久化存储',
                  items: [
                    { text: 'localStorage', link: 'localStorage' },
                    { text: 'IndexedDB', link: 'IndexedDB' },
                  ],
                },
                {
                  text: '资源存储',
                  items: [{ text: 'Cache API', link: 'CacheAPI' }],
                },
              ],
            },
            {
              text: '通信体系',
              collapsed: true,
              items: [
                { text: '前言', link: 'network/通信体系' },
                {
                  text: '传统请求',
                  items: [
                    { text: 'XMLHttpRequest', link: 'network/XMLHttpRequest' },
                    { text: 'fetch', link: 'network/fetch' },
                  ],
                },
                {
                  text: '实时通信',
                  items: [
                    { text: 'WebSocket', link: 'network/WebSocket' },
                    { text: 'WebRTC', link: 'network/WebRTC' },
                    { text: 'WebTransport', link: 'network/WebTransport' },
                  ],
                },
                {
                  text: '跨上下文通信',
                  items: [
                    { text: 'postMessage', link: 'network/postMessage' },
                    {
                      text: 'BroadcastChannel',
                      link: 'network/BroadcastChannel',
                    },
                    { text: 'MessageChannel', link: 'network/MessageChannel' },
                  ],
                },
                {
                  text: '数据上报与推送',
                  items: [
                    { text: 'EventSource', link: 'network/EventSource' },
                    { text: 'Beacon', link: 'network/Beacon' },
                  ],
                },
              ],
            },
            {
              text: '多线程与后台任务',
              collapsed: true,
              items: [
                { text: 'WebWorker', link: 'browser/WebWorker' },
                { text: 'SharedWorker', link: 'network/SharedWorker' },
                { text: 'ServiceWorker', link: 'browser/ServiceWorker' },
              ],
            },
            { text: 'Web Components', link: 'browser/WebComponents' },
            { text: '安全策略', link: 'browser/安全策略' },
            { text: '性能优化', link: 'browser/性能优化' },
          ],
        },
      ],
    },
  ],
  '/framework/': [
    {
      text: '主流框架',
      items: [
        { text: 'Vue 生态', link: '/framework/vue' },
        { text: 'React 体系', link: '/framework/react' },
        { text: '跨端开发', link: '/framework/cross-platform' },
      ],
    },
  ],
  '/engineering/': [
    {
      text: '工程化体系',
      items: [
        { text: 'Webpack 原理', link: '/engineering/webpack' },
        { text: 'Vite 实践', link: '/engineering/vite' },
        { text: 'CI/CD 流水线', link: '/engineering/cicd' },
      ],
    },
  ],
  '/dp/': [
    {
      text: '设计范式',
      base: '/dp/',
      items: [
        { text: '位操作艺术', link: '位操作艺术' },
        { text: '状态管理范式', link: '状态管理范式' },
        { text: '设计模式精选', link: '设计模式精选' },
        { text: '函数式范式', link: '函数式范式' },
        { text: '性能优化模式', link: '性能优化模式' },
        { text: '架构模式', link: '架构模式' },
        { text: '元编程技巧', link: '元编程技巧' },
      ],
    },
  ],
}
