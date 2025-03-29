# nginx

> Nginx 是一款高性能的 Web 服务器和反向代理服务器，以其高并发处理能力、低内存占用和模块化架构著称

## 应用场景

- **静态资源服务**：高效托管 HTML、CSS、JS 等静态文件。
- **反向代理与负载均衡**：将请求分发到多个后端服务，支持轮询、权重分配等策略。
- **SSL/TLS 终端**：提供 HTTPS 支持，可配置证书加密通信。
- **访问控制**：基于 IP、用户认证等方式限制资源访问。
- **动态内容处理**：通过 FastCGI 支持 PHP、Python 等动态语言。
- **缓存加速**：反向代理缓存、Gzip 压缩优化响应速度。
- **高可用性**：支持健康检查、故障转移，提升服务稳定性。

## 开始

### 安装

::: code-group

```bash [Ubuntu/Debian 系统]
sudo apt update
sudo apt install nginx
```

```bash [CentOS/RHEL 系统]
sudo yum install epel-release
sudo yum install nginx
```

```bash [Fedora 系统]
sudo dnf install nginx
```

:::

### 检查

```bash [检查配置]
sudo nginx -t
```

### 重载

```bash [重载配置]
sudo systemctl reload nginx
# 或
sudo nginx -s reload
```

### 卸载

::: code-group

```bash [Ubuntu/Debian 系统]
sudo apt-get purge nginx nginx-common
sudo apt autoremove
```

```bash [CentOS/RHEL 系统]
sudo yum remove nginx

```

```bash [Fedora 系统]
sudo dnf remove nginx
```

:::

## 常用示例

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

## 核心配置项

### **`listen`**

定义监听的端口和协议

```nginx
listen 80;          # 监听 IPv4 的 80 端口
listen [::]:80;     # 监听 IPv6 的 80 端口
listen 443 ssl;     # 监听 HTTPS 端口
```

### **`server_name`**

指定服务器域名（支持通配符和正则）

```nginx
server_name example.com *.example.com;
```

### **`root`**

设置网站根目录路径

```nginx
root /var/www/html;  # 所有请求基于此路径解析文件
```

### **`index`**

定义默认索引文件

```nginx
index index.html index.php;  # 按顺序尝试加载文件
```

## 日志配置

### **`access_log`**

访问日志路径与格式

```nginx
access_log /var/log/nginx/access.log combined;
```

### **`error_log`**

错误日志路径与级别

```nginx
# 日志级别：debug/info/warn/error
error_log /var/log/nginx/error.log warn;
```

## 反向代理与负载均衡

### **`proxy_pass`**

将请求转发到后端服务

```nginx
location /api/ {
  proxy_pass http://backend_server;  # 指向 upstream 或具体地址
}
```

### **`upstream`**

定义后端服务器集群（负载均衡）

```nginx
upstream backend_server {
  server 10.0.0.1:8080 weight=3;
  server 10.0.0.2:8080;
  keepalive 32;  # 保持长连接
}
```

## 安全与 HTTPS

### **`ssl_certificate`** / **`ssl_certificate_key`**

指定 SSL 证书和私钥路径

```nginx
ssl_certificate /etc/ssl/certs/example.com.crt;
ssl_certificate_key /etc/ssl/private/example.com.key;
```

### **`allow`** / **`deny`**

IP 访问控制

```nginx
location /admin/ {
  allow 192.168.1.0/24;
  deny all;
}
```

## 性能优化

### **`gzip`**

启用压缩减少传输体积

```nginx
gzip on;
gzip_types text/html application/json;
```

### **`client_max_body_size`**

限制客户端上传文件大小

```nginx
client_max_body_size 20M;  # 默认 1M，需根据业务调整
```

### **`keepalive_timeout`**

保持 TCP 连接的超时时间

```nginx
keepalive_timeout 65;  # 单位：秒
```
