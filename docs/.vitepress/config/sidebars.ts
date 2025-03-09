export const sidebars = {
    '/base/': [
        {
            text: 'HTML', base: '/base/html/', items: [
                { text: '基础语法与结构', link: '基础语法与结构' },
                { text: '通信与存储', link: '通信与存储' },
                { text: '高级特性', link: '高级特性' },
            ]
        },
        {
            text: 'CSS', base: '/base/css/', items: [
                { text: '核心机制', link: '核心机制' },
                { text: '布局系统', link: '布局系统' },
                { text: '视觉表现', link: '视觉表现' },
                { text: '工程实践', link: '工程实践' },
                { text: '性能优化', link: '性能优化' },
            ]
        },
        {
            text: 'JavaScript', base: '/base/js/', items: [
                { text: '语言核心', link: '语言核心' },
                { text: '异步编程', link: '异步编程' },
                { text: '浏览器相关', link: '浏览器相关' },
                { text: '现代特性', link: '现代特性' },
                { text: '设计模式', link: '设计模式' },
                { text: '性能优化', link: '性能优化' },
            ]
        }
    ],
    '/framework/': [
        {
            text: '主流框架',
            items: [
                { text: 'Vue 生态', link: '/framework/vue' },
                { text: 'React 体系', link: '/framework/react' },
                { text: '跨端开发', link: '/framework/cross-platform' }
            ]
        }
    ],
    '/engineering/': [
        {
            text: '工程化体系',
            items: [
                { text: 'Webpack 原理', link: '/engineering/webpack' },
                { text: 'Vite 实践', link: '/engineering/vite' },
                { text: 'CI/CD 流水线', link: '/engineering/cicd' }
            ]
        }
    ],
    '/dp/': [
        {
            text: '设计范式', base: '/dp/', items: [
                { text: '位操作艺术', link: '位操作艺术' },
                { text: '状态管理范式', link: '状态管理范式' },
                { text: '设计模式精选', link: '设计模式精选' },
                { text: '函数式范式', link: '函数式范式' },
                { text: '性能优化模式', link: '性能优化模式' },
                { text: '架构模式', link: '架构模式' },
                { text: '元编程技巧', link: '元编程技巧' },
            ]
        }
    ]
}
