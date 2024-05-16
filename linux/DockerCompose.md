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

```bash
services:
  # 前端服务
  frontend:
    image: example/webapp
    ports:
      - "443:8043"  # 将容器的 8043 端口映射到宿主机的 443 端口
    networks:
      - front-tier
      - back-tier
    configs:
      - httpd-config  # 使用 httpd-config 配置文件
    secrets:
      - server-certificate  # 使用 server-certificate 密钥

  # 后端服务
  backend:
    image: example/database
    volumes:
      - db-data:/etc/data  # 将容器的 /etc/data 挂载到名为 db-data 的卷上
    networks:
      - back-tier

volumes:
  # 数据库数据卷
  db-data:
    driver: flocker
    driver_opts:
      size: "10GiB"  # 设置卷的大小为 10GiB

configs:
  # 外部配置文件 httpd-config
  httpd-config:
    external: true

secrets:
  # 外部密钥 server-certificate
  server-certificate:
    external: true

networks:
  # 前端网络
  front-tier: {}
  # 后端网络
  back-tier: {}

```
