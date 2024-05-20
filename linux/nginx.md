# nginx

## 安装

```bash
# 更新包列表
sudo yum update
# 安装 EPEL 仓库
sudo yum install epel-release
# 安装 nginx
sudo yum install nginx

# 查看版本
nginx -v

# 启动 nginx
sudo systemctl start nginx
# 使 nginx 开机自启
sudo systemctl enable nginx
# 查看状态
sudo systemctl status nginx
```

## 卸载

```bash
# 停止 nginx 服务
sudo systemctl stop nginx
# 卸载 Nginx 软件包
sudo yum remove nginx
# 删除 Nginx 配置文件和日志文件（可选）
sudo rm -rf /etc/nginx /var/log/nginx
```

## 使用

nginx.conf 文件配置

```bash
server {
        listen       80;
        listen       [::]:80;
        server_name  txjb.xyz www.txjb.xyz;
        root         /app/src/vue_vite;

        # Load configuration files for the default server block.
        include /etc/nginx/default.d/*.conf;

        error_page 404 /404.html;
            location = /40x.html {
        }

        error_page 500 502 503 504 /50x.html;
            location = /50x.html {
        }

        location / {
            try_files $uri $uri/ /index.html; # 重定向所有不存在的文件或目录请求到 index.html
        }

        # 如果需要 API 代理，则添加类似如下的配置：
        location /api {
            proxy_pass http://localhost:3000; # 将 /api 的请求代理到本地的 3000 端口
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }
    }
```

命令

```bash
# 查看 nginx 安装目录
ps -ef | grep nginx
# 查看配置文件 nginx.conf 路径
nginx -t

# 修改配置
vim /etc/nginx/nginx.conf

# 重启服务
sudo systemctl reload nginx
sudo systemctl restart nginx
```
