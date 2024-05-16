# Docker Compose

Docker Compose 是一个工具，用于定义和运行多容器的 Docker 应用。通过 docker-compose.yml 文件，你可以在单一文件中描述整个应用栈，然后使用简单的命令来启动和管理这些容器。

[官方文档](https://docs.docker.com/compose/)

## docker-compose 和 docker compose 的区别

- docker-compose 是旧版的独立工具，需要单独安装。
- docker compose 是新版 Docker CLI 的一部分，不需要单独安装，推荐使用。

## 安装

```bash
sudo yum update
sudo yum install docker-compose-plugin
docker compose version
```

## 卸载

```bash
sudo yum remove docker-compose-plugin
```

## docker-compose.yml
