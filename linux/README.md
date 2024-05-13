# linux

Linux 是一个免费、开源的类 Unix 操作系统内核，最初由 Linus Torvalds 在 1991 年创建。Linux 内核是操作系统的核心部分，它负责管理计算机硬件资源，并提供了基本的系统服务

## SSH

用于与远程计算机建立安全连接的应用程序。它允许用户通过加密的方式在两台计算机之间进行远程连接和通信，以便执行各种操作，如远程登录、文件传输、远程命令执行等

[Bitvise SSH Client 下载地址](https://bitvise.com/download-area)

## 常用命令

| 命令  | 用法                                         | 说明                                         |
| ----- | -------------------------------------------- | -------------------------------------------- |
| ls    | ls [options] [directory]                     | 列出指定目录的文件和子目录。                 |
| cd    | cd [directory]                               | 切换当前工作目录。                           |
| pwd   | pwd                                          | 显示当前工作目录的路径。                     |
| mkdir | mkdir [directory]                            | 创建新目录。                                 |
| rm    | rm [options] [file/directory]                | 删除文件或目录。                             |
| cp    | cp [options] source destination              | 复制文件或目录。                             |
| mv    | mv [options] source destination              | 移动文件或目录，也可用于重命名文件。         |
| cat   | cat [file]                                   | 查看文件内容。                               |
| grep  | grep [options] pattern [file]                | 在文件中搜索指定模式。                       |
| chmod | chmod [options] mode file                    | 修改文件权限。                               |
| chown | chown [options] user:group file              | 修改文件所有者。                             |
| ps    | ps [options]                                 | 显示系统中的进程列表。                       |
| kill  | kill [options] pid                           | 终止指定进程。                               |
| top   | top                                          | 实时显示系统资源使用情况和进程列表。         |
| df    | df [options]                                 | 显示磁盘空间使用情况。                       |
| du    | du [options] [directory/file]                | 显示目录或文件的磁盘使用情况。               |
| wget  | wget [options] [url]                         | 从网络下载文件。                             |
| tar   | tar [options] [file/directory]               | 打包和解压文件。                             |
| ssh   | ssh [user@]hostname                          | 远程登录到其他计算机。                       |
| scp   | scp [options] [file] [user@]host:destination | 在本地计算机和远程计算机之间安全地复制文件。 |

## 安装软件

- Python
  ```bash
  sudo yum install python3
  python3 --version
  sudo yum update python3
  ```
- git
  ```bash
  sudo yum install git
  git --version
  ```
- nodejs
  ```bash
  sudo yum install nodejs npm
  ```
- [mysql](./mysql.md)
