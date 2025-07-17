# 在 /etc/nginx 下创建密码文件，并新增一个用户名（例如 davuser）
sudo htpasswd -c /etc/nginx/.htpasswd davuser
# 系统会提示你输入并确认密码
