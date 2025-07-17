# 首次启动 Apache
sudo systemctl start apache2    # Debian/Ubuntu（服务名是 apache2）
sudo systemctl start httpd      # CentOS/RHEL（服务名是 httpd）

# 停止 Apache
sudo systemctl stop httpd

# 冷重启（完全停止后重启，中断连接）
sudo systemctl restart httpd

# 热重启（平滑重启，不中断连接）
sudo systemctl reload httpd   # 重新加载配置
sudo apachectl graceful       # 更推荐的热重启方式（跨发行版）
