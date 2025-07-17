# Nginx
sudo nginx -t # 检查配置
sudo tail -f /var/log/nginx/error.log # 查看日志
sudo systemctl reload nginx # 重启服务

# Apache
sudo apachectl configtest # 检查配置
sudo sh -c '> /var/log/httpd/error_log' # 清空日志
sudo tail -n 10 /var/log/httpd/error_log # 查看日志
sudo apachectl graceful # 重启服务

# 测试查询列表（不支持）
curl -u davuser:123456 -X PROPFIND http://101.37.82.81/dav/
# 测试上传（支持基础方法）
curl -u davuser:123456 -T test.txt http://101.37.82.81/dav/

curl -u davuser:123456 -T test.txt http://101.37.82.81/dav/Apps/Books/.Moon+/test.txt
curl -X MKCOL -u davuser:123456 http://101.37.82.81/dav/path/to/directory
