import { defineConfig } from 'vitepress'

import { nav } from './nav'
import { sidebars } from './sidebars'
import { vite } from './vite'
import { mdPlugin } from './plugins'

export default defineConfig({
  base: '/document/',
  title: '前端知识体系',
  description: '系统性整理前端开发核心知识',
  lang: 'zh-CN',
  appearance: 'dark', // 默认深色模式
  themeConfig: {
    outline: {
      label: '页面导航',
      level: 'deep', // 如果需要显示多级标题
    },
    nav,
    sidebar: sidebars,
    socialLinks: [
      { icon: 'github', link: 'https://github.com/your-username/your-repo' },
    ],
    search: {
      provider: 'local',
      options: {
        translations: {
          button: {
            buttonText: '搜索文档',
            buttonAriaLabel: '搜索文档',
          },
        },
      },
    },
  },
  vite,
  markdown: {
    config: (md) => mdPlugin(md),
  },
})
