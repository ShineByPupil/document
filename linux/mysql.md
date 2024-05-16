# mysql

[mysql 官网连接](https://www.mysql.com/downloads/)

## sudo yum 安装

```bash
# 添加 MySQL 仓库
sudo yum localinstall https://dev.mysql.com/get/mysql80-community-release-el7-3.noarch.rpm

# 安装 MySQL
sudo yum install mysql-server

# 启动 MySQL 服务
sudo systemctl start mysqld

# 查看 MySQL 状态
sudo systemctl status mysqld

# 设置 MySQL 服务器开机自启动
sudo systemctl enable mysqld
```

## Docker 安装

```bash
# 拉取 MySQL Docker 镜像
docker pull mysql:latest

# 运行 MySQL 容器
docker run --name mysql-container -e MYSQL_ROOT_PASSWORD=my-secret-pw -d mysql:latest
```

## mysql 命令

```bash
# 首次登录，无密码
mysql -u root -p

#修改密码
ALTER USER 'root'@'localhost' IDENTIFIED BY 'new_password';

# 创建新用户
create user '新用户名'@'允许的来源ip' identified by '新用户的密码';

# 删除用户
drop user '用户名'@'ip';

# 查看是否创建成功
select Host,User from mysql.user;

# 授予权限
GRANT ALL PRIVILEGES ON *.* TO '用户名'@'ip' WITH GRANT OPTION;
GRANT ALL PRIVILEGES ON user_database.* TO 'admin'@'%';
# 刷新权限
FLUSH PRIVILEGES;

# 退出(或快捷键 Ctrl + D)
exit

CREATE DATABASE my_database; # 创建数据库
```

## 开放服务器防火墙数据库 3306 端口

阿里云举例

```mermaid
graph LR
    A[云服务管理控制台] --> B(网络与安全) --> C(安全组) --> D(管理规则) --> E(手动添加) --> F[保存]
```
