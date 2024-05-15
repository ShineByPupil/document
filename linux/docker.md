# Docker

## 安装

[参考文档](https://help.aliyun.com/zh/ecs/use-cases/deploy-and-use-docker-on-alibaba-cloud-linux-2-instances?spm=5176.ecscore_server.top-nav.8.11344df519zkWv&scm=20140722.S_help%40%40%E6%96%87%E6%A1%A3%40%4051853.S_RQW%40ag0%2BBB2%40ag0%2BBB1%40ag0%2Bhot%2Bos0.ID_51853-RL_docker~DAS~compose-LOC_console~UND~help-OR_ser-V_3-P0_3)

## 配置阿里云国内镜像加速

防止解析元数据失败，读取超时

```bash
vim /etc/docker/daemon.json

# 文件内容
{
"registry-mirrors": ["https://4da6b0g8.mirror.aliyuncs.com"]
}

# 重启 Docker 服务
sudo systemctl restart docker
```

#### 其他命令

```bash
# 查看 docker 日志
docker logs nodejs

# 删除 docker 日志(停止容器 -> 删除 -> 启动容器)
rm /var/lib/docker/containers/<container_id>/<container_id>-json.log
```

## Docker 命令说明

| 命令    | 说明                         |
| ------- | ---------------------------- |
| run     | 从镜像创建并运行一个新的容器 |
| exec    | 在运行中的容器内执行命令     |
| ps      | 列出容器                     |
| build   | 根据 Dockerfile 构建镜像     |
| pull    | 从注册表下载镜像             |
| push    | 将镜像上传到注册表           |
| images  | 列出镜像                     |
| login   | 登录到注册表                 |
| logout  | 退出注册表登录状态           |
| search  | 在 Docker Hub 上搜索镜像     |
| version | 显示 Docker 版本信息         |
| info    | 显示系统范围的信息           |

| 管理命令  | 说明                           |
| --------- | ------------------------------ |
| builder   | 管理构建                       |
| buildx\*  | Docker 构建器                  |
| compose\* | Docker Compose                 |
| container | 管理容器                       |
| context   | 管理上下文                     |
| image     | 管理镜像                       |
| manifest  | 管理 Docker 镜像清单和清单列表 |
| network   | 管理网络                       |
| plugin    | 管理插件                       |
| system    | 管理 Docker                    |
| trust     | 管理 Docker 镜像的信任         |
| volume    | 管理卷                         |

| Swarm 命令 | 说明       |
| ---------- | ---------- |
| swarm      | 管理 Swarm |

| 其他命令 | 说明                                                           |
| -------- | -------------------------------------------------------------- |
| attach   | 将本地标准输入、输出和错误流附加到运行中的容器                 |
| commit   | 从容器的更改创建一个新镜像                                     |
| cp       | 在容器和本地文件系统之间复制文件/文件夹                        |
| create   | 创建一个新容器                                                 |
| diff     | 检查容器文件系统中文件或目录的更改                             |
| events   | 从服务器获取实时事件                                           |
| export   | 将容器文件系统导出为 tar 存档                                  |
| history  | 显示镜像的历史记录                                             |
| import   | 从 tar 存档导入内容以创建文件系统镜像                          |
| inspect  | 返回 Docker 对象的低级信息                                     |
| kill     | 终止一个或多个运行中的容器                                     |
| load     | 从 tar 存档或 STDIN 加载一个镜像                               |
| logs     | 获取容器的日志                                                 |
| pause    | 暂停一个或多个容器中的所有进程                                 |
| port     | 列出容器的端口映射或特定映射                                   |
| rename   | 重命名一个容器                                                 |
| restart  | 重新启动一个或多个容器                                         |
| rm       | 删除一个或多个容器                                             |
| rmi      | 删除一个或多个镜像                                             |
| save     | 将一个或多个镜像保存为 tar 存档（默认情况下流式传输到 STDOUT） |
| start    | 启动一个或多个停止的容器                                       |
| stats    | 显示容器资源使用情况的实时流                                   |
| stop     | 停止一个或多个运行中的容器                                     |
| tag      | 创建一个指向源镜像的目标镜像的标签                             |
| top      | 显示容器的运行进程                                             |
| unpause  | 恢复一个或多个容器中的所有进程                                 |
| update   | 更新一个或多个容器的配置                                       |
| wait     | 阻塞直到一个或多个容器停止，然后打印它们的退出代码             |

| 全局选项               | 说明                                                                                                |
| ---------------------- | --------------------------------------------------------------------------------------------------- |
| --config string        | 客户端配置文件的位置（默认为 "/root/.docker"）                                                      |
| -c, --context string   | 要连接到守护进程的上下文的名称（覆盖 DOCKER_HOST 环境变量和 "docker context use" 设置的默认上下文） |
| -D, --debug            | 启用调试模式                                                                                        |
| -H, --host list        | 要连接到的守护进程套接字                                                                            |
| -l, --log-level string | 设置日志级别（"debug"、"info"、"warn"、"error"、"fatal"）（默认为 "info"）                          |
| --tls                  | 使用 TLS；--tlsverify 隐含了这个选项                                                                |
| --tlscacert string     | 只信任由此 CA 签名的证书（默认为 "/root/.docker/ca.pem"）                                           |
| --tlscert string       | TLS 证书文件的路径（默认为 "/root/.docker/cert.pem"）                                               |
| --tlskey string        | TLS 密钥文件的路径（默认为 "/root/.docker/key.pem"）                                                |
| --tlsverify            | 使用 TLS 并验证远程                                                                                 |
| -v, --version          | 打印版本信息并退出                                                                                  |
