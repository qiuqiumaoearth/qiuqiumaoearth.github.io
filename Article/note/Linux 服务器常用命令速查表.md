---
title: Linux 服务器常用命令速查表
date: 2026-04-11T13:18:00.000Z
updated: 2026-04-16T14:51:00.000Z
---

# **Linux 服务器常用命令速查表**


## 1. 文件与目录


```bash
# 查看当前目录
pwd

# 查看目录内容
ls
ls -l

# 查看隐藏目录
ls -la

# 切换目录
cd /path
cd ..
cd ~

# 创建目录
mkdir dir
mkdir -p a/b/c

# 删除文件
rm file.txt

# 删除目录
rm -r dir
rm -rf dir

# 复制
cp file1 file2
cp -r dir1 dir2

# 移动 / 重命名
mv old new

# 新建空文件
touch file.txt

# 查看文件类型
file filename

# 查看文件大小
du -sh *
du -sh filename
```



## 2. 文件查看


```bash
# 查看整个文件
cat file.txt

# 分页查看
less file.txt
more file.txt

# 查看前 10 行
head file.txt

# 查看后 10 行
tail file.txt

# 实时查看日志
tail -f app.log
```



## 3. 查找文件与内容


```bash
# 查找文件
find /path -name "test.txt"

# 查找目录
find /path -type d -name "logs"

# 查找大文件
find / -type f -size +100M

# 搜索内容
grep "keyword" file.txt

# 递归搜索
grep -r "keyword" /path

# 忽略大小写
grep -i "keyword" file.txt

# 显示行号
grep -n "keyword" file.txt
```



## 4. 压缩与解压


```bash
# zip 压缩
zip -r test.zip test/

# zip 解压
unzip test.zip

# 解压到指定目录
unzip test.zip -d /path/to/dir

# tar 打包
tar -cvf archive.tar dir/

# tar 解包
tar -xvf archive.tar

# tar.gz 压缩
tar -czvf archive.tar.gz dir/

# tar.gz 解压
tar -xzvf archive.tar.gz

# tar.bz2 解压
tar -xjvf archive.tar.bz2

# tar.xz 解压
tar -xJvf archive.tar.xz
```



## 5. 权限相关


```bash
# 查看权限
ls -l

# 修改权限
chmod 755 file.sh
chmod +x file.sh

# 修改拥有者
chown user:user file.txt

# 递归修改目录权限
chmod -R 755 dir
chown -R user:user dir
```


常见权限含义：

- `755`：所有者可读写执行，其他人可读执行
- `644`：所有者可读写，其他人只读


## 6. 用户与身份


```bash
# 查看当前用户
whoami

# 查看当前用户 id
id

# 切换用户
su username

# 以 root 执行命令
sudo command

# 查看当前登录用户
who

# 查看最近登录
last
```



## 7. 进程管理


```bash
# 查看进程
ps -ef
ps aux

# 按关键字查进程
ps -ef | grep nginx

# 实时查看进程
top

# 更友好的进程查看（如果安装了）
htop

# 杀进程
kill PID

# 强制杀进程
kill -9 PID

# 按名字杀进程
pkill nginx
killall java
```



## 8. 端口与网络


```bash
# 查看监听端口
ss -lntp

# 查看端口占用
ss -lntp | grep 8080

# 老命令
netstat -lntp

# 测试网络连通
ping 8.8.8.8

# 查看 IP
ip addr
ip a

# 查看路由
ip route

# 测试端口是否通
telnet host 80
nc -zv host 80

# 下载文件
wget URL
curl -O URL

# 查看 HTTP 响应头
curl -I https://example.com

# 发请求
curl https://example.com
```



## 9. 磁盘与内存


```bash
# 查看磁盘使用
df -h

# 查看目录占用
du -sh /path
du -sh *

# 查看内存
free -h

# 查看 CPU 信息
lscpu

# 查看块设备
lsblk

# 查看挂载
mount
```



## 10. 日志查看


```bash
# 实时看日志
tail -f /var/log/syslog

# 查看最近 100 行
tail -n 100 app.log

# 分页查看日志
less app.log

# systemd 日志
journalctl -u nginx

# 实时看服务日志
journalctl -u nginx -f

# 查看今天的日志
journalctl --since today
```



## 11. 服务管理（systemd）


```bash
# 启动服务
sudo systemctl start nginx

# 停止服务
sudo systemctl stop nginx

# 重启服务
sudo systemctl restart nginx

# 查看状态
sudo systemctl status nginx

# 开机自启
sudo systemctl enable nginx

# 取消开机自启
sudo systemctl disable nginx

# 重新加载配置
sudo systemctl reload nginx
```



## 12. 软件安装


### Ubuntu / Debian


```bash
sudo apt update
sudo apt install nginx
sudo apt remove nginx
```


### CentOS / RHEL / Rocky / AlmaLinux


```bash
sudo yum install nginx
sudo yum remove nginx

# 新版系统
sudo dnf install nginx
sudo dnf remove nginx
```



## 13. SSH 与远程操作


```bash
# SSH 登录
ssh user@server_ip

# 指定端口登录
ssh -p 2222 user@server_ip

# 复制文件到远程服务器
scp local.txt user@server_ip:/path/

# 从远程拉文件
scp user@server_ip:/path/file.txt ./

# 复制目录
scp -r localdir user@server_ip:/path/
```



## 14. 后台运行与会话保持


```bash
# 后台运行
nohup python app.py > app.log 2>&1 &

# 查看后台任务
jobs

# screen
screen -S mysession
screen -r mysession

# tmux
tmux new -s mysession
tmux attach -t mysession
```



## 15. 常用文本编辑


```bash
# 用 vim 编辑
vim file.txt

# 用 nano 编辑
nano file.txt
```


### Vim 常用


```bash
i      # 进入编辑
Esc    # 退出编辑模式
:wq    # 保存退出
:q!    # 强制退出不保存
```



## 16. 常见管道组合


```bash
# 统计文件数
ls | wc -l

# 查端口占用进程
ss -lntp | grep 8080

# 查 java 进程
ps -ef | grep java

# 查日志关键字并实时跟踪
tail -f app.log | grep "ERROR"

# 查最大文件
du -sh * | sort -h
```



## 17. 实用快捷命令


```bash
# 历史命令
history

# 清屏
clear

# 当前时间
date

# 查看系统信息
uname -a

# 查看发行版
cat /etc/os-release

# 查看主机名
hostname

# 临时切 root
sudo -i
```



## 18. 服务器排障常用


```bash
# 看 CPU/内存
top
free -h

# 看磁盘
df -h
du -sh /var/*

# 看端口
ss -lntp

# 看进程
ps -ef | grep nginx

# 看服务状态
systemctl status nginx

# 看日志
journalctl -u nginx -f
tail -f /var/log/nginx/error.log
```



## 19. 删除/清理时高危命令


下面这些命令要特别小心：


```bash
rm -rf /
rm -rf *
chmod -R 777 /
chown -R user:user /
```


执行前最好先用：


```bash
pwd
ls
```


确认当前路径没问题。



## 20. 新手最常用的 10 个


```bash
pwd
ls -la
cd /path
cat file.txt
tail -f app.log
grep -r "keyword" .
ps -ef | grep nginx
ss -lntp
df -h
systemctl status nginx
```


1



## 在 **JupyterLab 里显示隐藏文件/隐藏目录**


![image.png](/images/notion/Linux 服务器常用命令速查表-e67c817c.png)


```bash
# UID   PID   PPID   C   STIME   TTY   TIME   CMD
# root  2084  903    0    22:04   ?    00:00:02   /root/miniconda3/bin/python /root/miniconda3/bin/jupyter-lab --allow-root --config=/init/jupyter/jupyter_config.py
# 用户 进程号 父进程号 CPU  进程启动时间 []  进程累计使用CPU时间  
# PPID，父进程号:这个 Jupyter 进程是被 903 这个进程拉起来的
# C:CPU 占用的一个简单标记。这里是 0，表示当前占用很低，基本可以忽略
# 用的是 /root/miniconda3/bin/python
# 启动的是 jupyter-lab
# 允许 root 运行：--allow-root
# 读取的配置文件是：/init/jupyter/jupyter_config.py

root@autodl-container-zp04b8cr6v-a35bb873:~# ps -ef | grep jupyter
root       2084    903  0 22:04 ?        00:00:02 /root/miniconda3/bin/python /root/miniconda3/bin/jupyter-lab --allow-root --config=/init/jupyter/jupyter_config.py
root       3107   2160  0 22:40 pts/1    00:00:00 grep --color=auto jupyter
```


```bash
# 1. 看 Jupyter 用的是哪个配置文件
ps -ef | grep jupyter
# 谁在 --config= 后面，谁就是你该改的配置文件
# /init/jupyter/jupyter_config.py


# 2. 编辑配置文件
vim /init/jupyter/jupyter_config.py

# 输入i进入编辑
# 输入:wq 退出编辑文档

# 加入这两行
# 隐藏目录
c.ContentsManager.allow_hidden = True

# 隐藏文件
c.FileContentsManager.allow_hidden = True

# 3. 检查配置是否写入
grep -n "allow_hidden" /init/jupyter/jupyter_config.py

# 4. 杀掉旧 Jupyter 进程
kill JUPYTER_PID

# 5. 如未自动拉起则手动启动
nohup /root/miniconda3/bin/jupyter-lab --allow-root --config=/init/jupyter/jupyter_config.py > /tmp/jupyter.log 2>&1 &

# nohup 表示“退出 SSH 后也继续跑”。

# 查jupyer-lab路径
# /root/miniconda3/bin/jupyter-lab
which jupyter-lab

# 允许 root 用户启动 JupyterLab:--allow-root
# 指定配置文件路径:--config=/init/jupyter/jupyter_config.py
ps -ef | grep jupyter

# 启动日志写到 /tmp/jupyter.log 文件里，方便排错:> /tmp/jupyter.log
# 把报错信息也一起写进同一个日志文件:2>&1
# 放到后台运行:&

# 6. 查看是否正常启动
ps -ef | grep jupyter
ss -lntp | grep 8888
```