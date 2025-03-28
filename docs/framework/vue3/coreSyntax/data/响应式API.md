# 响应式 API

## 一、ref 系列

> 提供基础类型和引用类型的响应式能力，通过.value访问内部值，支持深浅不同的响应式转换，适用于需要保持对象引用的场景

- **核心特性**
  - 支持所有数据类型
  - 通过 `.value` 访问
  - 自动解包（模板中不需要 `.value` ）
- **适用场景**
  - 基本类型值
  - 需要保持引用的对象/数组

### 特性对比

| API                | 响应深度 | 特点                                 | 特殊行为               |
| ------------------ | :------: | ------------------------------------ | ---------------------- |
| **`ref()`**        |   深度   | 递归转换对象/数组                    | 模板自动解包           |
| **`shallowRef()`** |   浅层   | 仅响应 `.value` 的替换               | 需手动触发嵌套更新     |
| **`triggerRef()`** |    -     | 强制触发与 `shallowRef` 关联的副作用 | 配合 `shallowRef` 使用 |
| **`customRef()`**  |  自定义  | 可手动控制依赖跟踪和触发逻辑         | 用于实现防抖等高级场景 |

### 代码示例

::: code-group

```tsx [ref]
import { ref } from 'vue'

const count = ref(0) // 基本类型
const user = ref({ name: 'Alice', age: 25 }) // 对象类型

count.value++ // 触发更新
user.value.age++ // 触发更新（深层响应）
```

```tsx [shallowRef]
import { shallowRef, onMounted } from 'vue'

const obj = shallowRef({ count: 0 })

onMounted(() => {
  obj.value.count++ // ❌ 可以修改，但不会触发视图更新
  obj.value = { count: obj.value.count + 1 } // 触发视图更新
})
```

```tsx [triggerRef]
import { shallowRef, triggerRef, onMounted } from 'vue'

const obj = shallowRef({ count: 0 })

onMounted(() => {
  obj.value.count++ // 修改值，但不会触发视图更新
  triggerRef(obj) // 强制触发视图更新
})
```

```vue [customRef]
<script setup>
// 导入Vue的customRef函数，用于创建自定义的响应式引用
import { customRef } from 'vue'

/**
 * 创建带有防抖功能的响应式引用
 * @param {*} value - 初始值
 * @param {number} delay - 防抖延迟时间（毫秒），默认200ms
 * @returns {Object} 自定义的响应式引用对象
 */
function useDebouncedRef(value, delay = 200) {
  // 用于保存定时器ID
  let timeout

  // 使用customRef创建自定义响应式引用
  return customRef((track, trigger) => ({
    // getter：返回当前值并追踪依赖
    get() {
      track() // 追踪依赖，确保响应性
      return value // 返回当前值
    },

    // setter：实现防抖逻辑
    set(newValue) {
      clearTimeout(timeout) // 清除之前的定时器，避免多次执行
      // 设置新的定时器
      timeout = setTimeout(() => {
        value = newValue // 延迟结束后更新值
        trigger() // 触发依赖更新，通知组件重新渲染
      }, delay)
    },
  }))
}

// 使用自定义的防抖ref，初始化值为空字符串
const text = useDebouncedRef('')
</script>

<template>
  <p>{{ text }}</p>
  <!-- 输入时会触发防抖逻辑，只有在停止输入200ms后才会更新值 -->
  <input v-model="text" />
</template>
```

:::

## 二、reactive 系列

> 面向对象类型的深度响应式方案，自动代理对象属性，提供只读变体和浅层响应式版本，适合处理复杂嵌套对象结构

- **核心特性**
  - 仅支持对象类型
  - 直接访问属性
  - 自动深度响应
- **适用场景**
  - 复杂对象、需要深度监听嵌套结构的场景

### 特性对比

| API                     | 只读 | 响应深度 | 特点                           |
| ----------------------- | :--: | :------: | ------------------------------ |
| **`reactive()`**        |  ❌  |   深度   | 自动代理对象的所有嵌套属性     |
| **`shallowReactive()`** |  ❌  |   浅层   | 仅响应根级属性变化             |
| **`readonly()`**        |  ✅  |   深度   | 递归只读代理，任何修改会报错   |
| **`shallowReadonly()`** |  ✅  |   浅层   | 仅根级属性只读，嵌套属性可修改 |

### 代码示例

#### 抽象源码

::: code-group

```ts [reactive]
// 创建深度响应式代理
export function reactive(target) {
  if (isReadonly(target)) return target // 避免重复代理只读对象
  return createReactiveObject(
    target,
    false, // 非只读模式
    mutableHandlers, // 处理普通对象属性的读写操作（深度响应）
    mutableCollectionHandlers, // 处理集合类型（如Map/Set）的响应式逻辑
    reactiveMap, // 缓存已创建的代理对象，防止重复代理
  )
}
```

```ts [shallowReactive]
// 创建浅层响应式代理
export function shallowReactive(target) {
  return createReactiveObject(
    target,
    false, // 非只读模式
    shallowReactiveHandlers, // 仅处理顶层属性的响应式（非深度）
    shallowCollectionHandlers, // 集合类型的浅层处理
    shallowReactiveMap, // 缓存浅层代理对象
  )
}
```

```ts [readonly]
// 创建深度只读代理对象
export function readonly(target) {
  return createReactiveObject(
    target,
    true, // 只读模式
    readonlyHandlers, // 拦截所有修改操作并提示警告
    readonlyCollectionHandlers, // 只读集合的处理逻辑
    readonlyMap, // 缓存只读代理对象
  )
}
```

```ts [shallowReadonly]
// 创建浅层只读代理对象
export function shallowReadonly(target) {
  return createReactiveObject(
    target,
    true, // 只读模式
    shallowReadonlyHandlers, // 仅顶层属性只读，深层属性不处理
    shallowReadonlyCollectionHandlers, // 浅层只读集合处理
    shallowReadonlyMap, // 缓存浅层只读代理对象
  )
}
```

:::

#### 实际应用

::: code-group

```tsx [reactive]
import { reactive, onMounted } from 'vue'

const state = reactive({
  count: 0,
  nested: {
    value: 'hello',
  },
})

onMounted(() => {
  state.count++ // 触发视图更新
  state.nested.value = 'world' // 触发视图更新
})
```

```tsx [shallowReactive]
import { shallowReactive, onMounted } from 'vue'

const state = shallowReactive({
  count: 0,
  nested: {
    value: 'hello',
  },
})

onMounted(() => {
  state.count++ // 触发视图更新
  state.nested.value = 'world' // ❌不触发视图更新
})
```

```tsx [readonly]
import { reactive, readonly, onMounted } from 'vue'

const original = reactive({ count: 0 })
const copy = readonly(original)

onMounted(() => {
  original.count++ // 原对象修改会影响只读副本
  copy.count++ // [Vue warn] failed: target is readonly [!code warning]
})
```

```tsx [shallowReadonly]
import { shallowReadonly, onMounted } from 'vue'

const state = shallowReadonly({
  count: 0,
  nested: {
    value: 'hello',
  },
})

onMounted(() => {
  state.count++ // [Vue warn] failed: target is readonly [!code warning]
  state.nested.value = 'world' // ❌允许修改，但不触发视图更新
})
```

:::

## 三、计算属性

> 提供基于依赖缓存的派生值管理，自动追踪响应式依赖，支持读写操作，适用于需要优化计算性能或组合多个值的场景

- **核心特性**
  - 基于响应式依赖进行缓存
  - 自动追踪依赖关系
  - 提供 getter/setter 支持
- **适用场景**
  - 需要组合多个响应式数据的复杂逻辑
  - 需要缓存计算结果的场景
  - 需要响应式派生值的场景

### 特性对比

| API              | 缓存机制 | 可写性 | 依赖追踪方式 |
| ---------------- | :------: | :----: | ------------ |
| **`computed()`** |    ✅    |  可选  | 自动         |
| **普通函数**     |    ❌    |  只读  | 手动管理     |

### 代码示例

::: code-group

```tsx [基本用法]
import { ref, computed } from 'vue'

const firstName = ref('John')
const lastName = ref('Doe')

// 只读计算属性
const fullName = computed(() => {
  return `${firstName.value} ${lastName.value}`
})

// 可写计算属性
const writableFullName = computed({
  get() {
    return `${firstName.value} ${lastName.value}`
  },
  set(newValue) {
    ;[firstName.value, lastName.value] = newValue.split(' ')
  },
})

function changeName() {
  writableFullName.value = 'Jane Smith' // 自动拆分赋值
}
```

```tsx [性能优化]
import { ref, computed } from 'vue'

const list = ref([.../* 大型数据集 */])

// 缓存过滤结果，避免重复计算
const filteredList = computed(() => {
  return list.value.filter(item => item.active)
})

// 计算属性会自动缓存，只有依赖变化时才重新计算
const sortedList = computed(() => {
  return [...filteredList.value].sort((a, b) => a.id - b.id)
})
```

```tsx [分页缓存]
import { ref, computed } from 'vue'

export function usePagination(items, pageSize = 10) {
  // 当前页码（从1开始）
  const currentPage = ref(1)

  // 计算总页数（当items变化时自动更新）
  const totalPages = computed(() => Math.ceil(items.value.length / pageSize))

  // 计算当前页的数据切片（根据currentPage和pageSize自动更新）
  const paginatedItems = computed(() => {
    // 计算当前页的起始索引
    const start = (currentPage.value - 1) * pageSize
    // 计算当前页的结束索引
    const end = start + pageSize
    // 返回当前页的数据切片
    return items.value.slice(start, end)
  })

  return { currentPage, totalPages, paginatedItems }
}
```

:::

## 四、侦听器

> 提供灵活的数据监听机制，支持不同触发时机和粒度控制，适用于需要执行副作用或异步操作的场景

### 特性对比

| API                     | 依赖收集方式 | 执行时机                      | 初始执行 | 旧值访问 |
| ----------------------- | ------------ | ----------------------------- | :------: | :------: |
| **`watch()`**           | 显式指定     | 可配置（`pre`/`post`/`sync`） | 否(可选) |    ✅    |
| **`watchEffect()`**     | 自动收集     | 默认 `pre`（组件更新前）      | 立即执行 |    ❌    |
| **`watchPostEffect()`** | 自动收集     | `post`（组件更新后）          | 立即执行 |    ❌    |
| **`watchSyncEffect()`** | 自动收集     | `sync`（同步触发）            | 立即执行 |    ❌    |

### 代码示例

#### 抽象源码

::: code-group

```jsx [watch]
export function watch(source, cb, options?) {
  return doWatch(source, cb, options)
}
```

```jsx [watchEffect]
export function watchEffect(effect, options?) {
  return doWatch(effect, null, options)
}
```

```jsx [watchPostEffect]
export function watchPostEffect(effect, options?) {
  return doWatch(effect, null, { ...options, flush: 'post' })
}
```

```jsx [watchSyncEffect]
export function watchSyncEffect(effect, options?) {
  return doWatch(effect, null, { ...options, flush: 'sync' })
}
```

```ts [⭐ doWatch]
export type WatchSource<T = any> = Ref<T, any> | ComputedRef<T> | (() => T)
export type WatchEffect = (onCleanup: OnCleanup) => void
export type WatchCallback<V = any, OV = any> = (
  value: V,
  oldValue: OV,
  onCleanup: OnCleanup, // 清理副作用
) => any

function doWatch<T>(
  source: WatchSource | WatchSource[] | WatchEffect | object, // 响应式数据源
  cb: WatchCallback | null, // 数据变化回调处理
  options: {
    immediate?: boolean // 初始化时是否立即执行回调
    deep?: boolean | number // 嵌套对象深度监听或限制指定深度
    once?: boolean // 回调仅执行一次
    flush?: 'pre' | 'post' | 'sync'
  } = {}, // 监听配置选项
): () => void {}
```

:::

#### 实际应用

::: code-group

```tsx [watch]
import { ref, watch, onMounted } from 'vue'
const count = ref(0)

watch(
  count, // 显式指定侦听源
  (newVal, oldVal) => {
    console.log(`watch: 从 ${oldVal} 变为 ${newVal}`)
  },
  { immediate: true }, // 立即执行一次
)
```

```tsx [watchEffect]
// 特点：自动跟踪依赖，无回调参数，立即执行
import { ref, watchEffect } from 'vue'

const searchQuery = ref('')

watchEffect(() => {
  // 自动跟踪 searchQuery 依赖
  console.log('watchEffect 触发搜索:', searchQuery.value)
  // 模拟 API 调用
  fetchResults(searchQuery.value)
})
```

```tsx [watchPostEffect]
// 特点：DOM 更新后触发 (类似 Vue 2 的 $nextTick)
import { ref, watchPostEffect } from 'vue'

const isVisible = ref(false)
const modalElement = ref<HTMLElement | null>(null)

watchPostEffect(() => {
  if (isVisible.value && modalElement.value) {
    // DOM 已更新，可以安全操作元素
    modalElement.value.focus()
    console.log('watchPostEffect: 模态框已获得焦点')
  }
})
```

```tsx [watchSyncEffect]
// 特点：同步触发，适用于需要立即反应的场景
import { ref, watchSyncEffect } from 'vue'

const inputValue = ref('')
const validationError = ref('')

watchSyncEffect(() => {
  // 输入验证立即生效
  if (inputValue.value.length < 3) {
    validationError.value = '至少需要 3 个字符'
  } else {
    validationError.value = ''
  }
  console.log('watchSyncEffect: 同步验证完成')
})
```

:::

#### 扩展应用

::: code-group

```jsx [停止侦听]
import { watchEffect } from 'vue'

const unwatch = watchEffect(() => {})

unwatch()
```

```jsx [清理副作用]
import { ref, watch } from 'vue'

const id = ref(1)
const doAsyncWork = (id) => {
  let timer = null

  return {
    response: new Promise((resolve) => {
      timer = setTimeout(() => {
        resolve(`data: ${id}`)
      }, 1000)
    }),
    cancel() {
      clearTimeout(timer)
      console.log(`cancel: ${id}`)
    },
  }
}

watch(id, (newId, oldId, onCleanup) => {
  const { response, cancel } = doAsyncWork(newId)

  response.then((response) => console.log(response))
  // 如果之前的请求未完成，则取消该请求
  onCleanup(cancel) // [!code highlight]
})
```

:::
