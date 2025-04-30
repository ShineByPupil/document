# nginx

> Nginx 是一款高性能的开源 Web 服务器和反向代理服务器，以其高效、稳定和低资源消耗著称

## 一、核心特性

- **事件驱动架构**
  - 基于异步非阻塞（epoll/kqueue）模型，单线程可处理高并发连接（支持数万甚至十万级并发），资源占用极低
  - 相比传统多进程/多线程服务器（如 Apache），内存和 CPU 消耗更小
- **模块化设计**
  - 支持动态加载模块，内置丰富的功能模块（HTTP、Stream、Mail 等），同时支持第三方扩展（如 Lua 脚本、缓存优化等）
- **高性能静态内容处理**
  - 直接高效地托管静态文件（HTML、图片、CSS、JS 等），响应速度快
- **反向代理与负载均衡**
  - 支持 HTTP、TCP/UDP 流量的反向代理，提供多种负载均衡算法（轮询、加权轮询、IP 哈希、最少连接等）
  - 可配置健康检查，自动剔除故障后端节点
- **热部署与热更新**
  - 支持不停止服务的情况下更新配置、升级版本或更换二进制文件，保障业务连续性
- **灵活的配置语法**
  - 基于块的配置语法清晰易读，支持条件判断、正则匹配等高级功能
- **安全特性**
  - 支持 SSL/TLS 加密、HTTP/2、速率限制、IP 黑名单等，可集成 Web 应用防火墙（WAF）
- **缓存加速**
  - 支持内容缓存（代理缓存、FastCGI 缓存等），显著减轻后端服务器压力

## 二、应用场景

- **静态资源托管**
  - 直接部署为 Web 服务器，高效分发静态文件（如图片、视频、前端资源）
- **反向代理服务器**
  - 隐藏后端服务器，提升安全性，并通过缓存和压缩优化响应速度
- **负载均衡器**
  - 在多个应用服务器间分配流量，提升系统的可用性和扩展性（常用于微服务、集群环境）
- **API 网关**
  - 统一管理 API 请求，实现路由、鉴权、限流、日志记录等功能
- **SSL 终端**
  - 集中处理 HTTPS 加密/解密，减少后端服务器的计算压力
- **内容缓存与加速**
  - 缓存动态内容（如数据库查询结果），加速用户访问，降低后端负载
- **媒体流服务**
  - 支持 RTMP、HLS 等协议，用于视频点播或直播流分发
- **安全防护**
  - 配置访问控制、DDoS 防护（如限制请求速率）、屏蔽恶意 IP 等
- **微服务入口**
  - 作为微服务架构的入口层，路由请求到不同服务，支持灰度发布、A/B 测试
- **邮件代理**
  - 代理 SMTP、IMAP、POP3 协议，提供安全的邮件服务中转

## 三、命令行 ⭐

::: code-group

```bash [安装命令]
# Ubuntu/Debian 系统
sudo apt install nginx

# CentOS/RHEL 系统
sudo yum install nginx -y

# Fedora 系统
sudo dnf install nginx
```

```bash [常用命令]
# 检查配置
sudo nginx -t

# 查看10条日志
sudo tail -n 10 /var/log/nginx/error.log

# 第一次需要启动
sudo systemctl start nginx

# 热重启（不中断连接）
sudo nginx -s reload
# 或（systemd 管理的服务）
sudo systemctl reload nginx

# 冷重启
sudo systemctl restart nginx
```

```bash [卸载命令]
# Ubuntu/Debian 系统
sudo apt-get purge nginx nginx-common
sudo apt autoremove

# CentOS/RHEL 系统
sudo yum remove nginx

# Fedora 系统
sudo dnf remove nginx
```

:::

## 四、常用示例

::: code-group

```nginx
server {
    listen 80;
    server_name example.com;
    root /var/www/html;
    index index.html;

    location / {
        try_files $uri $uri/ =404;
    }

    error_page 404 /404.html;
    access_log /var/log/nginx/access.log;
    error_log /var/log/nginx/error.log;
}
```

```nginx [重定向]
server {
    listen 80;
    server_name old-domain.com;
    return 301 https://new-domain.com$request_uri;
}
```

```nginx [反向代理]
location /api/ {
    proxy_pass http://localhost:3000/;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
}
```

:::

## 五、配置项

### 1. 核心配置项

#### **`listen`**

定义监听的端口和协议

```nginx
listen 80;          # 监听 IPv4 的 80 端口
listen [::]:80;     # 监听 IPv6 的 80 端口
listen 443 ssl;     # 监听 HTTPS 端口
```

#### **`server_name`**

指定服务器域名（支持通配符和正则）

```nginx
server_name example.com *.example.com;
```

#### **`root`**

设置网站根目录路径

```nginx
root /var/www/html;  # 所有请求基于此路径解析文件
```

#### **`index`**

定义默认索引文件

```nginx
index index.html index.php;  # 按顺序尝试加载文件
```

### 2. 日志配置

#### **`access_log`**

访问日志路径与格式

```nginx
access_log /var/log/nginx/access.log combined;
```

#### **`error_log`**

错误日志路径与级别

```nginx
# 日志级别：debug/info/warn/error
error_log /var/log/nginx/error.log warn;
```

### 3. 反向代理与负载均衡

#### **`proxy_pass`**

将请求转发到后端服务

```nginx
location /api/ {
  proxy_pass http://backend_server;  # 指向 upstream 或具体地址
}
```

#### **`upstream`**

定义后端服务器集群（负载均衡）

```nginx
upstream backend_server {
  server 10.0.0.1:8080 weight=3;
  server 10.0.0.2:8080;
  keepalive 32;  # 保持长连接
}
```

### 4. 安全与 HTTPS

#### **`ssl_certificate`** / **`ssl_certificate_key`**

指定 SSL 证书和私钥路径

```nginx
ssl_certificate /etc/ssl/certs/example.com.crt;
ssl_certificate_key /etc/ssl/private/example.com.key;
```

#### **`allow`** / **`deny`**

IP 访问控制

```nginx
location /admin/ {
  allow 192.168.1.0/24;
  deny all;
}
```

### 5. 性能优化

#### **`gzip`**

启用压缩减少传输体积

```nginx
gzip on;
gzip_types text/html application/json;
```

#### **`client_max_body_size`**

限制客户端上传文件大小

```nginx
client_max_body_size 20M;  # 默认 1M，需根据业务调整
```

#### **`keepalive_timeout`**

保持 TCP 连接的超时时间

```nginx
keepalive_timeout 65;  # 单位：秒
```
