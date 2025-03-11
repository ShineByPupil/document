import Components from 'unplugin-vue-components/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Icons from 'unplugin-icons/vite'
import { MarkdownTransform } from '../demo/plugins/markdown-transform'
import UnoCSS from 'unocss/vite'

export const vite = {
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
    UnoCSS(),
  ],
  server: {
    host: true,
  },
}
