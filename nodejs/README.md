# nodejs

Node.js 是一个基于 Chrome V8 引擎的 JavaScript 运行环境，使 JavaScript 能够在服务器端运行。它采用事件驱动、非阻塞 I/O 模型，使其轻量高效，非常适合处理大量并发请求。Node.js 的生态系统丰富，拥有大量的第三方模块，可以帮助开发者快速构建高性能的网络应用和服务端程序。

## 使用 docker 运行 nodejs 服务

### Dockerfile 文件

```mermaid
graph LR
    A[创建Dockerfile] --> B(构建 Docker 镜像)
    B --> C(查看镜像列表)
    C --> D[运行 Docker 容器]
```

```bash
# 使用 Node.js 的官方镜像作为基础镜像
FROM node:14

# 设置工作目录
WORKDIR /app/service/xxx

# 将 package.json 和 package-lock.json 复制到工作目录
COPY package*.json ./

# 安装依赖
RUN npm install

# 将应用程序代码复制到工作目录
COPY . .

# 暴露应用程序的端口（根据你的应用程序配置）
EXPOSE 3000

# 启动应用程序
CMD ["npm", "start"]
```

构建镜像并运行容器

```bash
# 构建 Docker 镜像
docker build -t nodejs .

# 查看镜像列表
docker images

# 运行 Docker 容器
docker run --name nodejs -d -p 4000:80 nodejs
```

更新 nodejs 容器

```mermaid
graph LR
    A[build 构建新镜像] --> B(prune 删除中间镜像)
    B--> C(stop 停止容器)
    C --> D(rm 删除容器)
    D --> E[run 创建并运行新容器]
```

```bash
docker build -t nodejs . # 构建 Docker 镜像

# 删除中间(未使用)镜像
docker image prune

# 停止一个或多个运行中的容器
docker stop nodejs

# 移除一个或多个容器
docker rm nodejs

# 从镜像创建并运行一个新的容器
docker run --name nodejs -d -p 4000:80 nodejs
```

### docker-compose.yml

```bash
version: '3.8'

services:
  app:
    # 使用 Node.js 的官方镜像作为基础镜像
    image: node:14
    # 设置工作目录
    working_dir: /app/service/nodejs
    # 将 package.json 和 package-lock.json 复制到工作目录
    volumes:
      - .:/app/service/nodejs
    # 安装依赖
    command: npm install
    # 暴露应用程序的端口（根据你的应用程序配置）
    ports:
      - "3000:3000"
    # 启动应用程序
    command: sh -c "npm install && npm start"
```
