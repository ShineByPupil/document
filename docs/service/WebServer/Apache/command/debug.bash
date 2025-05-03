# 检查配置文件语法
sudo apachectl configtest
sudo httpd -t

# 查看最后10条错误日志
sudo tail -n 10 /var/log/httpd/error.log

# 查看最后10条访问日志
sudo tail -n 10 /var/log/httpd/access.log

# 查看 Apache 服务状态
sudo systemctl status httpd

# 查看正在监听的端口和进程
sudo netstat -tnlp | grep httpd
sudo ss -tnlp | grep httpd
