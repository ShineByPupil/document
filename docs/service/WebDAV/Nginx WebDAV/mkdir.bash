# 将 WebDAV 目录放在 /var/www/webdav
sudo mkdir -p /var/www/webdav

# 确保 Nginx 有读写权限
sudo chown -R nginx:nginx /var/www/webdav
sudo chmod -R 770 /var/www/webdav
