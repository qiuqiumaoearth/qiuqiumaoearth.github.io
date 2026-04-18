---
title: nvm安装教程
date: 2026-04-17T10:11:00.000Z
updated: 2026-04-17T11:05:00.000Z
---

# **nvm安装和使用保姆级教程（详细）**


## **一、 nvm是什么** 


nvm全英文也叫node.js version management，是一个nodejs的版本管理工具。nvm和npm都是node.js版本管理工具，为了解决node.js各种版本存在不兼容现象可以通过它可以安装和切换不同版本的node.js。



## **二、卸载之前安装的node**


1、不能安装任何node版本（如存在请删除后安装nvm）;


2、打开系统的 控制 面板，点击卸载程序，卸载nodejs


![f3a2b49923424dcebdaaaf5d51100f22.png](https://i-blog.csdnimg.cn/direct/f3a2b49923424dcebdaaaf5d51100f22.png)


![71d5281d6c374b8985244a0c1a25e763.png](https://i-blog.csdnimg.cn/direct/71d5281d6c374b8985244a0c1a25e763.png)


3、删除node的安装目录


默认是C:\Program Files\nodejs，也可能在其他盘，主要取决于安装时的选择。


查看该路径下是否有node文件，我这里已经没有了，在控制面板[卸载node](https://so.csdn.net/so/search?q=%E5%8D%B8%E8%BD%BDnode&spm=1001.2101.3001.7020)后一般会自动删除node文件，如果文件还在的话就手动删除。


![3b8f86613e564de8bef638b6063175f8.png](https://i-blog.csdnimg.cn/direct/3b8f86613e564de8bef638b6063175f8.png)


4、查找.npmrc文件是否存在，有就删除


默认在C:\User\用户名。


![25986f3b503a48a796f0462c3548bc5d.png](https://i-blog.csdnimg.cn/direct/25986f3b503a48a796f0462c3548bc5d.png)


5、逐一查看一下文件是否存在，存在就删除


C:\Program Files (x86)\Nodejs


C:\Program Files\Nodejs


C:\Users\用户名\AppData\Roaming\npm


C:\Users\用户名\AppData\Roaming\npm-cache


![7d59d839dc0648778b3d9e6a0c5c6375.png](https://i-blog.csdnimg.cn/direct/7d59d839dc0648778b3d9e6a0c5c6375.png)


6、查看是否删除成功


在键盘上按下win + R ，输入cmd ，然后点击回车键，在 命令行 中输入node -v


![0fbea3631c70488f9d049dc20acab886.png](https://i-blog.csdnimg.cn/direct/0fbea3631c70488f9d049dc20acab886.png)


![040057c7d6fa4e9a890d849b3c47064c.png](https://i-blog.csdnimg.cn/direct/040057c7d6fa4e9a890d849b3c47064c.png)



## **三、nvm下载**


下载地址：[Releases · coreybutler/nvm-windows (github.com)](https://github.com/coreybutler/nvm-windows/releases)


可在点此在github上下载最新版本,本次下载安装的是windows版本。打开网址我们可以看到有两个版本：


nvm 1.1.7-setup.zip：安装版，推荐使用


nvm 1.1.7-noinstall.zip: 绿色免安装版，但使用时需进行配置。


![7268fb18a78a4b9d81ae4100f7ec6797.png](https://i-blog.csdnimg.cn/direct/7268fb18a78a4b9d81ae4100f7ec6797.png)



## **四、nvm安装**


1.下载完成后解压, nvm-setup .zip，直接运行nvm-setup.exe


2.选择nvm安装路径


![b6b3fa5492a51883aaebcfaeeff0cfd2.png](https://i-blog.csdnimg.cn/blog_migrate/b6b3fa5492a51883aaebcfaeeff0cfd2.png)


3、选择nodejs路径


![3b0a91c2d69a4ef64c19aadf08f38b57.png](https://i-blog.csdnimg.cn/blog_migrate/3b0a91c2d69a4ef64c19aadf08f38b57.png)


4.确认安装即可


![5a05e51cad83e43b8301927688bd1f02.png](https://i-blog.csdnimg.cn/blog_migrate/5a05e51cad83e43b8301927688bd1f02.png)


5.安装完确认


![f49abbfe56c74884bd1acc725534111e.png](https://i-blog.csdnimg.cn/direct/f49abbfe56c74884bd1acc725534111e.png)


6、nvm命令提示


```javascript
nvm arch：显示node是运行在32位还是64位。
nvm install <version> [arch] ：安装node， version是特定版本也可以是最新稳定版本latest。可选参数arch指定安装32位还是64位版本，默认是系统位数。可以添加--insecure绕过远程服务器的SSL。
nvm list [available] ：显示已安装的列表。可选参数available，显示可安装的所有版本。list可简化为ls。
nvm on ：开启node.js版本管理。
nvm off ：关闭node.js版本管理。
nvm proxy [url] ：设置下载代理。不加可选参数url，显示当前代理。将url设置为none则移除代理。
nvm node_mirror [url] ：设置node镜像。默认是https://nodejs.org/dist/。如果不写url，则使用默认url。设置后可至安装目录settings.txt文件查看，也可直接在该文件操作。
nvm npm_mirror [url] ：设置npm镜像。https://github.com/npm/cli/archive/。如果不写url，则使用默认url。设置后可至安装目录settings.txt文件查看，也可直接在该文件操作。
nvm uninstall <version> ：卸载指定版本node。
nvm use [version] [arch] ：使用制定版本node。可指定32/64位。
nvm root [path] ：设置存储不同版本node的目录。如果未设置，默认使用当前目录。
nvm version ：显示nvm版本。version可简化为v。
```


7、在命令行输入nvm root可以找到nvm安装路径 -> 找到 settings.txt 文件 -> 添加下载源


```javascript
、
node_mirror: https://npmmirror.com/mirrors/node/
npm_mirror: https://npmmirror.com/mirrors/npm/
、
```


![9597ae8c92ce49a09973e20609d849b5.png](https://i-blog.csdnimg.cn/direct/9597ae8c92ce49a09973e20609d849b5.png)


8、配置nvm环境变量


我的电脑->属性->高级系统设置->环境变量->系统环境变量->Path下新建一个


![0721756090df4219b27d79f27a9c3edc.png](https://i-blog.csdnimg.cn/direct/0721756090df4219b27d79f27a9c3edc.png)



## **五、安装node.js版本**


1、nvm list available 显示可下载版本的部分列表


![0401d0d289444bf78be6932dcc63ac5d.png](https://i-blog.csdnimg.cn/direct/0401d0d289444bf78be6932dcc63ac5d.png)


2、nvm install 版本号 安装指定的版本的nodejs


![298572b9a082bf2c78a89d7fa95a0872.png](https://i-blog.csdnimg.cn/blog_migrate/298572b9a082bf2c78a89d7fa95a0872.png)


![0bd2ed844ab2bf0d60c929ab82820ac4.png](https://i-blog.csdnimg.cn/blog_migrate/0bd2ed844ab2bf0d60c929ab82820ac4.png)


3、查看已安装版本


nvm list或nvm ls查看目前已经安装的版本 （ 当前版本号前面没有 * ， 此时还没有使用任何一个版本，这时使用 node.js 时会报错 ）


![9dcd81b897534c818bc628711fdc62f1.png](https://i-blog.csdnimg.cn/direct/9dcd81b897534c818bc628711fdc62f1.png)


切换node版本


nvm use版本号 使用指定版本的nodejs （ 这时会发现在启用的 node 版本前面有 * 标记，这时就可以使用 node.js ）


![08ab69777a8746f58997b72e5e9f6654.png](https://i-blog.csdnimg.cn/direct/08ab69777a8746f58997b72e5e9f6654.png)


![image.png](/images/notion/nvm安装教程-ce55896c.png)



## 六、nvm常见问题


1.在安装nvm的时候没有卸载node，导致使用nvm安装完之后，node和npm都不可用。


2.在第一次使用nvm安装node后，要记得使用 nvm use 切换下node版本，以及用 nvm on 打开nodejs版本控制，不然这时候node和npm也都不可用。


3.全局安装完npm的时候，需要关掉终端窗口重新打开，才能装得上cnpm。


4.选择nvm的安装 文件夹 时，注意文件夹名不要出现中文和空格。



## 原文链接


[nvm安装和使用保姆级教程（详细）-CSDN博客](https://blog.csdn.net/weixin_38383877/article/details/143077797)