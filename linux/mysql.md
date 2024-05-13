# mysql

## 安装

[mysql 官网连接](https://www.mysql.com/downloads/)

```bash
sudo yum install nodejs npm
```

## 启动 MySQL 服务器

```bash
sudo systemctl start mysqld
# 设置 MySQL 服务器开机自启动
sudo systemctl enable mysqld
```

## 登录

初始无密码，直接回车登录

```bash
mysql -u root -p
```

## 修改密码

```bash
ALTER USER 'root'@'localhost' IDENTIFIED BY 'new_password';
```

## 退出

- 快捷键 Ctrl + D
- 命令行 exit

## 服务器防火墙开发数据库端口

阿里云举例

```mermaid
graph LR
    A[云服务管理控制台] --> B(网络与安全) --> C(安全组) --> D(管理规则) --> E(手动添加) --> F[保存]
```

## 使用 navicat 连接数据库

```bash
  # 创建用户
  create user '新用户名'@'允许的来源ip' identified by '新用户的密码';
  # 查看是否创建成功
  select Host,User from mysql.user;
  # 删除用户
  drop user '用户名'@'ip';
  # 授予权限
  GRANT ALL PRIVILEGES ON *.* TO '用户名'@'ip' WITH GRANT OPTION;
  # 刷新权限
  FLUSH PRIVILEGES;
```

## 创建数据库

```mysql
CREATE DATABASE my_database;
```
