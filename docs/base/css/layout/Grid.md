> 基于**二维网格的布局模型**，将容器划分为行（Row）与列（Column），并精准控制子元素的排列规则，彻底改变了传统布局方式

:::demo onlyShow
base/css/GridContainer/GridDemo
:::

| 概念              | 定义                                                 | 相关属性                                             |
| ----------------- | ---------------------------------------------------- | ---------------------------------------------------- |
| **轨道 (Track)**  | 网格的行或列，定义显式轨道                           | - `grid-template-columns` <br>- `grid-template-rows` |
| **隐式轨道**      | 当项目超出显式网格时自动创建的轨道                   | - `grid-auto-rows` <br>- `grid-auto-columns`         |
| **网格线 (Line)** | 轨道之间的分隔线，可命名用于精确定位                 | - `grid-column-start` <br>- `grid-column-end`        |
| **单元格 (Cell)** | 网格中行和列的交叉区域<br>（最小的布局单元）         | 自动生成                                             |
| **区域 (Area)**   | 一个或多个连续单元格组成的矩形区域<br>（需预先命名） | `grid-template-areas`                                |
| **间隙 (Gap)**    | 轨道之间的间距                                       | `gap` / `row-gap` / `column-gap`                     |
| **流控制**        | 自动放置项目的算法规则                               | `grid-auto-flow`                                     |

### 父容器属性

- **`display`** <Sound word="display"/>
  - 定义容器为网格布局
  - 可选值：`grid` / `inline-grid`
- **`grid-template-columns`** <Sound word="grid-template-columns"/>
  - 显式定义**列轨道**的尺寸和线名
  - 可选值：`<track-size>` / `<line-name>`
- **`grid-template-rows`** <Sound word="grid-template-rows"/>
  - 显式定义**行轨道**的尺寸和线名
  - 可选值：`<track-size>` / `<line-name>`
- **`grid-template-areas`** <Sound word="grid-template-areas"/>
  - 通过命名区域定义布局，子项通过 `grid-area` 引用名称。区域需为矩形
  - 可选值：`"<area-name> ..."`
- **`grid-auto-columns`** <Sound word="grid-auto-columns"/>
  - 定义**隐式列轨道**尺寸(当项目超出显式网格时)
  - 可选值： `<track-size>`
- **`grid-auto-rows`** <Sound word="grid-auto-rows"/>
  - 定义**隐式行轨道**尺寸
  - 可选值： `<track-size>`
- **`grid-auto-flow`** <Sound word="grid-auto-flow"/>
  - 控制自动放置算法流向`dense` 表示尽量填满空隙
  - 可选值：`row` / `column` / `row dense` / `column dense`
- **`gap`** <Sound word="gap"/>
  - 网格间距
  - 可选值：`[row-gap] [column-gap]`
- **`align-items`** <Sound word="align-items"/>
  - 控制单元格内项目的垂直对齐方式
  - 可选值：`start` / `end` / `center` / `stretch`
- **`justify-items`** <Sound word="justify-items"/>
  - 控制单元格内项目的水平对齐方式
  - 可选值：`start` / `end` / `center` / `stretch`
- **`place-items`** <Sound word="place-items"/>
  - 复合属性
  - 可选值：`[align-items] [justify-items]`
- **`align-content`** <Sound word="align-content"/>
  - 整个网格在容器中的**垂直**分布方式
  - 可选值：`start` / `end` / `center` / `stretch` / `space-around` / `space-between` / `space-evenly`
- **`justify-content`** <Sound word="justify-content"/>
  - 整个网格在容器中的**水平**分布方式
  - 可选值：`start` / `end` / `center` / `stretch` / `space-around` / `space-between` / `space-evenly`
- **`place-content`** <Sound word="place-content"/>
  - 复合属性
  - 可选值：`[align-content] [justify-content]`

### 子项目属性

- **`grid-column-start`** <Sound word="grid-column-start"/>
  - 指定项目在列方向上的起始位置（通过线号、线名或跨越轨道数）。auto 表示自动放置
  - 可选值：`<number>` / `<line-name>` / `span <number>` / `span <line-name>` / `auto`
- **`grid-column-end`** <Sound word="grid-column-end"/>
  - 指定项目在列方向上的**结束位置**
  - 可选值：`<number>` / `<line-name>` / `span <number>` / `span <line-name>` / `auto`
- **`grid-row-start`** <Sound word="grid-row-start"/>
  - 指定项目在行方向上的**起始位置**
  - 可选值：`<number>` / `<line-name>` / `span <number>` / `span <line-name>` / `auto`
- **`grid-row-end`** <Sound word="grid-row-end"/>
  - 指定项目在行方向上的**结束位置**
  - 可选值：`<number>` / `<line-name>` / `span <number>` / `span <line-name>` / `auto`
- **`grid-column`** <Sound word="grid-column"/>
  - 简写属性。同时定义 `grid-column-start` 和 `grid-column-end`
  - 可选值：`<start-line> / <end-line>`
- **`grid-row`** <Sound word="grid-row"/>
  - 简写属性，同时定义 `grid-row-start` 和 `grid-row-end`
  - 可选值：`<start-line> / <end-line>`
- **`grid-area`** <Sound word="grid-area"/>
  - 定义项目所属的命名区域（需父容器定义 `grid-template-areas`）
  - 可选值： `<name>` / `<row-start> / <column-start>` / `<row-end> / <column-end>`
- **`justify-self`** <Sound word="justify-self"/>
  - 控制单个项目在单元格内的**水平对齐方式**
  - 可选值：`start` / `end` / `center` / `stretch`
- **`align-self`** <Sound word="align-self"/>
  - 控制单个项目在单元格内的**垂直对齐方式**
  - 可选值：`start` / `end` / `center` / `stretch`
- **`place-self`** <Sound word="place-self"/>
  - 简写属性
  - 可选值：`[align-self] [justify-self]`

### **`grid`** <Sound word="grid"/>

| 语法形式                            | 等效展开                                                                      | 说明                             |
| ----------------------------------- | ----------------------------------------------------------------------------- | -------------------------------- |
| `grid: none`                        | `grid-template: none`                                                         | 重置所有显式网格定义             |
| `grid: subgrid`                     | `grid-template: subgrid`                                                      | 继承父网格轨道（需父元素为网格） |
| `grid: masonry`                     | `grid-template: masonry`                                                      | 瀑布流布局（仅 Firefox 支持）    |
| `grid: auto-flow`                   | `grid-auto-flow: row`                                                         | 自动行排列（隐式轨道）           |
| `grid: <track-list>`                | `grid-template: <track-list>`                                                 | 定义显式网格轨道                 |
| `grid: 100px 1fr / auto-flow`       | `grid-template-rows: 100px 1fr;`<br>`grid-auto-flow: column;`                 | 显式行 + 自动列流                |
| `grid: auto-flow dense / 200px`     | `grid-auto-flow: row dense;`<br>`grid-auto-rows: 200px;`                      | 自动行密集排列 + 隐式行尺寸      |
| `grid: [a] 1fr [b] / [x] 100px [y]` | `grid-template-rows: [a] 1fr [b];`<br>`grid-template-columns: [x] 100px [y];` | 命名网格线定义                   |

### 轨道尺寸

| 语法            | 示例                          | 说明                                                                |
| --------------- | ----------------------------- | ------------------------------------------------------------------- |
| `fr` 单位       | `1fr` `minmax(200px, 2fr)`    | **弹性单位**：按比例分配剩余空间                                    |
| `repeat()`      | `repeat(3, 1fr)`              | **重复模式**：<br>`auto-fill` (自动填充) <br> `auto-fit` (自动适应) |
| `minmax()`      | `minmax(100px, 1fr)`          | **尺寸范围**：定义轨道的最小和最大尺寸                              |
| `masonry`       | `grid-template-rows: masonry` | **瀑布流布局** <br> (实验性特性，需浏览器支持)                      |
| `固定单位`      | `100px` `20%` `5em`           | 固定尺寸或百分比，直接定义轨道宽度/高度                             |
| `auto`          | `auto`                        | 自动尺寸：由内容撑开                                                |
| `fit-content()` | `fit-content(200px)`          | 限制轨道尺寸不超过指定值，同时允许收缩到内容的最小尺寸              |

### Grid vs Flexbox

| 特性             | Grid                                  | Flexbox                        | 胜出场景                             |
| ---------------- | ------------------------------------- | ------------------------------ | ------------------------------------ |
| **布局维度**     | 二维（行列同时控制）                  | 一维（主轴+交叉轴）            | Grid：复杂网格布局<br>Flex：线性排列 |
| **内容流控制**   | 显式定位，可打破DOM顺序               | 严格遵循DOM顺序                | Grid：视觉重排需求                   |
| **对齐控制**     | 容器和项目双向对齐                    | 主轴优先，交叉轴次之           | Grid：复杂对齐需求                   |
| **响应式适配**   | `auto-fill` / `auto-fit` 自动计算列数 | 需手动计算百分比或媒体查询     | Grid：自适应布局更高效               |
| **嵌套布局**     | `subgrid` 继承父网格                  | 需多层嵌套容器                 | Grid：减少嵌套层级                   |
| **典型应用场景** | 仪表盘、杂志排版、表单系统            | 导航菜单、卡片列表、表单控件组 | 根据复杂度选择                       |
