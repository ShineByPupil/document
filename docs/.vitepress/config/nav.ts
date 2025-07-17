export const nav = [
  { text: '基础', link: '/base/html/基础语法与结构', activeMatch: '/base/' },
  {
    text: '框架',
    link: '/framework/vue3/前言',
    activeMatch: '/framework/',
  },
  {
    text: '工程化',
    link: '/engineering/vite/初始化与配置',
    activeMatch: '/engineering/',
  },
  { text: '设计范式', link: '/dp/位操作艺术', activeMatch: '/dp/' },
  {
    text: '服务端开发',
    activeMatch: '/service/',
    items: [
      {
        text: 'Node.js',
        link: '/service/nodejs/coreEnvironment/全局对象',
        activeMatch: '/service/nodejs/',
      },
      {
        text: 'express',
        link: '/service/express/开始',
        activeMatch: '/service/express/',
      },
      {
        text: 'Linux 运维',
        link: '/service/Linux/发行版本',
        activeMatch: '/service/Linux/',
      },
    ],
  },
]
