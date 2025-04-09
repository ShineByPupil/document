---
outline: [2, 3]
---

# 异步编程 - JavaScript

## 事件循环

> JavaScript 单线程运行时环境的核心调度机制，通过循环检查任务队列，按优先级执行异步任务的回调，实现“非阻塞”并发

### 1. 事件循环流程

1. **执行一个宏任务**
   - 从多个宏任务队列中，根据（任务源）优先级最高，选择一个任务执行
2. **清空微任务队列**
   - 依次执行所有微任务，包括执行过程中新产生的微任务
   - `Promise`, `MutationObserver`, `queueMicrotask`
3. **判断是否需要渲染**（距离上次渲染 ≥ 屏幕刷新间隔）
   - **条件**：距离上次渲染时间 ≥ 屏幕刷新间隔 && 存在DOM修改
   - **若需要渲染**，进入渲染阶段：
     1. 执行 `requestAnimationFrame` 的回调（一次性）
     2. 样式计算（Style Calculation）：计算所有元素的最终 CSS 样式
     3. 布局计算（Reflow）：计算元素几何信息（位置、尺寸等）
     4. 执行 `ResizeObserver`、`IntersectionObserver` 的回调（布局后触发，可访问最新布局信息）
     5. 绘制（Repaint）：生成绘制指令（实际像素填充由合成线程处理）
     6. 合成（Composite）：将图层合并到屏幕上
   - **若不需要渲染**，跳过此阶段
4. **循环处理新任务**
   - 回到步骤 1，继续处理宏任务队列中的任务
5. **空闲阶段（Idle Period）**
   - 执行 `requestIdleCallback` 的回调（一次性）

:::warning 注意事项

1. **微任务递归风险**
   - 避免在微任务中（递归）无限生成新微任务，否则会阻塞事件循环，导致页面卡死。
2. **强制同步布局问题**
   - 在微任务中读取布局属性（如 `offsetHeight`）会强制立即重排，打断浏览器优化。
   - 遵循 **读写分离原则**：批量写入 → 统一读取 → 再次批量写入。

:::

### 2. 任务源

> HTML 标准定义了多种任务源（Task Source），浏览器会为每个任务源维护独立的队列

|  任务源类型  | 对应 API/事件                                   | 优先级示例             |
| :----------: | ----------------------------------------------- | ---------------------- |
| **用户交互** | `click`、`input`、`keydown`                     | 最高（即时响应）       |
| **网络请求** | `fetch`、`XMLHttpRequest` 回调                  | 中（依赖返回速度）     |
|  **定时器**  | `setTimeout`、`setInterval`                     | 中低（允许延迟）       |
| **渲染任务** | `requestAnimationFrame`                         | 与渲染帧对齐           |
| **历史操作** | `history.pushState` 回调                        | 低                     |
|  **微任务**  | `Promise`、`MutationObserver`、`queueMicrotask` | 特殊（非队列，见下文） |

### 3. 事件循环 VS 多线程

| 场景           | 事件循环                            | 多线程                         |
| -------------- | ----------------------------------- | ------------------------------ |
| DOM 操作       | ✅ 天然安全，无需同步               | ❌ 需加锁，否则崩溃            |
| I/O 密集型任务 | ✅ 非阻塞，高并发（如处理 1k 请求） | ✅ 线程池可提升吞吐量          |
| CPU 密集型任务 | ❌ 阻塞主线程（如大数据计算）       | ✅ 并行计算利用多核            |
| 开发复杂度     | ✅ 简单，无锁、无竞态               | ❌ 高，需处理线程同步          |
| 调试难度       | ✅ 确定性执行，易追溯               | ❌ 非确定性执行，难复现问题    |
| 内存占用       | ✅ 低（单线程）                     | ❌ 高（每线程需独立栈/上下文） |

## 一、回调函数模式

> 回调地狱模式：多层回调嵌套，导致代码可读性差，难以维护，且易出错

:::code-group

```js [回调地狱示例]
getUser(userId, (user) => {
  getOrders(user.id, (orders) => {
    getProducts(orders[0].id, (product) => {
      console.log(product)
    })
  })
})
```

```js [解决方案]
// 解决方案：解构为命名函数
function handleProduct(product) {
  console.log(product)
}

function handleOrders(user, orders) {
  getProducts(orders[0].id, handleProduct)
}

function handleUser(user) {
  getOrders(user.id, (orders) => handleOrders(user, orders))
}

getUser(userId, handleUser)
```

:::

## 二、宏任务

### 1. **`setTimeout`** <Sound word="setTimeout"/>

> 单次定时器，在指定延迟时间（毫秒）后执行回调函数

:::code-group

```js [基础语法]
// 创建定时器
const timeoutID = setTimeout(() => {
  // ...
}, delay)

// 取消定时器
clearTimeout(timeoutID)
```

```js [防抖函数]
function debounce(cb, wait = 0) {
  let timeoutID = 0

  return function () {
    timeoutID && clearTimeout(timeoutID)
    timeoutID = setTimeout(cb, wait)
  }
}

const debounced = debounce(function () {
  // ...
}, 1000)

document.addEventListener('sroll', debounced)
```

:::

### 2. **`setInterval`** <Sound word="setInterval"/>

> 周期定时器，每隔指定延迟时间（毫秒）执行回调函数

```js
// 创建定时器
const intervalID = setInterval(() => {
  // ...
}, delay)

// 取消定时器
clearInterval(intervalID)
```

### 3. **`requestAnimationFrame`** <Sound word="requestAnimationFrame"/>

> 本质是浏览器渲染帧级别的定时器，与屏幕刷新率同步

- 已优化的事件
  - `scroll`/`resize`/`keydown`/`mousedown`/`mouseup`
- 未优化的事件
  - `drag`/`mousewheel`/`wheel`/`mousewheel`/`mousemove`

:::code-group

```js [基础语法]
// 创建
const id = requestAnimationFrame(() => {
  // ...
})

// 取消
cancelAnimationFrame(id)
```

```js [渲染帧防抖]
const rafDebounce = function (fn) {
  let rafId = null

  return function (...args) {
    rafId && cancelAnimationFrame(rafId)
    rafId = requestAnimationFrame(() => fn.apply(this, args))
  }
}

const handleMousemove = rafDebounce((e) => {
  // ...
})
window.addEventListener('mousemove', handleMousemove)
```

```js [测试事件]
let a = 0
let b = 0
let RAFId = null
let eventType = 'mouseup'

window.addEventListener(eventType, (e) => {
  console.log(`${eventType}事件频率:`, ++a)
  RAFId && cancelAnimationFrame(RAFId)

  RAFId = requestAnimationFrame(() => {
    console.log('RAF频率:', ++b)
    RAFId = null
  })
})
```

:::

### 4. **`requestIdleCallback`** <Sound word="requestIdleCallback"/>

> 浏览器提供的调度接口，允许开发者在主线程空闲时段执行非阻塞性任务

:::code-group

```js [基础语法]
requestIdleCallback(
  (deadline) => {
    // deadline.timeRemaining() 获取剩余空闲时间(ms)
    // deadline.didTimeout 是否触发超时

    if (deadline.timeRemaining() > 0) {
      // 执行微任务...
    }
  },
  { timeout: 2000 }, // 可选参数：强制触发等待时间
)
```

```js [空闲任务处理]
function processTask(deadline) {
  while (
    (deadline.timeRemaining() > 0 || deadline.didTimeout) &&
    tasks.length > 0
  ) {
    performTask(tasks.pop())
  }

  if (tasks.length > 0) {
    requestIdleCallback(processTask, { timeout: 1000 })
  }
}

requestIdleCallback(processTask, { timeout: 1000 })
```

```js [大数据处理分片]
const bigData = new Array(1e5).fill().map(() => Math.random())

function chunkedProcess(start = 0, chunkSize = 1000) {
  const end = Math.min(start + chunkSize, bigData.length)

  for (let i = start; i < end; i++) {
    processItem(bigData[i])
  }

  if (end < bigData.length) {
    requestIdleCallback(() => {
      chunkedProcess(end)
    })
  }
}
```

:::

## 三、微任务

### 1. **`Promise`** <Sound word="Promise"/>

> ES6 引入的**异步编程解决方案**，以标准化、链式化的方式管理异步操作状态。提供统一的错误处理与流程控制，替代传统回调地狱模式。

1. **三种状态**：`pending`（进行中）、`fulfilled`（已成功）、`rejected`（已失败）
2. **不可逆状态**。状态一旦改变不可回退（`pending` → `fulfilled`/`rejected`）
3. **链式调用**。通过 `.then()` 串联多个异步操作
4. **错误冒泡**。异常会沿链式调用传递直至被捕获
5. **组合控制**。`Promise.all`/`race`/`allSettled` 实现复杂异步控制

:::code-group

```js [基础语法]
const promise = new Promise((resolve, reject) => {
  // 异步操作（如 API 请求、定时器等）
  setTimeout(() => {
    const success = true // 模拟操作是否成功
    if (success) {
      resolve('操作成功！') // 状态变为 Fulfilled
    } else {
      reject('操作失败！') // 状态变为 Rejected
    }
  }, 1000)
})

promise
  .then((result) => {
    console.log(result) // 输出 "操作成功！"（Fulfilled 状态）
  })
  .catch((error) => {
    console.error(error) // 输出 "操作失败！"（Rejected 状态）
  })
  .finally(() => {
    console.log('无论成功与否都会执行')
  })
```

```js [all]
const promise1 = new Promise((resolve) =>
  setTimeout(() => resolve('操作成功！'), 1000),
)
const promise2 = Promise.reject('失败！')
const promise3 = Promise.resolve('成功！')

// 特点：等待所有 Promise 都成功
Promise.all([promise1, promise2, promise3])
  .then((results) => {
    console.log('全部成功:', results) // 不会执行（因 promise2 失败）
  })
  .catch((err) => {
    console.error('首个失败:', err) // 立即输出 "失败！"
  })
```

```js [allSettled]
// 特点：等待所有 Promise 完成，无论成功失败
Promise.allSettled([promise1, promise2, promise3]).then((results) => {
  results.forEach((result, index) => {
    if (result.status === 'fulfilled') {
      console.log(`Promise${index + 1} 成功：`, result.value)
    } else {
      console.error(`Promise${index + 1} 失败：`, result.reason)
    }
  })
})
```

```js [any]
// 特点：首个成功则 resolve，全失败则 reject
const p1 = Promise.reject('错误1')
const p2 = new Promise((resolve) => setTimeout(() => resolve('延迟成功'), 500))
const p3 = Promise.reject('错误3')

Promise.any([p1, p2, p3])
  .then((result) => {
    console.log('首个成功：', result) // 500ms 后输出 "延迟成功"
  })
  .catch((err) => {
    console.error('全部失败：', err.errors) // 全失败时执行
  })
```

```js [race]
// 特点：采用首个完成的 Promise（不论成败）
const fastFailure = new Promise((_, reject) =>
  setTimeout(reject, 200, '快速失败'),
)
const slowSuccess = new Promise((resolve) =>
  setTimeout(resolve, 500, '慢速成功'),
)

Promise.race([fastFailure, slowSuccess])
  .then((result) => console.log('成功结果：', result))
  .catch((err) => console.error('失败原因：', err)) // 200ms 后输出 "快速失败"
```

:::

#### API

| 名称                       | 说明                                                              |
| -------------------------- | ----------------------------------------------------------------- |
| **实例属性**               |                                                                   |
| **`[[PromiseState]]`**     | 表示 Promise 的当前状态：`"pending"`、`"fulfilled"`、`"rejected"` |
| **`[[PromiseResult]]`**    | 存储 `resolve(value)` 或 `reject(reason)` 传递的值。              |
| **静态方法**               |                                                                   |
| **`Promise.resolve()`**    | 创建一个已解决的 Promise 对象                                     |
| **`Promise.reject()`**     | 创建一个已拒绝的 Promise 对象                                     |
| **`Promise.all()`**        | 等待所有 Promise 完成，全部成功时返回结果数组，有一个失败立即拒绝 |
| **`Promise.allSettled()`** | 等待所有 Promise 完成（无论成功/失败），返回状态结果数组          |
| **`Promise.any()`**        | 任意一个 Promise 成功时返回其值，全部失败时拒绝                   |
| **`Promise.race()`**       | 返回第一个完成的 Promise（无论成功/失败）                         |
| **实例方法**               |                                                                   |
| **`then()`**               | 添加解决回调                                                      |
| **`catch()`**              | 添加拒绝回调                                                      |
| **`finally()`**            | 添加最终回调（无论成功/失败都会执行）                             |

::: details 原生代码实现

```js
class MyPromise {
  constructor(executor) {
    this.state = 'pending' // 初始状态
    this.value = undefined // 成功结果值
    this.reason = undefined // 失败原因
    this.onFulfilledCallbacks = [] // 成功回调队列
    this.onRejectedCallbacks = [] // 失败回调队列

    const resolve = (value) => {
      // resolve函数
      if (this.state === 'pending') {
        // 只有pending状态可转换
        this.state = 'fulfilled'
        this.value = value
        this.onFulfilledCallbacks.forEach((cb) => cb()) // 执行所有成功回调
      }
    }

    const reject = (reason) => {
      // reject函数
      if (this.state === 'pending') {
        this.state = 'rejected'
        this.reason = reason
        this.onRejectedCallbacks.forEach((cb) => cb()) // 执行所有失败回调
      }
    }

    try {
      executor(resolve, reject) // 立即执行executor
    } catch (err) {
      reject(err) // executor执行出错直接reject
    }
  }

  then(onFulfilled, onRejected) {
    // then方法实现链式调用
    onFulfilled =
      typeof onFulfilled === 'function' ? onFulfilled : (value) => value // 默认值穿透处理
    onRejected =
      typeof onRejected === 'function'
        ? onRejected
        : (err) => {
            throw err
          }

    const newPromise = new MyPromise((resolve, reject) => {
      // 创建新Promise
      const handleFulfilled = () => {
        // 封装成功处理逻辑
        queueMicrotask(() => {
          // 微任务异步执行
          try {
            const x = onFulfilled(this.value) // 执行回调获取返回值
            resolvePromise(newPromise, x, resolve, reject) // 处理返回值
          } catch (err) {
            reject(err) // 回调执行出错直接reject
          }
        })
      }

      const handleRejected = () => {
        // 封装失败处理逻辑
        queueMicrotask(() => {
          try {
            const x = onRejected(this.reason)
            resolvePromise(newPromise, x, resolve, reject)
          } catch (err) {
            reject(err)
          }
        })
      }

      if (this.state === 'fulfilled') {
        // 已成功直接执行
        handleFulfilled()
      } else if (this.state === 'rejected') {
        // 已失败直接执行
        handleRejected()
      } else {
        // pending状态存入回调队列
        this.onFulfilledCallbacks.push(handleFulfilled)
        this.onRejectedCallbacks.push(handleRejected)
      }
    })

    return newPromise // 返回新Promise实现链式调用
  }

  catch(onRejected) {
    // catch方法语法糖
    return this.then(undefined, onRejected)
  }

  finally(onFinally) {
    // finally方法实现
    return this.then(
      (value) => MyPromise.resolve(onFinally()).then(() => value), // 成功时保留原值
      (reason) =>
        MyPromise.resolve(onFinally()).then(() => {
          throw reason
        }), // 失败时保留原因
    )
  }

  static resolve(value) {
    // 静态resolve方法
    if (value instanceof MyPromise) return value // 如果是Promise实例直接返回
    return new MyPromise((resolve) => resolve(value)) // 包装成成功状态
  }

  static reject(reason) {
    // 静态reject方法
    return new MyPromise((_, reject) => reject(reason)) // 包装成失败状态
  }
}

function resolvePromise(newPromise, x, resolve, reject) {
  // 处理Promise解析过程
  if (newPromise === x) {
    // 循环引用检测
    reject(new TypeError('Chaining cycle detected'))
    return
  }

  let called = false // 防止多次调用标志
  if ((typeof x === 'object' && x !== null) || typeof x === 'function') {
    // 判断是否为对象/函数
    try {
      const then = x.then // 获取then方法引用
      if (typeof then === 'function') {
        // 判断是否为thenable对象
        then.call(
          x,
          (y) => {
            // resolve回调
            if (called) return
            called = true
            resolvePromise(newPromise, y, resolve, reject) // 递归解析
          },
          (r) => {
            // reject回调
            if (called) return
            called = true
            reject(r)
          },
        )
      } else {
        // 普通对象直接resolve
        resolve(x)
      }
    } catch (err) {
      // 获取then时出错
      if (called) return
      reject(err)
    }
  } else {
    // 基础类型值直接resolve
    resolve(x)
  }
}
```

:::

### 2. **`async`** <Sound word="async"/> / **`await`** <Sound word="await"/>

> ES2017 引入的**异步编程语法糖**，基于 `Promise` 实现。通过**同步写法**处理异步操作，提升代码可读性，是 `Promise` 的更高级抽象。

:::code-group

```js [错误处理简化]
// Promise 风格
function promiseStyle() {
  return asyncTask().then(handleSuccess).catch(handleError)
}

// async/await 风格
async function awaitStyle() {
  try {
    const result = await asyncTask()
    return handleSuccess(result)
  } catch (err) {
    return handleError(err)
  }
}
```

```js [并行优化]
// ❌ 串行总时间(慢) ≈ task1时间 + task2时间
const a = await task1() // [!code error]
const b = await task2() // [!code error]

// ✅ 并行总时间(快) ≈ max(task1时间, task2时间)
const [a, b] = await Promise.all([task1(), task2()])
```

```js [循环处理]
async function batchProcess(items) {
  for (const item of items) {
    await processItem(item) // 串行执行
  }
}
```

```js [立即执行模式]
!(async () => {
  const data = await fetchData()
  render(data)
})()
```

:::

### 3. **`queueMicrotask`** <Sound word="queueMicrotask"/>

> 浏览器提供的微任务队列管理 API，用于将任务加入微任务队列。比 Promise.resolve().then() 更直观的微任务调度方式，确保代码在本次事件循环结束前执行

:::code-group

```js [基础语法]
console.log('开始')

queueMicrotask(() => {
  console.log('微任务执行')
})

console.log('结束')
// 输出顺序：开始 → 结束 → 微任务执行
```

```js [Promise 配合]
function asyncOperation() {
  return new Promise((resolve) => {
    queueMicrotask(() => {
      console.log('微任务中处理')
      resolve()
    })
  })
}
```

```js [错误处理]
queueMicrotask(() => {
  try {
    riskyOperation()
  } catch (err) {
    handleError(err)
  }
})
```

:::
