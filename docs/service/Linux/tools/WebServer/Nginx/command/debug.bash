# 检查配置
sudo nginx -t

# 查看10条日志
sudo tail -n 10 /var/log/nginx/error.log

# 查看最后10条访问日志
sudo tail -n 10 /var/log/nginx/access.log

# 查看 Apache 服务状态
sudo systemctl status nginx

# 查看正在监听的端口和进程
sudo netstat -tnlp | grep nginx
sudo ss -tnlp | grep nginx
