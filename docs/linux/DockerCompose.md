# Docker Compose

Docker Compose 是一个工具，用于定义和运行多容器的 Docker 应用。通过 docker-compose.yml
文件，你可以在单一文件中描述整个应用栈，然后使用简单的命令来启动和管理这些容器。

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

## 命令

<details>
<summary>命令</summary>

| 选项                         | 描述                                               |
|----------------------------|--------------------------------------------------|
| --all-resources            | 包括所有资源，即使这些资源未被服务使用                              |
| --ansi string              | 控制何时打印 ANSI 控制字符                                 |
|                            | ("never" \| "always" \| "auto") (default "auto") |
| --compatibility            | 以向后兼容模式运行 Compose                                |
| --dry-run                  | 在干预模式下执行命令                                       |
| --env-file stringArray     | 指定替代环境文件                                         |
| -f, --file stringArray     | Compose 配置文件                                     |
| --parallel int             | 控制最大并行度，-1 为无限制 (默认 -1)                          |
| --profile stringArray      | 指定要启用的配置文件                                       |
| --progress string          | 设置进度输出类型 (auto, tty, plain, quiet) (默认 "auto")   |
| --project-directory string | 指定替代工作目录                                         |
|                            | (默认: 第一个指定的 Compose 文件的路径)                       |
| -p, --project-name string  | 项目名称                                             |

| 命令      | 描述                        |
|---------|---------------------------|
| attach  | 将本地标准输入、输出和错误流附加到服务的运行容器  |
| build   | 构建或重建服务                   |
| config  | 解析、解决并以规范格式渲染 Compose 文件  |
| cp      | 在服务容器和本地文件系统之间复制文件/文件夹    |
| create  | 为服务创建容器                   |
| down    | 停止并移除容器、网络                |
| events  | 接收容器的实时事件                 |
| exec    | 在运行中的容器中执行命令              |
| images  | 列出由创建的容器使用的镜像             |
| kill    | 强制停止服务容器                  |
| logs    | 查看容器的输出                   |
| ls      | 列出正在运行的 Compose 项目        |
| pause   | 暂停服务                      |
| port    | 打印端口绑定的公共端口               |
| ps      | 列出容器                      |
| pull    | 拉取服务镜像                    |
| push    | 推送服务镜像                    |
| restart | 重新启动服务容器                  |
| rm      | 移除已停止的服务容器                |
| run     | 在服务上运行一次性命令               |
| scale   | 缩放服务                      |
| start   | 启动服务                      |
| stats   | 显示容器的资源使用统计信息的实时流         |
| stop    | 停止服务                      |
| top     | 显示运行中的进程                  |
| unpause | 恢复服务                      |
| up      | 创建并启动容器                   |
| version | 显示 Docker Compose 的版本信息   |
| wait    | 阻塞直到第一个服务容器停止             |
| watch   | 监视服务的构建上下文，并在文件更新时重建/刷新容器 |

</details>


运行 'docker compose COMMAND --help' 以获取有关命令的更多信息。


## 常用命令

```bash
docker compose build # 构建
docker compose up -d # 启动

docker compose down # 停止
```
