import { defineConfig, type DefaultTheme } from 'vitepress'

export default defineConfig({
    title: "前端知识体系",
    description: "系统性整理前端开发核心知识",
    lang: 'zh-CN',
    appearance: 'dark', // 默认深色模式

    themeConfig: {
        nav: [
            { text: '基础', link: '/base/html' },
            { text: '框架', link: '/framework/vue' },
            { text: '工程化', link: '/engineering/webpack' },
        ],

        sidebar: {
            '/base/': [
                { text: 'HTML', base: '/base/html/', items: sidebarHTML() },
                { text: 'CSS', base: '/base/css/', items: sidebarCSS() },
                { text: 'JavaScript', base: '/base/js/', items: sidebarJavaScript() }
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
            ]
        },

        socialLinks: [
            { icon: 'github', link: 'https://github.com/your-username/your-repo' }
        ],

        editLink: {
            pattern: 'https://github.com/your-username/your-repo/edit/main/docs/:path',
            text: '完善此页面'
        },

        search: {
            provider: 'local',
            options: {
                translations: {
                    button: {
                        buttonText: '搜索文档',
                        buttonAriaLabel: '搜索文档'
                    }
                }
            }
        },

        lastUpdated: {
            text: '最后更新于',
            formatOptions: {
                dateStyle: 'short',
                timeStyle: 'medium'
            }
        }
    }
})

function sidebarHTML(): DefaultTheme.SidebarItem[] {
    return [
        {
            text: '基础概念', collapsed: false, items: [
                { text: 'HTML 概述', link: 'index' },
                { text: 'HTML 文档结构', link: '' },
                { text: '常用标签', link: '' },
            ]
        },
        {
            text: '文本内容', collapsed: false, items: [
                { text: '段落和标题', link: '' },
                { text: '列表（有序/无序）', link: '' },
                { text: '链接', link: '' },
                { text: '图像', link: '' },
                { text: '表格', link: '' },
            ]
        },
        {
            text: '表单', collapsed: false, items: [
                { text: '输入元素（文本框、单选框、复选框、下拉框）', link: '' },
                { text: '表单属性（action、method）', link: '' },
                { text: '表单验证', link: '' },
            ]
        },
        {
            text: '语义化 HTML', collapsed: false, items: [
                { text: '语义标签（header、footer、article、section）', link: '' },
                { text: 'SEO 优化', link: '' },
            ]
        },
        {
            text: 'HTML5 新特性', collapsed: false, items: [
                { text: '多媒体（音频、视频）', link: '' },
                { text: 'Canvas', link: '' },
                { text: '本地存储（localStorage、sessionStorage）', link: '' },
            ]
        },
    ]
}

function sidebarCSS(): DefaultTheme.SidebarItem[] {
    return [
        {
            text: '基础概念', collapsed: false, items: [
                { text: 'CSS 概述', link: 'index' },
                { text: '选择器（元素选择器、类选择器、ID 选择器）', link: '' },
                { text: '盒模型', link: '' },
            ]
        },
        {
            text: '布局', collapsed: false, items: [
                { text: '布局模型（块级、行内、行内块）', link: '' },
                { text: 'Flexbox', link: '' },
                { text: 'Grid', link: '' },
                { text: '浮动与定位（相对定位、绝对定位、固定定位）', link: '' },
            ]
        },
        {
            text: '样式', collapsed: false, items: [
                { text: '颜色与背景', link: '' },
                { text: '字体与文本', link: '' },
                { text: '边框与圆角', link: '' },
                { text: '动画与过渡', link: '' },
            ]
        },
        {
            text: '响应式设计', collapsed: false, items: [
                { text: '媒体查询', link: '' },
                { text: '响应式单位（百分比、vw、vh）', link: '' },
                { text: '移动优先设计', link: '' },
            ]
        },
        {
            text: 'CSS 预处理器', collapsed: false, items: [
                { text: 'SASS/SCSS', link: '' },
                { text: 'LESS', link: '' },
            ]
        },
    ]
}

function sidebarJavaScript(): DefaultTheme.SidebarItem[] {
    return [
        {
            text: '基础概念', collapsed: false, items: [
                { text: '变量与数据类型', link: 'index' },
                { text: '运算符与表达式', link: '' },
                { text: '控制结构（条件语句、循环）', link: '' },
            ]
        },
        {
            text: '函数', collapsed: false, items: [
                { text: '函数声明与表达式', link: '' },
                { text: '箭头函数', link: '' },
                { text: '回调函数', link: '' },
                { text: '作用域与闭包', link: '' },
            ]
        },
        {
            text: '对象与数组', collapsed: false, items: [
                { text: '对象的创建与操作', link: '' },
                { text: '数组的操作（push、pop、map、filter）', link: '' },
                { text: 'ES6 新特性（解构赋值、扩展运算符）', link: '' },
            ]
        },
        {
            text: 'DOM 操作', collapsed: false, items: [
                { text: '选择元素', link: '' },
                { text: '修改元素内容与样式', link: '' },
                { text: '事件处理', link: '' },
            ]
        },
        {
            text: '异步编程', collapsed: false, items: [
                { text: 'Promise', link: '' },
                { text: 'async/await', link: '' },
                { text: 'Fetch API', link: '' },
            ]
        }
    ]
}
