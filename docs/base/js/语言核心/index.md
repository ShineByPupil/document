# 语言核心 - JavaScript

## 一、变量声明

::: tip 历史背景

从 ES5 的 `var` 到 ES6 的 `let` / `const`，主要解决以下问题：

1. 变量提升导致的意外行为
2. 全局污染问题（尤其浏览器环境）
3. 循环作用域问题
4. 缺乏真正的常量声明

:::

| 特性         | **`var`** | **`let`** | **`const`** |
| ------------ | :-------: | :-------: | :---------: |
| 作用域       |  函数级   |   块级    |    块级     |
| 重复声明     |    ✅     |    🚫     |     🚫      |
| 暂时性死区   |    ❌     |    ✅     |     ✅      |
| 全局属性绑定 |    是     |    否     |     否      |

```js [声明对比]
// ES5方式（存在变量提升）
console.log(hoistedVar) // undefined
var hoistedVar = 10

// ES6方式（块级作用域）
{
  let blockScoped = 20
  const PI = 3.1415926
}

console.log(blockScoped) // ReferenceError 访问了一个未定义的变量或引用
```

::: warning 注意事项

1. const 声明对象时，属性仍可修改（需配合 `Object.freeze`）
2. 避免在循环中使用 var 声明迭代变量

:::

## 二、作用域

### 1. 词法环境

> 是 JavaScript 中作用域的实现机制，它决定了代码在何处以及如何查找变量

- 环境记录（Environment Record）
  - 存储当前作用域内声明的变量、函数、参数等标识符（如 `let` / `const` / `function`）
- 对外部词法环境的引用（Outer Reference）
  - `outer` 指向外层作用域的词法环境，形成作用域链（Scope Chain），实现变量逐层向上查找

### 2. 作用域类型

| 特征         | 全局作用域     | 函数作用域       | 块级作用域（ES6+） |
| ------------ | -------------- | ---------------- | ------------------ |
| 作用域边界   | 最外层         | `function` 内部  | `{}` 内部          |
| 生命周期     | 页面关闭时销毁 | 函数执行结束销毁 | 块执行结束销毁     |
| 典型应用场景 | 全局配置项     | 封装函数内部逻辑 | 循环、条件语句等   |

### 3. 作用域链

> 函数在定义时形成的嵌套作用域层级结构，通过由内向外逐级查找变量，确保内部作用域能访问外层变量，而外层无法访问内层。

```js
let globalVar = 'global'

function outer() {
  let outerVar = 'outer'

  function inner() {
    let innerVar = 'inner'
    console.log(globalVar) // 通过作用域链向上查找
  }

  inner()
}

outer()
```

### 4. this 指向

绑定规则

| 调用方式        | this 指向              | 示例                |
| --------------- | ---------------------- | ------------------- |
| 普通函数调用    | `window` / `undefined` | `func()`            |
| 方法调用        | 调用对象               | `obj.method()`      |
| new 调用        | 新创建实例             | `new Constructor()` |
| call/apply/bind | 指定对象               | `func.call(ctx)`    |

## 三、闭包

> 是函数与其声明时词法环境的**绑定关系**，使得函数可以持续访问其外部作用域的变量，即使外层函数已执行完毕。
> 这种机制通过维持变量引用阻止垃圾回收，是 JavaScript 实现模块化和状态保持的核心模式。

### 1. 闭包应用

| 应用场景       | 说明                           |
| -------------- | ------------------------------ |
| 私有变量       | 封装变量，只暴露必要接口       |
| 缓存与持久化   | 记住状态，如缓存配置或数据     |
| 模块封装       | 隔离内部逻辑，避免全局变量污染 |
| 工厂函数       | 创建带参数的函数模板或行为函数 |
| 事件监听       | 保留绑定时的上下文状态         |
| 惰性计算       | 延迟执行并缓存结果，提升性能   |
| 异步上下文保持 | 异步/回调中维持原始执行上下文  |

:::details 模拟私有字段

```js
function createCounter() {
  let count = 0 // 闭包中的私有变量
  return {
    increment() {
      count++
    },
    get value() {
      return count
    },
  }
}
const counter = createCounter()
counter.increment()
console.log(counter.value) // 1
console.log(counter.count) // undefined（无法直接访问）
```

:::

:::details 数据持久化与状态管理

```js
function createUserPrefs() {
  const prefs = {} // 闭包中持久化存储用户偏好
  return {
    set(key, value) {
      prefs[key] = value
    }, // 设置偏好
    get(key) {
      return prefs[key]
    }, // 读取偏好
    getAll() {
      return { ...prefs }
    }, // 返回副本，避免直接修改
  }
}
const userPrefs = createUserPrefs()
userPrefs.set('theme', 'dark')
console.log(userPrefs.get('theme')) // 'dark'
```

:::

:::details 模块化开发

```js
const MyModule = (function () {
  let internalData = 'secret' // 模块私有数据
  function privateMethod() {
    /* ... */
  }
  return {
    publicMethod() {
      privateMethod()
      return internalData
    },
  }
})()
console.log(MyModule.publicMethod()) // 'secret'
console.log(MyModule.internalData) // undefined
```

:::

:::details 函数工厂

```js
function createMultiplier(factor) {
  return function (number) {
    return number * factor // 闭包保留 factor 的值
  }
}
const double = createMultiplier(2)
const triple = createMultiplier(3)
console.log(double(5)) // 10（factor=2 被闭包保留）
```

- 防抖
  - 执行时机：停止触发后 wait 时间执行
  - 高频触发效果：只执行最后一次
  - 适用场景：搜索框输入联想

```js
function debounce(func, wait) {
  let timeoutID = null

  return function () {
    timeoutID && clearTimeout(timeoutID)
    timeoutID = setTimeout(func, wait)
  }
}
```

- 节流
  - 执行时机：每隔 wait 时间执行一次
  - 高频触发效果：均匀间隔执行
  - 适用场景：滚动事件

```js
function throttle(func, wait) {
  let timeoutID = null

  return function () {
    if (!timeoutID) {
      timeoutID = setTimeout(() => {
        func()
        timeoutID = 0
      }, wait)
    }
  }
}
```

:::

### 2. 闭包与类的区别

| 特性       | **闭包**                           | **类（Class）**                |
| ---------- | ---------------------------------- | ------------------------------ |
| 状态独立性 | 每次调用生成独立实例               | 通过 `new` 生成独立实例        |
| 私有性     | 变量天然私有（无暴露途径）         | 需要 `#` 前缀声明私有字段      |
| 内存效率   | 每个实例独立持有方法（内存占用高） | 方法共享在原型上（内存高效）   |
| 继承       | 无直接继承机制，需手动组合         | 支持 `extends` 继承            |
| 代码结构   | 适合简单逻辑，函数式风格           | 适合复杂对象建模，面向对象风格 |
| 性能       | 高频调用时可能较慢（无优化）       | 方法调用通常更快（引擎优化）   |
| 动态性     | 可动态生成不同行为的函数           | 行为由类定义固定               |

::: warning 性能考量

闭包会导致内存驻留，需注意：

- 避免不必要的闭包嵌套
- 及时解除不再使用的引用
- 使用 Chrome DevTools Memory 面板分析

:::

## 四、Class 类

| 实现方式 | **ES5 原型继承**   | **ES6 类继承**       |
| -------- | ------------------ | -------------------- |
| 语法     | 函数+原型          | `class` 语法糖       |
| 静态方法 | 手动添加到构造函数 | `static` 关键字      |
| 私有字段 | 约定式（\_前缀）   | #语法支持            |
| 兼容性   | 全浏览器支持       | 需要 transpiler 转换 |
| 可读性   | 较低               | 接近传统 OOP         |

### 1. ES6 类继承

- `class` 声明类
- `extends` 实现类继承，自动处理原型链
- `constructor` 定义构造函数
- `super` 在子类中调用父类构造函数 `super(...args)` 或方法 `super.method()`
- `static` 定义类级别的静态方法
- `getter` / `setter` 使用 `get` 和 `set` 定义属性的访问器
- `#` 私有字段

:::details ES6 类继承

```js
// ================== Animal 父类 ==================
class Animal {
  constructor(name) {
    this.name = name
  }

  speak() {
    console.log(`${this.name} 发出叫声`)
  }

  static create(name) {
    return new Animal(name)
  }
}

// ================== Dog 子类 ==================
class Dog extends Animal {
  #breed // 私有字段

  constructor(name, breed) {
    super(name) // 调用父类构造函数
    this.#breed = breed
  }

  speak() {
    super.speak() // 调用父类方法
    console.log(`${this.name} (${this.#breed})`)
  }

  static {
    // 静态初始化块（ES2022）
    console.log('Dog class 初始化')
  }
}

new Dog('狗狗', '金毛猎犬').speak()
```

:::

### 2. ES5 原型继承

- `function Parent() {}` 定义构造函数
- `prototype.constructor =` 显式设置指向构造函数
- `this.prop =` 定义实例属性
- `prototype.method =` 定义实例方法
- `Parent.method =` 定义静态方法
- `Object.create(Parent.prototype)` 创建原型对象，实现类继承
- `Parent.call(this, ...args)` 子类继承父类实例属性

:::details ES5 原型继承

```js
// ================== Animal 父类 ==================
let Animal = (function () {
  function Animal(name) {
    this.name = name
  }

  Animal.prototype.constructor = Animal
  Animal.prototype.speak = function () {
    console.log(`${this.name} 发出叫声`)
  }
  Animal.create = function (name) {
    return new Animal(name)
  }

  return Animal
})()

// ================== Dog 子类 ==================
let Dog = (function () {
  function Dog(name, breed) {
    Animal.call(this, name)
    this._breed = breed
  }

  Dog.prototype.constructor = Dog
  Dog.prototype = Object.create(Animal.prototype)
  Dog.prototype.speak = function () {
    Animal.prototype.speak.call(this)
    console.log(`${this.name} (${this._breed})`)
  }
  ;(function () {
    console.log('Dog class 初始化')
  })()

  return Dog
})()

// 测试用例
new Dog('狗狗', '金毛猎犬').speak()
```

:::

:::tooltip-map

{
"变量提升": "指声明被提升到作用域顶部，赋值仍保持原位置，仅适用于 var 与 function",
"块级作用域": "在 {} 范围内有效的作用域，由 let / const / class 等引入",
"词法环境": "执行上下文中用于存储标识符绑定关系的结构",
"作用域链": "当前词法环境与其外部环境形成的链式结构，用于变量查找",
"闭包": "函数与其创建时词法环境的组合，允许访问外部作用域变量",
"垃圾回收": "自动内存管理机制，未被引用的对象会被回收",
"构造函数": "通过 new 调用时，用于生成对象实例的函数",
"原型链": "JavaScript 对象继承机制，向上查找属性或方法",
"私有字段": "使用 # 定义的类中字段，仅限类内部访问",
"静态方法": "定义在类本身而非实例上的方法，通常用于工厂方法等",
"暂时性死区": "变量声明前，访问会报错"
}

:::
