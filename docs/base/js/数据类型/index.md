---
outline: [2, 3]
---

# 数据类型

## 一、基本类型

@import "./String.md"

### 2. **`Number`** <Sound word="Number"/>

### 3. **`Boolean`** <Sound word="Boolean"/>

### 4. **`null`** <Sound word="null"/>

### 5. **`underfind`** <Sound word="underfind"/>

### 6. **`Symbol`** <Sound word="Symbol"/>(ES6+)

### 7. **`BigInt`** <Sound word="BigInt"/>(ES2020+)

## 二、引用类型

### 1. **`Object`** <Sound word="Object"/>

### 2. **`Array`** <Sound word="Array"/>

### 3. **`Function`** <Sound word="Function"/>

@import "./Function.md"

### 4. **`Map`** <Sound word="Map"/>

### 5. **`WeakMap`** <Sound word="WeakMap"/>

### 6. **`Set`** <Sound word="Set"/>

### 7. **`Date`** <Sound word="Date"/>

### 8. **`RegExp`** <Sound word="RegExp"/> ⭐

@import "./RegExp.md"

### 9. **`Promise`** <Sound word="Promise"/>

## 三、类型判断

:::code-group
<<< @/examples/base/js/typeCheck/typeof.js [typeof]
<<< @/examples/base/js/typeCheck/toString.js [Object.prototype.toString]
<<< @/examples/base/js/typeCheck/instanceof.js [instanceof]
<<< @/examples/base/js/typeCheck/isArray.js [isArray]
<<< @/examples/base/js/typeCheck/isNaN.js [isNaN]
:::

## 四、隐式类型转换

> 预测 JavaScript 在隐式转换中的行为

### 1. 触发隐式类型转换

:::code-group
<<< @/examples/base/js/typeCoercion/arithmeticOps.js [算术运算符]
<<< @/examples/base/js/typeCoercion/comparisonOps.js [比较运算符]
<<< @/examples/base/js/typeCoercion/logicOps.js [逻辑运算符]
<<< @/examples/base/js/typeCoercion/conditionalCheck.js [条件判断]
<<< @/examples/base/js/typeCoercion/templateStr.js [模板字符串]
<<< @/examples/base/js/typeCoercion/propAccess.js [模板字符串]
<<< @/examples/base/js/typeCoercion/builtIns.js [内置函数]
:::

### 2. 对象到原始值的转换规则

> JavaScript 通过内部方法 `ToPrimitive` 转换对象，其行为由 `hint` 参数决定

**`hint`**: `"string"` 期望字符串 \| `"number"` 期望数字 \| `"default"` 不确定

| 场景                 |  目标类型   | 对象转换顺序（hint）   |
| -------------------- | :---------: | ---------------------- |
| 算术运算（除 `+`）   | `"number"`  | `valueOf` → `toString` |
| 加法 `+`（非字符串） | `"number"`  | `valueOf` → `toString` |
| 加法 `+`（含字符串） | `"string"`  | `toString` → `valueOf` |
| 比较运算符 `==`      | `"default"` | `valueOf` → `toString` |
| 模板字符串           | `"string"`  | `toString` → `valueOf` |
| 属性键               | `"string"`  | `toString` → `valueOf` |
| `Date` 对象参与运算  | `"string"`  | `toString` → `valueOf` |

:::code-group
<<< @/examples/base/js/typeCoercion/equalityWithObjects.js [逻辑运算符]
<<< @/examples/base/js/typeCoercion/objectAddition.js [对象加法运算]
<<< @/examples/base/js/typeCoercion/dateCoercion.js [Date加法运算]
:::

### 3. **`Symbol.toPrimitive`**

> 对象在被转换为原始值时，自定义的行为

<<< @/examples/base/js/typeCoercion/Symbol.toPrimitive.js
