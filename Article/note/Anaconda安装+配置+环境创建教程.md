---
title: Anaconda安装+配置+环境创建教程
date: 2026-04-17T11:11:00.000Z
updated: 2026-04-17T14:13:00.000Z
---

# **Anaconda安装+配置+环境创建教程**


## 一、Anaconda简介


🥰Anaconda 是一个开源的 Python 和 R 语言的发行版本，主要用于数据科学、机器学习和科学计算。它包含了大量的科学计算库和工具，并且提供了一个方便的环境管理工具，使得用户可以轻松地创建、管理和切换不同的 Python 环境。（我使用的原因是可以方便的切换python环境，每个环境包与包的版本不冲突，以及可以很方便的导入与导出包）


### Anaconda 的主要特点


1.  包管理：

1. Anaconda 使用 conda 作为包管理工具，可以方便地安装、更新和删除 Python 包。
2. 支持多种操作系统和平台（Windows、macOS、Linux）。

2.  环境管理

1. Anaconda 允许用户创建独立的 Python 环境，每个环境可以有不同的 Python 版本和包依赖。
2. 使用

    ```bash
    conda env
    ```


    命令可以轻松创建、激活、删除和管理环境。


3.  集成开发环境（IDE）

1. Anaconda 提供了 Jupyter Notebook 和 JupyterLab，这些工具非常适合数据分析和可视化。
2. 还集成了 Spyder，一个专门为科学计算设计的 IDE。

4. 预装包

1. Anaconda 发行版预装了大量的科学计算库，如 NumPy、Pandas、Matplotlib、SciPy、Scikit-learn 等。
2. 还包括一些常用的数据科学工具，如 TensorFlow、PyTorch 等。

5. 社区支持：

1. Anaconda 有一个活跃的社区，用户可以在社区中获取帮助、分享经验和学习资源。


## 二、Anaconda 的下载


### 下载方式有两种：


### 1、在anaconda的官网上进行安装


（国内网络的问题，下载速度很慢，不推荐）


[Advance AI with Open Source | Anaconda](https://www.anaconda.com/)


Anaconda可以在Windows、MacOS、Linux 系统平台中安装和使用，下载的时候找到对应的点击即可。


![image.png](/images/notion/Anaconda安装+配置+环境创建教程-87cc6f69.png)


### **2、使用清华镜像源下载（下载速度快，推荐）**


[https://mirrors.tuna.tsinghua.edu.cn/anaconda/archive/?C=M&O=D](https://mirrors.tuna.tsinghua.edu.cn/anaconda/archive/?C=M&O=D)


![image.png](/images/notion/Anaconda安装+配置+环境创建教程-371bc903.png)


我的电脑是windows系统，我这里选择下载最新版本的Anaconda3-2024.06-1-windows-x86_64.exe下载完成我们就可以得到一个exe文件



## 三、Anaconda 的安装


下载完成后，只需要一步一步按照提示安装即可，以下说明安装过程中需要特别注意的步骤


### Step1:直接点击next


![image.png](/images/notion/Anaconda安装+配置+环境创建教程-39b8c6e3.png)


### Step2:点击 I Agree


![image.png](/images/notion/Anaconda安装+配置+环境创建教程-9b0f7f36.png)


### Step3:选择 ALL users


（选择仅个人的话，后面使用可能会报错）,然后点击next


![image.png](/images/notion/Anaconda安装+配置+环境创建教程-f8bfb1bf.png)


### Step4:选择anaconda的安装位置


> 💡 Tips: 这里建议修改为其他盘,要不然下载的包和创建的环境都在C盘，占用空间，我这里修为为F盘（专门安装软件的盘），后面介绍如何把创建的环境和下载的包都装在自己想装的盘里。


![image.png](/images/notion/Anaconda安装+配置+环境创建教程-2ee6b124.png)


### Step5:这里把三个勾全部打上，然后点击Install,anaconda开始安装


> 💡 🔒 创建开始菜单  
> 🔒 base环境以python3.12创建  
> 🔒 清除包缓存


![image.png](/images/notion/Anaconda安装+配置+环境创建教程-06511c15.png)


### Step6:安装进行中，等待即可，这一步取决于电脑的性能。


![image.png](/images/notion/Anaconda安装+配置+环境创建教程-d90e9eb4.png)


### Step7: 点击【Next】——再次点击【Next】


![image.png](/images/notion/Anaconda安装+配置+环境创建教程-ca6f6027.png)


### Step8：接着来到最后一步，两个勾取消，不要框选。点击【Finish】


> 💡 到这里anaconda的安装基本完成，接下来要对anaconda进行一些配置


![image.png](/images/notion/Anaconda安装+配置+环境创建教程-de022154.png)



## 四、anaconda的基本配置


### 1、环境变量的配置

> 电脑设置搜索栏搜索高级系统设置

![image.png](/images/notion/Anaconda安装+配置+环境创建教程-293a1a86.png)

> 选择环境变量

![image.png](/images/notion/Anaconda安装+配置+环境创建教程-ea6fcdc8.png)

> 系统变量选择path，双击进入

![image.png](/images/notion/Anaconda安装+配置+环境创建教程-cee10b44.png)

> 新建环境变量【根据自己安装的盘，选择对应的盘】  
> D:\anaconda3  
> D:\anaconda3\Scripts  
> D:\anaconda3\Library\bin  
> D:\anaconda3\Library\mingw-w64\bin

![image.png](/images/notion/Anaconda安装+配置+环境创建教程-7b4532d1.png)

> 在windows菜单栏搜索Anaconda,以管理员身份打开anaconda prompt 

输入这行代码，查看版本号，检查是否成功安装


```powershell
conda --version
```


成功安装会显示Anaconda的版本号，这里anaconda就安装完成了，但是并没有结束，因为还涉及到环境和包的下载，这里默认是下载在C盘的，我们需要更改下载的位置，以免占C盘系统盘内存；最后再添加镜像源方便下载环境的包（网速更快）


![image.png](/images/notion/Anaconda安装+配置+环境创建教程-f11ca39c.png)



## 五、Anaconda默认环境保存路径和下载源修改


因为更改环境保存路径和更改下载源都可以在.condarc文件中修改，这里一次性配置完

> 打开上面的anaconda prompt命令窗口，输入 conda info

没有修改的conda的pkgs和envs均保存在C盘，为了不占用系统盘的空间，我们需要修改保存的位置


![image.png](/images/notion/Anaconda安装+配置+环境创建教程-d9003a44.png)

> 在C盘-用户-用户名，找到.condarc  
> 如果找不到打开anaconda prompt输入以下命令  
> conda config --set show_channel_urls yes

即可找到，用记事本打开


![image.png](/images/notion/Anaconda安装+配置+环境创建教程-0ccdc30d.png)

> 删除其他的，输入以下指令【注意修改为自己想要安装的盘，我这里修改为F盘】

```powershell
envs_dirs:
  - F:\Anaconda_envs\envs
pkgs_dirs:
  - F:\Anaconda_envs\pkgs
```


![image.png](/images/notion/Anaconda安装+配置+环境创建教程-94353ff6.png)

> CTRL + S保存

（此处更新不及时，需要自己找到最新可用的镜像源）conda镜像源的配置，因为conda很多下载的东西在国外，默认的下载速度往往会很慢，这里建议修改为清华的镜像源，以管理员身份打开anaconda prompt，输入以下指令


```powershell
# 添加清华源
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/free/
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/conda-forge/
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/pytorch/
 
# 添加阿里云镜像源
conda config --add channels https://mirrors.aliyun.com/anaconda/pkgs/free/
conda config --add channels https://mirrors.aliyun.com/anaconda/pkgs/main/
 
# 添加中科大源
conda config --add channels https://mirrors.ustc.edu.cn/anaconda/pkgs/free/
conda config --add channels https://mirrors.ustc.edu.cn/anaconda/pkgs/main/
conda config --add channels https://mirrors.ustc.edu.cn/anaconda/cloud/conda-forge/
conda config --add channels https://mirrors.ustc.edu.cn/anaconda/cloud/msys2/
conda config --add channels https://mirrors.ustc.edu.cn/anaconda/cloud/bioconda/
conda config --add channels https://mirrors.ustc.edu.cn/anaconda/cloud/menpo/
 
 
 
# （可选）设置搜索时显示通道地址
conda config --set show_channel_urls yes
```


如果这里误装了不可用的镜像源可以输入以下指令删除


```powershell
conda config --remove-key channels
```


最后我们验证一下上面的内容是否成功配置 conda info


首先pkgs和envs都修改为F盘了


![image.png](/images/notion/Anaconda安装+配置+环境创建教程-15e30fd5.png)


其次我们看镜像源也成功配置


![image.png](/images/notion/Anaconda安装+配置+环境创建教程-71f7278c.png)


😍这里Anaconda的安装和基本配置已经完成，快去创建一个自己的环境吧！！！！😍


😍具体的指令可以去anaconda官网上学习保存，咱们CSDN也有很多同学总结的指令哦！！😍



## 六、遇到的问题


### 火绒防护


最近重装Windows电脑上安装**Anaconda**及**Python**环境。但是，在下载好安装包进行安装时，发现安装进度一直卡在了“**Setting up the package cache**”这个环节，等了大概半个小时都没有变化，如下图所示。


![image.png](/images/notion/Anaconda安装+配置+环境创建教程-fe0ca483.png)


一开始，还以为可能是和**安装第三方库时，有时所用国外源网络不稳定导致安装比较慢**类似，在安装**Anaconda**时可能也有源这一说所以导致安装较慢；但是在之前自己的多台电脑，以及读研时课题组电脑中，也都没有在安装阶段换过源，但都没有出现过这种情况，所以大概率不是这个问题。


![image.png](/images/notion/Anaconda安装+配置+环境创建教程-c1bfed03.png)


后来，经过不断搜索、尝试，发现这个问题是**火绒**的安全软件导致的。因为这个是单位的电脑，所以在其中安装了火绒软件，如下图所示。


![image.png](/images/notion/Anaconda安装+配置+环境创建教程-70747e29.png)


那么，解决方法就很简单了。大家可以在电脑右下角的火绒图标上右键，并选择“**退出火绒**”。如下图所示。


![image.png](/images/notion/Anaconda安装+配置+环境创建教程-f3b1c100.png)


随后，**Anaconda**的安装进度就应该可以动起来了。当然，可能得稍微等一下，我当初关掉火绒后，似乎等了可能半分钟，安装进度才开始继续执行。如下图所示。


![image.png](/images/notion/Anaconda安装+配置+环境创建教程-8cd4f2fe.png)


当然，还是本文开头说的，这个方法虽然对我有效，但是不一定适用于全部情况。所以如果大家电脑中没有火绒，或者有火绒但是关闭了之后这个安装进度还是很久没有反应，那就得换一种其他解决方法来尝试了。



## 原文链接


[最新版最详细Anaconda新手安装+配置+环境创建教程_anaconda配置-CSDN博客](https://blog.csdn.net/qq_44000789/article/details/142214660)