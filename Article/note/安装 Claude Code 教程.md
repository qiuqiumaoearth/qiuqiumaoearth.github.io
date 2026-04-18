---
title: 安装 Claude Code 教程
date: 2026-04-18T17:13:00.000Z
updated: 2026-04-18T17:18:00.000Z
---

# Windows 11 下安装 Claude Code 教程


目标：在 PowerShell 里直接使用 `claude` 命令


## 一、前言


最近想在 **Windows 11 终端**里直接使用 Claude，也就是希望打开 PowerShell 后，输入：


```powershell
claude
```


或者：


```powershell
claude --version
```


就能直接运行。


一开始我尝试的是官方 PowerShell 安装方式：


```powershell
irm https://claude.ai/install.ps1 | iex
```


执行后终端显示：


```powershell
Setting up Claude Code...

Installing Claude Code native build latest...
```


然后就一直停在那里，没有继续输出。


后面我换成了 **winget 安装方式**，成功安装好了。这里把完整过程整理出来，给同样在 **Windows 11 + PowerShell** 环境下安装 Claude Code 的朋友参考。



## 二、我的环境


我的环境如下：

- 系统：Windows 11
- 终端：PowerShell
- Git：已安装
- 安装方式：`winget install Anthropic.ClaudeCode`

先说明一点：


Claude Code 在 Windows 下运行，**建议先确保 Git 已安装**，否则可能会出现安装异常或者后续使用问题。



## 三、先检查 Git 是否已安装


在 PowerShell 中输入下面两条命令：


```powershell
git --version
where.exe git
```


我的输出是：


![image.png](/images/notion/安装 Claude Code 教程-fd9ecd39.png)


这说明：

1. Git 已经安装成功
2. 系统可以正确找到 Git 的路径

如果你这里报错，比如提示 `git 不是内部或外部命令`，那就先去安装 Git，再继续后面的步骤。



## 四、直接用 winget 安装


我一开始运行的是：


```powershell
irm https://claude.ai/install.ps1 | iex
```


结果卡在：


```powershell
Setting up Claude Code...

Installing Claude Code native build latest...
```


如果你也遇到这种情况，而且 **几分钟都没有继续输出**，建议不要一直傻等，直接按：


```powershell
Ctrl + C
```


终止它，然后换成 **winget 安装**。


执行下面命令：


```powershell
winget install Anthropic.ClaudeCode
```


我的完整输出如下：


![image.png](/images/notion/安装 Claude Code 教程-3693ebab.png)


看到最后这两句就说明已经安装成功：


```powershell
Command line alias added: "claude"
Successfully installed
```



## 五、重点：安装完成后一定要重新打开 PowerShell


安装成功后，终端里还提示了一句很关键的话：


```powershell
Path environment variable modified; restart your shell to use the new value.
```


这句话的意思是：

> 系统的环境变量已经修改好了，但是**当前这个 PowerShell 窗口还没有刷新**，所以你不能马上在这个窗口里直接用 `claude`。

### 正确做法


关闭当前 PowerShell，**重新打开一个新的 PowerShell 窗口**，然后再执行：


```powershell
claude --version
```


![image.png](/images/notion/安装 Claude Code 教程-eb678a8f.png)


如果能正常显示版本号，就说明 Claude Code 已经安装成功了。



## 六、安装完成后如何验证


重新打开 PowerShell 后，输入：


```powershell
claude --version
```


如果一切正常，你会看到 Claude Code 的版本信息。


你也可以直接输入：


```powershell
claude
```


首次启动时，通常会进入 Claude Code 的命令行界面，之后就可以在终端里直接使用 Claude 了。



## 七、完整安装步骤总结


这里整理成最简洁的一套流程。


### 第 1 步：检查 Git


```powershell
git --version
where.exe git
```


确认 Git 已安装且路径正常。


### 第 2 步：使用 winget 安装 Claude Code


```powershell
winget install Anthropic.ClaudeCode
```


### 第 3 步：关闭当前 PowerShell


安装完成后，不要急着在当前窗口输入 `claude --version`。


### 第 4 步：重新打开新的 PowerShell 窗口


然后执行：


```powershell
claude --version
```


### 第 5 步：开始使用


```powershell
claude
```



## 八、常见问题


### 1. 为什么我执行 `irm https://claude.ai/install.ps1 | iex` 后一直不动？


这种情况大概率是：

- 网络下载慢
- 安装脚本执行过程中卡住
- Windows 环境下脚本安装不够顺利

如果卡了几分钟没有任何新输出，建议直接取消，然后改用：


```powershell
winget install Anthropic.ClaudeCode
```


这个方式在 Windows 上通常更直接。



### 2. 为什么我明明安装成功了，但输入 `claude` 还是提示找不到命令？


大概率是因为你**没有重新打开 PowerShell**。


因为安装程序虽然已经把 `claude` 的命令行别名加入到了环境变量中，但当前终端不会自动刷新。


解决方法：

- 关闭当前 PowerShell
- 重新打开一个新的 PowerShell
- 再执行 `claude --version`


### 3. 必须安装 Git 吗？


建议安装。


我这边是先确认了 Git 正常：


```powershell
git version 2.53.0.windows.3
D:\software\git\Git\cmd\git.exe
```


有 Git 的环境下，Claude Code 在 Windows 上通常更稳一些。



## 九、我这次的最终结论


对于 **Windows 11 + PowerShell** 用户来说：


### 可行方案


直接使用：


```powershell
winget install Anthropic.ClaudeCode
```


安装成功率更高，也更省事。


### 安装后最容易忽略的一点


**一定要重新打开 PowerShell 终端**，否则你会以为安装失败了，其实只是环境变量还没在当前窗口生效。



## 十、可直接复制的命令汇总


下面是最终可直接照着执行的一套命令：


```powershell
git --version
where.exe git
winget install Anthropic.ClaudeCode
```


安装完成后，关闭 PowerShell，重新打开，再执行：


```powershell
claude --version
claude
```



## 十一、结尾


如果你也是在 Windows 11 里想实现：


```powershell
claude
```


直接启动 Claude Code，那么推荐优先用 **winget 安装**。


如果官方脚本安装卡住，不用一直等，换这个方法通常更顺。


我这边已经实测通过，关键点就两句：

1. **先确认 Git 正常**
2. **安装完成后重开 PowerShell**

这样基本就没问题了。