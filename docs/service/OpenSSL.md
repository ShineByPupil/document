# OpenSSL

## 一、背景介绍

OpenSSL 是一个开源的密码学工具库，实现了 SSL/TLS 协议，用于构建加密的客户端-服务器通信（如 HTTPS），同时支持证书颁发、密钥生成、数据签名等功能

## 二、核心特性

- **SSL/TLS 协议**
  - 支持 HTTPS、FTPS、SMTPS 等加密协议
- **证书管理**
  - 生成自签名证书（`openssl req`），签署证书请求（扮演私有 CA）
- **加密算法库**
  - 提供对称加密（AES）、非对称加密（RSA、ECC）、哈希（SHA）等算法
- **通用性**
  - 不局限于特定协议，可集成到任何需要加密的应用中

## 三、应用场景

- **HTTPS 网站加密**
  - 为 Web 服务器（Nginx/Apache）配置 SSL/TLS 证书
- **API 安全**
  - 保护 RESTful API 的通信（如 HTTPS + 双向 TLS 认证）
- **证书颁发机构（CA）**
  - 生成私有证书链，用于内网服务加密
- **数据加密/解密**
  - 直接通过命令行加密文件（如 `openssl enc`）

## 四、安装命令

```bash [安装]
# 检查 OpenSSL 是否安装及版本信息（Linux/macOS）
openssl version

# 安装 OpenSSL（Ubuntu/Debian）
sudo apt-get install openssl

# 安装 OpenSSL（CentOS/RHEL）
sudo yum install openssl
```

## 五、生成命令 ⭐

| 参数               | 作用                                                                 |
| ------------------ | -------------------------------------------------------------------- |
| `-x509`            | 生成自签名证书（而非证书请求 CSR）                                   |
| `-newkey alg:size` | 生成新私钥，如 `rsa:2048`、`ec:<曲线名>`                             |
| `-key file`        | 指定现有私钥文件                                                     |
| `-keyout file`     | 保存生成的私钥到文件                                                 |
| `-out file`        | 保存证书到文件                                                       |
| `-days N`          | 证书有效期天数（默认 30 天）                                         |
| `-subj "/字段=值"` | 非交互式设置证书主题（如 `/C=CN/ST=Beijing/O=MyOrg/CN=example.com`） |
| `-addext "扩展"`   | 添加扩展字段（如 SAN、密钥用途等）                                   |
| `-nodes`           | 私钥不加密（无密码保护）                                             |

:::code-group

```bash [自签证书]
# 一步生成
openssl req -x509 -newkey rsa:2048 -keyout key.pem -out cert.pem -days 365 -nodes

# 分步生成
openssl genrsa -out key.pem 2048
openssl req -new -key key.pem -out csr.pem -subj "/CN=example.com"
openssl x509 -req -days 365 -in csr.pem -signkey key.pem -out cert.pem
```

```bash [公共CA]
# 使用Certbot自动获取并安装证书（需域名已解析到服务器）
sudo apt install certbot
sudo certbot certonly --nginx -d example.com -d www.example.com
# 证书路径：/etc/letsencrypt/live/example.com/
```

```bash [私有CA]
# 1. 生成CA根证书
openssl genrsa -out ca.key 2048
openssl req -x509 -new -nodes -key ca.key -days 3650 -out ca.crt -subj "/CN=My Internal CA"

# 2. 生成服务端证书
openssl genrsa -out server.key 2048
openssl req -new -key server.key -out server.csr -subj "/CN=example.com"
openssl x509 -req -in server.csr -CA ca.crt -CAkey ca.key -CAcreateserial -out server.crt -days 365

# 3. 客户端需手动安装ca.crt到信任列表
```

:::

:::details 生成表单填写

- **`Country Name (2 letter code) [AU]:` `CN`**
  - 国家代码（如中国为 `CN`，默认是 `AU` 即澳大利亚）
- `State or Province Name (full name) [Some-State]:` `Zhejiang`
  - 省/州名。例如：`Beijing`（直接回车可跳过）
- `Locality Name (eg, city) []:` `Hangzhou`
  - 城市名。例如：`Shanghai`（直接回车可跳过）
- `Organization Name (eg, company) [Internet Widgits Pty Ltd]:`
  - 组织名称。（直接回车可跳过）
- `Organizational Unit Name (eg, section) []:`
  - 部门名称。（直接回车可跳过）
- **`Common Name (e.g. server FQDN or YOUR name) []:` `docs.example.com`**
  - 通用名称。填写证书的域名或IP
- `Email Address []:`
  - 邮箱地址。（直接回车可跳过）

:::

## 六、文件信息

- 私钥文件 `key.pem`
- 证书文件 `cert.pem`

:::code-group
<<< ./OpenSSL/cert.pem
<<< ./OpenSSL/key.pem
:::

## 七、其他命令

:::code-group

```bash [检查证书信息]
openssl x509 -in cert.pem -text -noout
```

```bash [测试 HTTPS 服务]
openssl s_client -connect example.com:443 -servername example.com
```

:::
