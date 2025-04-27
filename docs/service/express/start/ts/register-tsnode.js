import { register } from 'node:module' // [!code ++]
import { pathToFileURL } from 'node:url' // [!code ++]

// 把 ts-node/esm 注入到底层 ESM 加载器
register('ts-node/esm', pathToFileURL('./')) // [!code ++]
