# 检查配置
sudo nginx -t

# 查看10条日志
sudo tail -n 10 /var/log/nginx/error.log

# 第一次需要启动
sudo systemctl start nginx

# 热重启（不中断连接）
sudo nginx -s reload
# 或（systemd 管理的服务）
sudo systemctl reload nginx

# 冷重启
sudo systemctl restart nginx
