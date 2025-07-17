# Web 服务器

## 技术选型

| 对比维度         | Nginx                       | Apache                      |
| ---------------- | --------------------------- | --------------------------- |
| **架构模型**     | 事件驱动（异步非阻塞）      | 多进程/多线程               |
| **并发能力**     | 10万级高并发                | 5000左右并发                |
| **资源消耗**     | 内存/CPU占用低              | 相对较高                    |
| **静态资源性能** | 极快                        | 中等                        |
| **动态内容处理** | 需配合FastCGI               | 原生支持（如mod_php）       |
| **配置复杂度**   | 集中式配置                  | 支持目录级.htaccess配置     |
| **热部署能力**   | 支持热更新                  | 需重启生效                  |
| **典型使用场景** | 高并发入口/反向代理/API网关 | PHP动态网站/企业级传统系统  |
| **学习成本**     | 配置语法较简洁              | 功能复杂需深度配置          |
| **生态扩展**     | 第三方模块较少              | 模块市场丰富（超600个模块） |

## 一、Nginx <Sound word="Nginx"/>

> [Nginx](https://nginx.org/) 是一款高性能的开源 Web 服务器和反向代理服务器，以其高效、稳定和低资源消耗著称

### 1. 核心特性

- **事件驱动架构**
  - 单线程处理高并发（10万级），资源占用低
- **模块化设计**
  - 支持动态扩展，反向代理/负载均衡能力突出
- **静态资源处理快**
  - 直接托管HTML/图片效率极高
- **热更新能力**
  - 不停服更新配置或升级版本
- **安全防护**
  - 支持SSL、限流、IP黑名单等

### 2. 应用场景

- 高并发网站入口
- 静态资源服务器
- 反向代理/负载均衡
- 微服务网关
- 视频直播流分发

### 3. 命令行 ⭐

::: code-group
<<< ./WebServer/Nginx/command/install.bash [安装命令]
<<< ./WebServer/Nginx/command/state.bash [启停命令]
<<< ./WebServer/Nginx/command/debug.bash [调试命令]
<<< ./WebServer/Nginx/command/remove.bash [卸载命令]
:::

### 4. 应用场景

::: code-group
<<< ./WebServer/Nginx/config/base.conf{nginx} [nginx.conf]
<<< ./WebServer/Nginx/config/redirect.conf{nginx} [重定向]
<<< ./WebServer/Nginx/config/proxy.conf{nginx} [反向代理]
:::

### 5. 配置项

- **基础配置项**

| 配置项        | 说明                               |
| ------------- | ---------------------------------- |
| `listen`      | 定义监听的端口和协议               |
| `server_name` | 指定服务器域名（支持通配符和正则） |
| `root`        | 设置网站根目录路径                 |
| `index`       | 定义默认索引文件                   |

:::code-group
<<< ./WebServer/Nginx/config/listen.conf{nginx} [listen]
<<< ./WebServer/Nginx/config/server_name.conf{nginx} [server_name]
<<< ./WebServer/Nginx/config/root.conf{nginx} [root]
<<< ./WebServer/Nginx/config/index.conf{nginx} [index]
:::

- **日志配置**

| 配置项       | 说明               |
| ------------ | ------------------ |
| `access_log` | 访问日志路径与格式 |
| `error_log`  | 错误日志路径与级别 |

:::code-group
<<< ./WebServer/Nginx/config/access_log.conf{nginx} [access_log]
<<< ./WebServer/Nginx/config/error_log.conf{nginx} [error_log]
:::

- **反向代理与负载均衡**

| 配置项       | 说明                           |
| ------------ | ------------------------------ |
| `proxy_pass` | 将请求转发到后端服务           |
| `upstream`   | 定义后端服务器集群（负载均衡） |

:::code-group
<<< ./WebServer/Nginx/config/upstream.conf{nginx} [upstream]
:::

- **安全与 HTTPS**

| 配置项                | 说明              |
| --------------------- | ----------------- |
| `ssl_certificate`     | 指定 SSL 证书     |
| `ssl_certificate_key` | 指定 SSL 私钥路径 |
| `allow`               | IP 访问控制       |
| `deny`                | IP 访问控制       |

:::code-group
<<< ./WebServer/Nginx/config/SSL.conf{nginx} [SSL]
<<< ./WebServer/Nginx/config/allow.conf{nginx} [IP 访问控制]
:::

- **性能优化**

| 配置项                 | 说明                    |
| ---------------------- | ----------------------- |
| `gzip`                 | 启用压缩减少传输体积    |
| `client_max_body_size` | 限制客户端上传文件大小  |
| `keepalive_timeout`    | 保持 TCP 连接的超时时间 |

:::code-group

```nginx [gzip]
gzip on;
gzip_types text/html application/json;
```

```nginx [client_max_body_size]
# 默认 1M，需根据业务调整
client_max_body_size 20M;
```

```nginx [keepalive_timeout]
# 单位：秒
keepalive_timeout 65;
```

:::

## 二、Apache <Sound word="Apache"/>

> [Apache](https://httpd.apache.org/docs/) 是一款开源 Web 服务器，以模块化设计、跨平台兼容性及灵活的 .htaccess 配置著称。支持 PHP/MySQL 原生集成，长期主导传统网站架构

### 1. 核心特性

- **模块化架构**
  - 动态加载功能（如PHP支持）
- **多处理模式**
  - 支持Prefork/Worker/Event三种并发模型
- **配置灵活**
  - 通过 `httpd.conf` 和 `.htaccess` 文件实现细粒度配置，支持目录级覆盖设置
- **动态内容处理强**
  - 直接运行PHP/Python脚本
- **兼容性好**
  - 支持各种老旧系统和企业级应用

### 2. 应用场景

- PHP/Python动态网站（如WordPress）
- 需要.htaccess配置的场景
- 企业内网复杂系统
- 小型网站多虚拟主机托管

### 3. 命令行 ⭐

:::code-group
<<< ./WebServer/Apache/command/install.bash [安装命令]
<<< ./WebServer/Apache/command/state.bash [启停命令]
<<< ./WebServer/Apache/command/debug.bash [调试命令]
<<< ./WebServer/Apache/command/remove.bash [卸载命令]
:::
