> 基于**一维流式布局模型**，通过弹性容器（Flex Container）控制子元素在主轴（Main Axis）与交叉轴（Cross
> Axis）上的排列、对齐和空间分配，为响应式布局和动态内容适配提供了高效解决方案。

### 父容器属性

:::demo onlyShow
base/css/FlexContainer/index
:::

- **`display`** <Sound word="display"/>
  - 定义弹性容器
  - 可选值：`flex` / `inline-flex`
- **`flex-direction`** <Sound word="flex-direction"/>
  - 设置主轴方向
  - 可选值：`row`(默认) / `row-reverse` / `column` / `column-reverse`
- **`flex-wrap`** <Sound word="flex-wrap"/>
  - 设置换行方式
  - 可选值：`nowrap`(默认) / `wrap` / `wrap-reverse`
- **`justify-content`** <Sound word="justify-content"/>
  - 设置主轴对齐方式
  - 可选值：`flex-start`(默认) / `flex-end` / `center` / `space-between` / `space-around` / `space-evenly`
- **`align-items`** <Sound word="align-items"/>
  - 设置(单行)交叉轴对齐方式
  - 可选值：`stretch`(默认) / `flex-start` / `flex-end` / `center` / `baseline`
- **`align-content`** <Sound word="align-content"/>
  - 设置(多行)交叉轴分布方式
  - 可选值：`stretch`(默认) / `flex-start` / `flex-end` / `center` / `space-between` / `space-around`
- **`gap`** <Sound word="gap"/>
  - 设置子项的间距
  - 可选值：`<length>` / `[row-gap] [column-gap]`
- **`place-content`** <Sound word="place-content"/>
  - 省略第二个值时取相同值
  - 复合属性：`[justify-content] [align-content]`

### 子项目属性

:::demo onlyShow
base/css/FlexItemController/index
:::

- **`order`** <Sound word="order"/>
  - 项目排序，从小到大
  - 可选值：`<integer>`（默认值0）
- **`flex-grow`** <Sound word="flex-grow"/>
  - 扩展比例，0=不扩展
  - 可选值：`<number>`（默认值0）
- **`flex-shrink`** <Sound word="flex-shrink"/>
  - 收缩比例，0=禁止收缩
  - 可选值：`<number>`（默认值1）
- **`flex-basis`** <Sound word="flex-basis"/>
  - 初始尺寸
  - 可选值：`<width>` / `content`
- **`align-self`** <Sound word="align-self"/>
  - 交叉轴对齐方式
  - 可选值：`auto` / `stretch` / `flex-start` / `flex-end` / `center` / `baseline`

### **`flex`** <Sound word="flex"/>

| 简写格式               | 等效展开                        |
| ---------------------- | ------------------------------- |
| **单值语法**           |                                 |
| `flex: <number>`       | `flex: <number> 1 0%`           |
| `flex: <length>`       | `flex: 1 1 <length>`            |
| `flex: none`           | `flex: 0 0 auto`                |
| **双值语法**           |                                 |
| `flex: <num> <num>`    | `flex: <num1> <num2> 0%`        |
| `flex: <num> <length>` | `flex: <num> 1 <length>`        |
| **三值语法**           |                                 |
| `flex: <g> <s> <b>`    | `flex: [grow] [shrink] [basis]` |
