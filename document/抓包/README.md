# 抓包

## Wireshark

> Wireshark 是一款强大的网络分析工具，适合各种网络分析和故障排除任务

1. 开源、免费
2. 界面友好，支持中文
3. 强大丰富的筛选规则
4. 支持数百种网络协议
5. 能够捕获网络上的所有流量

### 安装

[下载地址](https://www.wireshark.org/download.html)

- [ ] Install USBPcap 1.5.4.0
      (Use Add/Remove Programs first to uninstall any undetected old USBPcap versions)

`USBPcap` 是一个用于捕获 USB 流量的工具，通常与 Wireshark 一起使用。它的主要用途是监控和分析 USB 设备之间的通信，适用于调试 USB 设备或应用程序。_默认不勾选，有需要可以勾选_

### 事前配置

**设置 SSL 文件，解析加密数据**

window 操作系统，打开环境变量设置并新增。**变量名**设置为`SSLKEYLOGFILE`，变量值设置为`D:\sslkeys.log`

回到 Wireshark 软件中。根据下面步骤，编辑 > 首选项 > Protocols > TLS
`(Pre)-Master-Secret log filename` 项目选择会话秘钥文件 `sslkeys.log`

**捕获流量**

开始捕获分组和停止捕获分组互斥。开始捕获分组会清空历史记录，_可选择保存到磁盘_。

```mermaid
graph LR
    A[准备请求操作] --> B[开始捕获]
    B --> C[请求操作]
    C --> D[停止捕获]
    D --> E[分析流量]
```

**筛选流量**

快捷键 `ctrl + /` 过滤器。根据规则过滤，只**显示**满足规则的分组
快捷键 `ctrl + F` 查找分组。根据关键词查找并**跳转**到满足规则的分组，多次触发则跳转到下一个

分组列表、分组详情、分组字节流分别对应表格、树状结构、十六进制 + ASCII。
分组详情包含的关键信息更多。在分组详情找到心仪的规则，可以右键选中

|  连接符  |      说明      |
| :------: | :------------: |
|    ==    |  规则完全匹配  |
|    !=    |   规则不匹配   |
| contains | 规则包含关键词 |
|   !()    |    规则取反    |
|   and    |  连接多条规则  |
|    or    |  连接多条规则  |

官方过滤器文档：[筛选项](https://www.wireshark.org/docs/dfref/)

**快速找到目标流量**

- 查找分组详情的字符串"keyword"_（勾选区分大小写）_
  - keyword 设置为 post 请求参数
  - keyword 设置为 请求的某个返回值
- 过滤器设置为 http.request.full_uri contains "keyword"
  - keyword 设置为 get 请求参数
  - 知晓请求的详细信息，keyword 设置 uri 关键词

**查看请求返回数据**

对分组追踪流(_右键菜单选项_)，显示设置为 `UTF-8` ，可正常展示汉字数据

- 滤掉此流。过滤器会增加排除规则，规则能够通过 and 叠加。
- 返回。过滤器恢复原样。
- 关闭。过滤器保持追踪流规则。

## Charles
