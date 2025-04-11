#### 定义方式

:::code-group
<<< @/examples/base/js/dataType/Function/functionTypes.js [函数声明/表达式]
<<< @/examples/base/js/dataType/Function/arrowContext.js [箭头函数(ES6)]
<<< @/examples/base/js/dataType/Function/functionConstructor.js [构造函数]
:::

#### 原型链方法

:::code-group
<<< @/examples/base/js/dataType/Function/call.js [call]
<<< @/examples/base/js/dataType/Function/apply.js [apply]
<<< @/examples/base/js/dataType/Function/bind.js [bind]
:::

#### 动态绑定/静态绑定

> 虽然 `call` / `apply` / `bind` 不能直接修改箭头函数的this指向，但是可以影响外层普通函数的this指向

| 特性               | 动态绑定（普通函数）        | 静态绑定（箭头函数）              |
| ------------------ | --------------------------- | --------------------------------- |
| this 确定时机      | 调用时动态确定              | 定义时静态绑定                    |
| 能否通过 call 修改 | ✅                          | ❌                                |
| 继承性             | ❌完全由调用方式决定        | ✅继承外层函数或全局作用域的 this |
| 适用场景           | 需要动态 this（如对象方法） | 需要固定 this（如回调函数）       |

#### 考验理解

:::code-group
<<< @/examples/base/js/dataType/Function/question.js [问题]
<<< @/examples/base/js/dataType/Function/answer.js [答案]
:::
