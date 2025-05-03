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
<<< ./Nginx WebDAV/install.bash [安装]
<<< ./Nginx WebDAV/mkdir.bash [创建数据存储目录]
<<< ./Nginx WebDAV/htpasswd.bash [创建访问账号]
<<< ./Nginx WebDAV/nginx.conf{nginx}
<<< ./Nginx WebDAV/reload.bash [重启nginx]
<<< ./Nginx WebDAV/curl.bash [验证和测试]
:::

## 四、Apache WebDAV

:::code-group
<<< ./Apache WebDAV/install.bash [安装]
<<< ./Apache WebDAV/mkdir.bash [创建 WebDAV 目录]
<<< ./Apache WebDAV/webdav.conf{apache} [配置文件]
<<< ./Apache WebDAV/htpasswd.bash [访问账号管理]
<<< ./Apache WebDAV/curl.bash [验证和测试]
:::
