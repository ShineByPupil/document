// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './style.css'
import './custom.scss'
import ElementPlus, { ID_INJECTION_KEY, ZINDEX_INJECTION_KEY, } from 'element-plus'
import 'element-plus/dist/index.css'
import '../demo/styles/css-vars.scss';
import '../demo/styles/dark/css-vars.scss';
import Demo from '../demo/components/vp-demo.vue'
import 'uno.css'

export default {
    extends: DefaultTheme,
    Layout: () => {
        return h(DefaultTheme.Layout, null, {
            // https://vitepress.dev/guide/extending-default-theme#layout-slots
        })
    },
    enhanceApp({ app, router, siteData }) {
        app.use(ElementPlus)
        app.component('Demo', Demo)
    }
} satisfies Theme
