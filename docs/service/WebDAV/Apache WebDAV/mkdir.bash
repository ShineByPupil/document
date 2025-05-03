sudo mkdir -p /var/www/html/DavLock
sudo chown -R apache:apache /var/www/html/DavLock

sudo mkdir -p /var/www/html/webdav/Apps/Books/.Moon+ # 创建目录
sudo mkdir -p /var/www/html/webdav/Apps/Books/.Moon+/Cache

sudo chown -R apache:apache /var/www/html/webdav/Apps/Books

sudo chown -R apache:apache /var/www/html/webdav/Apps/Books/.Moon+ # 权限
sudo chown -R apache:apache /var/www/html/webdav/Apps/Books/.Moon+/Cache # 权限
# 给 Apache 用户写权限
sudo chown -R apache:apache /var/www/html/webdav
# 或者设置更宽松的权限（注意安全风险）
sudo chmod -R 777 /var/www/html/webdav



# 设置目录权限等级
sudo chmod -R 755 /var/www/html/webdav
