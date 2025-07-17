# 首次启动 Nginx
sudo systemctl start nginx

# 停止 Nginx
sudo systemctl stop nginx

# 冷重启（完全停止后重启，中断连接）
sudo systemctl restart nginx

# 热重启（不中断连接）
sudo nginx -s reload
sudo systemctl reload nginx


