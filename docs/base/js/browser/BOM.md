# BOM - WEB API

> 浏览器对象模型。提供与浏览器窗口、导航、历史记录等交互的 API。不属 W3C 标准，但各浏览器实现基本一致，是 Web 应用与浏览器交互的桥梁。

## 一、**`location`**

### 作用

包含当前页面 URL 信息，并允许操作导航。

### 属性

- `href`：完整 URL（可修改以实现页面跳转）
- `protocol`：协议（如 `https:`）
- `host`：主机名和端口
- `pathname`：路径部分（如 `/path/page.html`）

### 方法

- `reload()`：重新加载页面
- `replace(url)`：替换当前页面（无历史记录）

## 二、**`navigator`**

### 作用

提供浏览器和操作系统信息。

### 属性

- `userAgent`：浏览器用户代理字符串
- `platform`：操作系统类型
- `language`：浏览器首选语言

### 方法

- `geolocation.getCurrentPosition(success, error, options)`：获取地理位置
- `clipboard.readText()`：读取剪贴板内容（需权限）

## 三、**`history`**

### 作用

操作浏览器会话历史记录。

### 方法

- `back()` / `forward()`：导航到历史记录的上/下一页
- `go(n)`：前进或后退 n 页
- `pushState(state, title, url)`：添加历史记录（用于前端路由）
- `replaceState()`：替换当前历史记录

## 四、**`screen`**

### 作用

提供屏幕分辨率信息。

### 属性

- `width` / `height`：屏幕总宽高
- `availWidth` / `availHeight`：可用显示区域（排除任务栏）

### 方法

## 五、**`performance`**

### 作用

提供性能监控相关接口。

### 方法

- `now()`：获取高精度时间戳
- `getEntries()`：获取页面资源加载性能数据（如脚本、图片）
