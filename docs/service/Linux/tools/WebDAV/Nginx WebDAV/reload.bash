# 测试配置是否有语法错误
sudo nginx -t
# 查看日志
tail -f /var/log/nginx/error.log

# 重启
sudo systemctl reload nginx
