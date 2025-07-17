# 包含 WebDAV 所需模块
sudo dnf install httpd mod_dav mod_dav_svn

# 启动并设置开机自启
sudo systemctl enable --now httpd
