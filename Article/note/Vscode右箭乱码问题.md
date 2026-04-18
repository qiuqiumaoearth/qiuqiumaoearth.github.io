---
title: Vscode右箭乱码问题
date: 2026-04-17T16:09:00.000Z
updated: 2026-04-17T17:36:00.000Z
---

# Windows 11 下 VS Code 右键菜单“通过 Code 打开”中文乱码：排查过程、原因分析与临时修复方案


**标签：** `vscode` `windows11` `注册表` `右键菜单` `HiBitUninstaller`


最近踩到了一个比较冷门但很恶心的问题：


在 **Windows 11** 上，使用 **HiBit Uninstaller** 扫描注册表后，**VS Code 用户版（User Installer）** 的右键菜单项 **“通过 Code 打开”** 会变成中文乱码，但点击功能本身仍然正常，只是显示异常。这个问题在我这里可以稳定复现，而且简单重装 VS Code 基本无效。


![image.png](/images/notion/Vscode右箭乱码问题-1e5d926b.png)


这篇文章把我这段时间的排查过程、目前能确认的规律、临时修复办法，以及一个可自动清理问题注册表项的脚本整理出来，供后来遇到同样问题的人参考。



## 一、问题现象


具体现象如下：

- 右键文件、文件夹，或者文件夹空白处时，VS Code 菜单项文字显示为乱码
- 菜单功能正常，点击后依然可以正常调用 VS Code
- 重新安装 VS Code 后，问题不一定消失
- 在 Windows 11 上可以复现，Windows 10 下我没有复现出来

我最初以为是 VS Code 安装损坏，或者是系统编码问题，但后面测试下来都不是这么简单。



## 二、测试环境


我这边用于复现和排查的环境大致如下：


**系统环境**

- Windows 11 24H2 / 25H2

**软件版本**

- VS Code：`VSCodeUserSetup-x64-1.111.0`
- HiBit Uninstaller：`4.0.10`

安装 VS Code 时，我勾选了这些选项：

- 将“通过 Code 打开”添加到文件上下文菜单
- 将 Code 注册为受支持文件类型的编辑器
- 添加到 PATH

之后只要执行一次 HiBit Uninstaller 的注册表扫描，右键菜单乱码就会出现。



## 三、排查过程


### 1. 先怀疑是 VS Code 自己写坏了注册表


一开始我参考了网上能搜到的旧教程，去检查类似下面这些路径：


```plain text
HKEY_CLASSES_ROOT\*\shell\VSCode
HKEY_CLASSES_ROOT\Directory\shell\VSCode
```


但在 Windows 11 这边，实际情况和 Windows 10 明显不一样，这套旧路径并不能直接解释问题。


### 2. 排除了用户名、账户类型等因素


我在虚拟机里反复做了对照测试，结论比较明确：

- 微软账户、本地账户都能复现
- 中文用户名、英文用户名都能复现
- 问题和用户名编码关系不大

所以这不是一个“用户名中文导致乱码”的老问题。


### 3. 发现“扫描即触发”


这里有个很关键的点：


**不是必须清理注册表，很多时候只要执行 HiBit Uninstaller 的注册表扫描，问题就会触发。**


这一点说明，问题不只是“删错了东西”，更可能和扫描过程中产生的某些注册表变化有关。


### 4. 普通重装 VS Code 无效


我后面发现：

- 直接卸载 VS Code 再重装，乱码通常还在
- 必须借助 HiBit 自己的注册表清理后再重装，才有概率恢复正常

这说明问题状态会残留在系统注册表里，不是单纯重装程序就能覆盖掉的。



## 四、目前比较靠谱的原因分析


结合社区讨论和自己的测试，我目前的判断是：


### 1. HiBit Uninstaller 扫描时会在 HKLM 下创建一批空注册表项


有用户通过对比扫描前后的注册表状态，发现 HiBit Uninstaller 会在：


```plain text
HKEY_LOCAL_MACHINE\SOFTWARE\Classes
```


下创建一批与


```plain text
HKEY_CURRENT_USER\Software\Classes
```


同名的空项副本。对于 VS Code 来说，`VSCodeContextMenu` 就是高频受影响对象之一。


### 2. VS Code 在 1.108.2 → 1.109.5 之间改了 Windows 11 右键菜单实现


社区讨论里提到一个很重要的版本变化：


在 **1.108.2 到 1.109.5** 之间，VS Code 的右键菜单注册路径发生了变化，目的应该是为了适配 **Windows 11 一级右键菜单**，不再依赖老式的“显示更多选项”。旧版更多使用 `HKEY_CLASSES_ROOT\*\shell\VSCode`、`HKEY_CLASSES_ROOT\Directory\shell\VSCode` 这些路径，而新版把部分配置放到了 `HKEY_CURRENT_USER\Software\Classes` 下面。


### 3. Windows 11 读取到了 HKLM 下的空项，覆盖了正常配置


结合上面两点，一个比较合理的推测是：

- VS Code 新版本把右键菜单配置改到了新的位置
- HiBit 扫描时又在 `HKLM\SOFTWARE\Classes` 下造出了同名空项
- Windows 11 在读取这类菜单项时，优先碰到了 HKLM 里的“空壳”
- 结果就是菜单文本异常，出现乱码

这个结论目前更偏向**推测**，但它和现有现象、修复方法、以及社区用户的实验结果是基本吻合的。



## 五、临时修复方法


### 方法 1：手动修复 `VSCodeContextMenu`


按 `Win + R`，输入 `regedit`，打开注册表编辑器，然后定位到：


```plain text
HKEY_LOCAL_MACHINE\SOFTWARE\Classes\VSCodeContextMenu
```


这里有两种可用做法：


### 方案 A：直接删除这一项


删掉后重启资源管理器或重启电脑，再测试右键菜单。


### 方案 B：手动补一个 Title 值


如果不想删，也可以直接在右侧新建：

- 类型：**可扩充字符串值**
- 名称：`Title`
- 数据：`通过 Code 打开`

![image.png](/images/notion/Vscode右箭乱码问题-d78552c2.png)


![image.png](/images/notion/Vscode右箭乱码问题-c1d8acb7.png)


这个方法在社区里已经有人验证可用，而且再次扫描后，至少 `VSCodeContextMenu` 这一项不一定会再次影响右键菜单显示。



## 六、自动清理方案


如果你不想每次手动进注册表，可以使用脚本自动清理。


这个脚本的思路比较克制，不是“看见 VS Code 就删”，而是只删除：

- 位于 `HKLM\SOFTWARE\Classes`
- 与 `HKCU\Software\Classes` 同名
- 且名称包含 `VSCode`
- 并且是**空项**的注册表键

这样风险会小很多，不会误删掉原本真正有效的菜单项。你后来改进的脚本还加入了：

- 自动提权
- 日志输出
- 只处理 VSCode 相关项
- 执行后提示重启资源管理器

整体思路是合理的，而且比“手工乱删”安全得多。



## 七、这个问题能不能根治？


### 目前看，脚本只能“修”，不能“根治”


因为只要再次使用 HiBit Uninstaller 的注册表扫描功能，这批空项还有可能再次生成，乱码也就会再次出现。这个结论在讨论里也被反复提到。


### 目前更现实的规避方案有两个


### 方案 1：回退到 VS Code 1.108.2 或更早版本


因为问题明显和 1.109.5 之后的新菜单实现有关，所以回退旧版并关闭自动更新，是一条相对稳的路。


### 方案 2：继续用新版本 VS Code，但停用 HiBit 的注册表扫描/清理


至少在目前还没彻底定位根因前，这是最省心的规避方式。社区里也有用户表示，暂时不再使用它的注册表清理程序，但卸载功能本身仍然可以正常用。



## 八、结论


这个问题大概率不是“VS Code 自己把菜单写乱码了”，而是以下几个因素叠加：

1. **HiBit Uninstaller** 扫描时在 `HKLM\SOFTWARE\Classes` 下创建了和 `HKCU` 同名的空项
2. **VS Code 新版本** 为了适配 Windows 11 一级右键菜单，改了菜单注册方式
3. **Windows 11** 在读取菜单配置时，优先碰到了 HKLM 下的空项，导致显示异常

所以目前最推荐的处理思路是：

- 先手动修复或删除 `VSCodeContextMenu`
- 再用脚本清理 `HKLM` 下与 VS Code 有关的空重复项
- 后续尽量避免再次使用 HiBit 的注册表扫描功能
- 如果特别在意稳定性，可以直接退回 VS Code 1.108.2


## 九、给后来人的一句话总结


**Windows 11 下 VS Code 右键菜单乱码，不一定是 VS Code 安装坏了，很可能是 HiBit Uninstaller 扫描后生成的空注册表项把新菜单配置顶掉了。**



## 原文链接


（也是我的CSDN账号）


[Windows 11 下 VS Code 右键菜单“通过 Code 打开”中文乱码：排查过程、原因分析与临时修复方案-CSDN博客](https://blog.csdn.net/qq_73688105/article/details/160262147?spm=1001.2014.3001.5502)