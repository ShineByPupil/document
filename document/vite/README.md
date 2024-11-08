# vite

# 默认产物

dist/
├── assets/
│ ├── index-D3nk9uzK.js
│ └── index-DfcKLXHt.css
├── index.html
└── ...

# 资源分类

```ts
import {defineConfig} from 'vite';
import {RollupOptions, PreRenderedAsset} from 'rollup';

export default defineConfig({
    build: {
        rollupOptions: {
            output: {
                entryFileNames: 'js/[name]-[hash].js',
                chunkFileNames: 'js/[name]-[hash].js',
                assetFileNames(assetInfo: PreRenderedAsset) {
                    if (assetInfo.names?.some(name => name.endsWith('.css'))) {
                        return 'css/[name]-[hash][extname]';
                    }

                    const imageExtensions = [
                        '.jpg', '.jpeg', '.png', '.gif', '.svg', '.webp',
                        '.bmp', '.ico', '.tiff', '.tif', '.psd', '.cdr', '.ai'
                    ];
                    if (assetInfo.names?.some(name => imageExtensions.some(ext => name.endsWith(ext)))) {
                        return 'images/[name]-[hash][extname]'; // 处理图片
                    }

                    return 'assets/[name]-[hash][extname]';
                }
            } as RollupOptions['output'] // 指定类型
        }
    }
});
```

dist/
├── css/
│ └── index-DfcKLXHt.css
├── js/
│ └── index-D3nk9uzK.js
├── index.html
└── ...

# 分包（Code Splitting）

分包是将整个应用程序的代码分割成多个独立的块（chunk），以便于按需加载。

## 动态导入

```vue
<script setup lang="ts">
    import {defineAsyncComponent} from 'vue';

    const Footer = defineAsyncComponent(() => import('./components/Footer.vue'));
</script>
```

```vue
<script setup lang="ts">
    import {defineAsyncComponent} from 'vue';

    const Footer = defineAsyncComponent({
        loader: () => import('./components/Footer.vue'),
        loadingComponent: () => import('./components/Loading.vue'), // 加载时显示的组件
        errorComponent: () => import('./components/Error.vue'),   // 加载失败时显示的组件
        delay: 200, // 延迟加载，避免快速切换时频繁加载
        timeout: 3000 // 超时，超过这个时间后会触发错误组件
    });
</script>
```

## 路由懒加载

```js
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import('@/views/home/index.vue'),
    },
    // ...
];
```

