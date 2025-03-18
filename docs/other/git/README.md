## 常用命令

| 命令            | 用法                                         | 说明                                            |
| --------------- | -------------------------------------------- | ----------------------------------------------- |
| git init        | git init [directory]                         | 在当前目录或指定目录下初始化一个新的 Git 仓库。 |
| git clone       | git clone [url]                              | 克隆远程仓库到本地。                            |
| git add         | git add [file]                               | 将文件添加到暂存区。                            |
| git commit      | git commit -m "message"                      | 提交暂存区中的文件到本地仓库。                  |
| git status      | git status                                   | 显示工作区和暂存区的状态。                      |
| git push        | git push [remote] [branch]                   | 将本地分支的更新推送到远程仓库。                |
| git pull        | git pull [remote] [branch]                   | 拉取远程仓库的更新到本地。                      |
| git branch      | git branch                                   | 显示本地分支列表。                              |
| git checkout    | git checkout [branch]                        | 切换到指定分支。                                |
| git merge       | git merge [branch]                           | 合并指定分支到当前分支。                        |
| git remote      | git remote -v                                | 显示远程仓库的详细信息。                        |
| git log         | git log                                      | 显示提交历史记录。                              |
| git reset       | git reset [--soft, --mixed, --hard] [commit] | 撤销提交并重置 HEAD 到指定状态。                |
| git revert      | git revert [commit]                          | 撤销指定提交，并生成一个新的提交。              |
| git stash       | git stash                                    | 将当前工作区的修改暂存起来，以便稍后恢复。      |
| git cherry-pick | git cherry-pick [commit]                     | 选择一个提交并将其应用到当前分支。              |

## 拉取 git 仓库

```bash
git clone https://github.com/{账号名}/{仓库名}.git
```
