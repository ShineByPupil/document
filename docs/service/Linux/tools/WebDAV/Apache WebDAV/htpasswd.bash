# 首次创建用户（-c 参数生成文件）
sudo htpasswd -c /etc/httpd/conf/webdav.passwd username1

# 后续添加用户（省略 -c）
sudo htpasswd /etc/httpd/conf/webdav.passwd davuser

# 列出所有用户
cut -d: -f1 /etc/httpd/conf/webdav.passwd

# 修改已有用户密码
sudo htpasswd /etc/httpd/conf/webdav.passwd davuser

# 删除用户
sudo htpasswd -D /etc/httpd/conf/webdav.passwd username1
