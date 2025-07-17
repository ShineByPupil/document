# 检查配置语法
sudo httpd -t
# 或者（以 root 权限调用 apachectl）
sudo apachectl -t

# 查看最近 10 条错误日志
sudo tail -n 10 /var/log/httpd/error_log

# 查看最近 10 条访问日志
sudo tail -n 10 /var/log/httpd/access_log

# 第一次启动
sudo systemctl start httpd

# 停止服务
sudo systemctl stop httpd

# 冷重启（会中断连接）
sudo systemctl restart httpd

# 热重载（平滑重启，不断开现有连接）
sudo systemctl reload httpd
# 或者
sudo apachectl graceful

# 设置开机自启
sudo systemctl enable httpd

# 取消开机自启
sudo systemctl disable httpd

# 查看服务状态
sudo systemctl status httpd

# 查看监听端口和进程
sudo ss -tnlp | grep httpd
