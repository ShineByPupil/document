# SSH

## 一、背景介绍

SSH（Secure Shell）是一种加密网络协议，旨在为不安全的网络环境提供安全的远程通信通道

## 二、核心特性

- **加密通信**
  - 通过非对称加密（如 ED25519、RSA）建立安全通道，防止中间人攻击
- **身份验证**
  - 密钥对登录，包含公钥（上传到服务器）和私钥（客户端保存）
- **端口转发**
  - 支持隧道功能，可安全转发 TCP 端口或代理流量
- **轻量级**
  - 协议设计简洁，适用于高频次的管理操作

## 三、应用场景

- **远程服务器管理**
  - 通过 `ssh user@host` 登录 Linux/Unix 服务器
- **文件传输**
  - 使用 `scp` 或 `sftp` 加密传输文件
- **Git 仓库访问**
  - GitHub/GitLab 使用 SSH 密钥认证代码推送
- **内网穿透**
  - 通过 SSH 隧道访问内网服务（如 `ssh -L 8080:localhost:80 user@host`）

## 四、创建命令 ⭐

:::code-group

```powershell [生成密钥]
ssh-keygen -t ed25519 -f "$env:USERPROFILE\.ssh\test_key" -C "test_key_comment"
```

```powershell [前置准备]
# 验证目录是否存在
Test-Path $env:USERPROFILE\.ssh  # 应返回 True

# （若不存在）创建目录
mkdir -Force $env:USERPROFILE\.ssh
```

:::

| 参数           | 作用            | 推荐策略                     |
| -------------- | --------------- | ---------------------------- |
| `-t ed25519`   | 指定Ed25519算法 | 新项目首选，更安全高效       |
| `-t rsa`       | 指定RSA算法     | 兼容旧系统时使用             |
| `-b 4096`      | RSA密钥长度     | 必须≥2048位                  |
| `-f path`      | 密钥存储路径    | 按用途命名（如`github_key`） |
| `-C "comment"` | 公钥注释        | 标注用途/所有者              |
| `-N ""`        | 设置空密码      | 自动化场景必选               |

## 五、文件信息

### 文件说明

- 私钥：`C:\Users\<你的用户名>\.ssh\test_key`
- 公钥：`C:\Users\<你的用户名>\.ssh\test_key.pub`
- 公钥指纹（fingerprint）
  - 公钥的哈希值（辅助信息无需保存）
  ```powershell
  # 查看公钥指纹（验证用途）
  ssh-keygen -lf $env:USERPROFILE\.ssh\test_key.pub
  ```
- 随机指纹图案（randomart image）
  - 密钥指纹的可视化图形（辅助信息无需保存）

### 文件内容

:::code-group

```text [私钥]
-----BEGIN OPENSSH PRIVATE KEY-----
b3BlbnNzaC1rZXktdjEAAAAABG5vbmUAAAAEbm9uZQAAAAAAAAABAAAAMwAAAAtzc2gtZW
QyNTUxOQAAACClUhw6lKQt3p8CIHO5oTnTTfUZgvPlPliZEOFcyEEi5AAAAJhKBb3YSgW9
2AAAAAtzc2gtZWQyNTUxOQAAACClUhw6lKQt3p8CIHO5oTnTTfUZgvPlPliZEOFcyEEi5A
AAAEDQvLzJ8zL+of2E5aiKDumjq77cSKVaWALdCZg0ES32kKVSHDqUpC3enwIgc7mhOdNN
9RmC8+U+WJkQ4VzIQSLkAAAAFWdpdGh1Yi1hY3Rpb25zLWRlcGxveQ==
-----END OPENSSH PRIVATE KEY-----
```

```text [公钥]
SHA256:ZruhKHSKLliIX0XOl4mvdn0MODYvn/g/AgwmTEIyVp0 test_key_comment
```

```text [fingerprint]
ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIKVSHDqUpC3enwIgc7mhOdNN9RmC8+U+WJkQ4VzIQSLk test_key_comment
```

```text [randomart image]
+--[ED25519 256]--+
|ooo.. .          |
|.o. .E.          |
|   + + . o       |
|    o B +        |
|..   + =S.       |
|o o o  oO..      |
|.= +   oo* o     |
|+ +  .o.o++.+    |
|o. .....o+++..   |
+----[SHA256]-----+
```

:::

## 六、公钥部署 ⭐

```powershell
# 公钥部署
type "$env:USERPROFILE\.ssh\test_key.pub" | `
  ssh user@server_ip "mkdir -p ~/.ssh && cat >> ~/.ssh/authorized_keys"

# 测试指定密钥登录
ssh -i "$env:USERPROFILE\.ssh\test_key" user@server_ip

# 登录服务器（自动匹配私钥）
ssh user@server_ip

# 退出登录
exit
```

- `user` 和 `server_ip` 分别替换为服务器 用户名和 IP
- 测试指定密钥登录需要输入密码，说明公钥部署失败
- 多个公钥需要另起一行，否则会失效

## 附录

### **`known_hosts`**

> 存储你曾连接过的 远程主机的公钥指纹，用于验证后续连接的安全性

| 文件              | 用途                                   | 用户操作建议           |
| ----------------- | -------------------------------------- | ---------------------- |
| `known_hosts`     | 存储已验证过的主机公钥，防止中间人攻击 | 自动维护，无需手动干预 |
| `known_hosts.old` | `known_hosts` 的备份文件               | 可忽略，系统自动生成   |

### 算法选择

| 场景            | 算法选择   | 理由               |
| --------------- | ---------- | ------------------ |
| 新项目/现代系统 | Ed25519    | 性能强，抗量子攻击 |
| 兼容旧系统      | RSA-4096   | 广泛支持性         |
| 金融/政府系统   | 结合CA证书 | 最高审计要求       |
