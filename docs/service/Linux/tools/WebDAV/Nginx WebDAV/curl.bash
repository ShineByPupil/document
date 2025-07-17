# 查看已安装模块（默认包含http_dav_module，不含 dav-ext）
nginx -V 2>&1 | grep -E 'dav_module|dav_ext'
nginx -V 2>&1 | grep --color=auto http_dav_module
nginx -V 2>&1 | grep --color=auto dav_ext

# 测试查询列表（不支持）
curl -u davuser:123456 -X PROPFIND http://101.37.82.81/dav/
# 测试上传（支持基础方法）
curl -u davuser:123456 -T test.txt http://101.37.82.81/dav/
