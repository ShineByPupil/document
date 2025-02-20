import { defineConfig } from 'vitepress'
import path from 'path'
import fs from 'fs'
import mdContainer from 'markdown-it-container'
import Components from 'unplugin-vue-components/vite'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import { MarkdownTransform } from './demo/plugins/markdown-transform'
import UnoCSS from 'unocss/vite'

export default defineConfig({
    title: "前端知识体系",
    description: "系统性整理前端开发核心知识",
    lang: 'zh-CN',
    appearance: 'dark', // 默认深色模式

    themeConfig: {
        outline: {
            label: '页面导航',
            level: 'deep' // 如果需要显示多级标题
        },

        nav: [
            { text: '基础', link: '/base/html/文档结构', activeMatch: '/base/' },
            { text: '框架', link: '/framework/vue', activeMatch: '/framework/' },
            { text: '工程化', link: '/engineering/webpack', activeMatch: '/engineering/' },
            { text: '设计范式', link: '/dp/位操作艺术', activeMatch: '/dp/' },
        ],

        sidebar: {
            '/base/': [
                {
                    text: 'HTML', base: '/base/html/', items: [
                        { text: '文档结构', link: '文档结构' },
                        { text: '元素体系', link: '元素体系' },
                        { text: '通信与存储', link: '通信与存储' },
                        { text: '高级特性', link: '高级特性' },
                    ]
                },
                {
                    text: 'CSS', base: '/base/css/', items: [
                        { text: '核心机制', link: '核心机制' },
                        { text: '布局系统', link: '布局系统' },
                        { text: '视觉表现', link: '视觉表现' },
                        { text: '工程化', link: '工程化' },
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
    },

    vite: {
        plugins: [
            Components({
                dirs: ['.vitepress/demo/components'],

                allowOverrides: true,

                // custom resolvers
                resolvers: [
                    // auto import icons
                    // https://github.com/antfu/unplugin-icons
                    IconsResolver(),
                ],

                // allow auto import and register components used in markdown
                include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
            }),
            Icons({
                compiler: 'vue3',
                autoInstall: true,
            }),
            MarkdownTransform(),
            UnoCSS()
        ],
        server: {
            host: true,
        }
    },

    markdown: {
        config: (md) => {
            md.use(mdContainer, 'demo', {
                validate(params) {
                    return !!params.trim().match(/^demo\s*(.*)$/)
                    // return params.trim().startsWith('demo')
                },
                render(tokens, idx) {
                    const m = tokens[idx].info.trim().match(/^demo\s+(.*)$/)

                    if (tokens[idx].nesting === 1) {
                        const description = m ? m[1] : ''
                        const sourceFileToken = tokens[idx + 2]
                        let source = ''
                        const sourceFile = sourceFileToken.children?.[0].content ?? ''

                        if (sourceFileToken.type === 'inline') {
                            source = fs.readFileSync(
                                path.resolve(__dirname, '..', 'examples', `${ sourceFile }.vue`),
                                'utf-8'
                            )
                        }
                        if (!source) throw new Error(`Incorrect source file: ${ sourceFile }`)

                        return `<Demo source="${ encodeURIComponent(md.render(`\`\`\` vue\n${ source }\`\`\``)) }"
                                      path="${ sourceFile }"
                                      raw-source="${ encodeURIComponent(source) }"
                                      description="${ encodeURIComponent(md.render(description)) }">
                                    <template #source>
                                        <ep-${ sourceFile.replaceAll('/', '-') }/>
                                    </template>`
                    } else {
                        return '</Demo>\n'
                    }
                }
            })
        }
    }
})
