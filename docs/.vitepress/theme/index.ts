// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './style.css'
import './custom.scss'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import '../demo/styles/css-vars.scss'
import '../demo/styles/dark/css-vars.scss'
import Demo from '../demo/components/vp-demo.vue'
import 'uno.css'
import Sound from './components/Sound.vue'

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
    app.component('Sound', Sound)
  },
} satisfies Theme
