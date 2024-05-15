# NginxProxyManager

nginx 可视化后台管理工具

- [官方文档地址](https://nginxproxymanager.com/guide/)
- [github 地址](https://github.com/NginxProxyManager/nginx-proxy-manager)

## 创建文件 docker-compose.yml

支持中文的配置文件

```bash
version: '3.8'
services:
  app:
    image: 'chishin/nginx-proxy-manager-zh:release'
    restart: always
    ports:
      - '80:80'
      - '81:81'
      - '443:443'
    volumes:
      - ./data:/data
      - ./letsencrypt:/etc/letsencrypt
```

##

```bash
docker-compose up -d
docker compose up -d
```

## 初始账号密码

|       Email       | Password |
| :---------------: | :------: |
| admin@example.com | changeme |

## 登录后台地址

http://127.0.0.1:81

如果访问不上，服务器对端口 81 开发 ip 白名单
