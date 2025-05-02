# WebDAV

> 网络文件管理器协议 （Web Distributed Authoring and Versioning）

## 一、核心特性

- **基于HTTP/HTTPS协议**
  - 使用标准端口（80/443），兼容现有网络架构，易于穿透防火墙和代理服务器，无需额外配置
- **文件与目录管理**
  - 支持创建、删除、移动、复制文件和目录（通过 `MKCOL`、`COPY`、`MOVE` 等方法），类似本地文件系统的操作
- **锁机制（Locking）**
  - 悲观锁机制防止多人同时修改同一文件导致冲突，支持共享锁（允许多用户读取）和排他锁（仅允许单个用户编辑）
- **元数据（属性）管理**
  - 允许通过 `PROPFIND` 和 `PROPPATCH` 方法管理自定义元数据（如作者、标签），增强文件描述能力
- **扩展的HTTP方法**
  - 新增方法如 `LOCK`、`UNLOCK`、`PROPFIND` 等，扩展了HTTP的功能，支持复杂操作
- **访问控制（ACL）**
  - 通过WebDAV ACL扩展（RFC 3744）实现细粒度权限管理，可设置用户或组的读写权限
- **部分版本控制支持**
  - 协议设计包含版本控制概念，但完整实现需依赖扩展（如DeltaV），实际应用中较少广泛支持

## 二、应用场景

- **远程文件编辑与协作**
  - 用户可直接通过支持WebDAV的客户端（如Microsoft Office、Adobe工具）在线编辑服务器文件，无需下载上传
- **团队文档共享**
  - 用于企业内部文档库（如SharePoint、Nextcloud），支持多人协作编辑和管理，避免版本冲突
- **云存储与备份**
  - 云服务（如Dropbox、ownCloud）通过WebDAV提供标准化访问接口，兼容多平台设备同步文件
- **网站内容管理**
  - 结合CMS（如WordPress插件），允许用户通过文件管理器直接修改网站资源（图片、页面等
- **跨平台文件访问**
  - 移动设备或跨操作系统（Windows/macOS/Linux）通过WebDAV客户端（如DAVx⁵）访问统一文件存储
- **企业应用集成**
  - 作为中间层协议，集成到OA系统、版本控制工具（如Subversion）或自动化流程中，管理远程资源

## 三、Nginx WebDAV

::: danger 风险须知

- **内置模块只覆盖最基础操作**
  - 官方 `ngx_http_dav_module` 模块仅处理 GET/HEAD 加上 `PUT` / `DELETE` / `MKCOL` / `COPY` / `MOVE`，**不支持** `PROPFIND` / `OPTIONS` / `LOCK` / `UNLOCK` 等操作
- **模块维护停滞**
  - 社区常用的 `nginx-dav-ext-module` 最后一次正式 release 是 2018 年，Issues 中大量 PROPFIND、锁超时、CORS 等缺陷无人修复

:::

:::code-group

```bash [安装]
# 安装 nginx
sudo yum install nginx -y

sudo yum install nginx-extras

# 安装 htpasswd（用于创建 WebDAV 访问用户）
sudo yum install httpd-tools -y
```

```bash [创建数据存储目录]
# 将 WebDAV 目录放在 /var/www/webdav
sudo mkdir -p /var/www/webdav

# 确保 Nginx 有读写权限
sudo chown -R nginx:nginx /var/www/webdav
sudo chmod -R 770 /var/www/webdav
```

```bash [创建访问账号]
# 在 /etc/nginx 下创建密码文件，并新增一个用户名（例如 davuser）
sudo htpasswd -c /etc/nginx/.htpasswd davuser
# 系统会提示你输入并确认密码
```

```nginx [Nginx 配置文件]
# /etc/nginx/nginx.conf

http {
  server {
    listen 80;
    server_name _;   # 或者填写你的域名 / IP

    # WebDAV 根路径
    location /dav/ {
      # 物理路径
      alias /var/www/webdav/;

      # 开启基本 WebDAV 方法
      dav_methods PUT DELETE MKCOL COPY MOVE;  # 合并到 dav_methods
      create_full_put_path on; # 关闭客户端 body 限制（上传不限大小）
      client_max_body_size 0;
      auth_basic "WebDAV Protected"; # 简单 Basic Auth 认证
      auth_basic_user_file /etc/nginx/.htpasswd;
      add_header Cache-Control no-cache; # 防止缓存等
    }
  }
}
```

```bash [重启nginx]
# 测试配置是否有语法错误
sudo nginx -t
#
tail -f /var/log/nginx/error.log

# 重启
sudo systemctl reload nginx
```

```bash [验证和测试]
# 查看已安装模块（默认包含http_dav_module，不含 dav-ext）
nginx -V 2>&1 | grep -E 'dav_module|dav_ext'
nginx -V 2>&1 | grep --color=auto http_dav_module
nginx -V 2>&1 | grep --color=auto dav_ext

# 测试查询列表（不支持）
curl -u davuser:123456 -X PROPFIND http://101.37.82.81/dav/
# 测试上传（支持基础方法）
curl -u davuser:123456 -T test.txt http://101.37.82.81/dav/
```

:::
