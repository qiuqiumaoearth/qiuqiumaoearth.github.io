---
title: Claude Code 常用命令单
date: 2026-04-11T16:05:00.000Z
updated: 2026-04-12T14:36:00.000Z
---

# **Claude Code 常用命令单**


可以。你就把它当成一张 **“前端小白也能直接用的 Claude Code 常用命令单”**。


先记一个最重要的规则：

- **`claude ...`****、****`-model`****、****`-effort`** **这种**：是在 **终端里启动 Claude 时** 用的。
- **`/model`****、****`/plan`****、****`/diff`** **这种**：是你已经进入 `claude` 之后，在 **Claude 的聊天界面里** 输入的。官方也说明了：斜杠命令是“在会话内部控制 Claude Code”的命令，而 CLI flags 是“启动时的参数”。([Claude API Docs](https://docs.anthropic.com/en/docs/claude-code/cli-reference))


## 一、先把 Claude 打开，或者接着上次继续


### 1. `claude`

- **用途**：启动一个交互式会话。
- **大白话**：就是“打开 Claude Code，开始和它一起写代码/看项目”。
- **什么时候用**：你刚进项目，想开始干活。
- **例子**：

```bash
claude
```


官方把它定义成“启动交互式会话”的基础命令。([Claude API Docs](https://docs.anthropic.com/en/docs/claude-code/cli-reference))


### 2. `claude -p "你的问题"`

- **用途**：问一次就退出，不进入长期聊天。
- **大白话**：就是“你问一句，它答一句，答完结束”。
- **什么时候用**：你只是想临时解释一个报错、总结一个文件，不想开完整会话。
- **例子**：

```bash
claude -p "解释这个报错"
```


官方把 `-p` 定义为 print/非交互模式；也支持管道输入。([Claude API Docs](https://docs.anthropic.com/en/docs/claude-code/cli-reference))


### 3. `claude -c`

- **用途**：继续当前目录最近一次会话。
- **大白话**：就是“把这个项目上次聊到一半的内容接着聊”。
- **什么时候用**：昨天在这个仓库里做到一半，今天继续。
- **例子**：

```bash
claude -c
```


官方把 `-c` 定义为“加载当前目录最近一次会话”。([Claude API Docs](https://docs.anthropic.com/en/docs/claude-code/cli-reference))


### 4. `claude -r "会话名或ID"`

- **用途**：恢复指定的某次会话。
- **大白话**：就是“不是接最近一次，而是点名接某一条老聊天”。
- **什么时候用**：你有很多历史会话，想回到某个特定任务。
- **例子**：

```bash
claude -r "auth-refactor"
```


官方把 `-r/--resume` 定义为按会话名或 ID 恢复指定会话。([Claude API Docs](https://docs.anthropic.com/en/docs/claude-code/cli-reference))



## 二、控制它“用哪个脑子”和“想多深”


### 5. `-model`

- **用途**：启动时指定模型。
- **大白话**：就是“开局就指定让它用哪个型号来干活”。
- **什么时候用**：你想一开始就固定用 `sonnet` 或 `opus`。
- **例子**：

```bash
claude --model sonnet
```


官方说明 `--model` 可以用 `sonnet`、`opus` 这样的别名，也可以写完整模型名。([Claude API Docs](https://docs.anthropic.com/en/docs/claude-code/cli-reference))


### 6. `-effort`

- **用途**：启动时指定思考强度，支持 `low`、`medium`、`high`、`max`。
- **大白话**：就是“让它想得浅一点还是深一点”。一般越高越认真，但也可能更慢。
- **什么时候用**：任务比较难，想让它更认真分析。
- **例子**：

```bash
claude --effort high
```


官方把 `--effort` 定义为当前会话的 effort level；这是启动时设置的。([Claude API Docs](https://docs.anthropic.com/en/docs/claude-code/cli-reference))


### 7. `/model`

- **用途**：在会话里切换模型。
- **大白话**：就是“已经聊到一半了，再临时换个模型”。
- **什么时候用**：刚开始用轻一点的模型，后来发现任务变复杂。
- **例子**：

```plain text
/model
/model sonnet
```


官方说明 `/model [model]` 可以在会话中切换模型，而且立即生效。([Claude API Docs](https://docs.anthropic.com/en/docs/claude-code/commands))


### 8. `/effort`

- **用途**：在会话里调整思考强度。
- **大白话**：就是“聊到一半才发现这题有点难，把脑力调高”。
- **什么时候用**：复杂重构、排查诡异 bug、理解陌生代码。
- **例子**：

```plain text
/effort high
```


官方说明 `/effort` 支持 `low|medium|high|max|auto`，而且会立即生效。([Claude API Docs](https://docs.anthropic.com/en/docs/claude-code/commands))



## 三、先让它“只看方案”，别一上来乱改


### 9. `-permission-mode plan`

- **用途**：启动时进入 plan mode。
- **大白话**：就是“先让它看代码、想方案、列步骤，不要上来就改文件”。
- **什么时候用**：你是小白，怕它直接改乱；或者先想听方案。
- **例子**：

```bash
claude --permission-mode plan
```


官方把 `plan` 列为 permission mode 之一，用于以指定权限模式开始会话。([Claude API Docs](https://docs.anthropic.com/en/docs/claude-code/cli-reference))


### 10. `/plan`

- **用途**：在当前会话里直接进入 plan mode。
- **大白话**：就是“我已经进 Claude 了，现在切到先出方案模式”。
- **什么时候用**：已经开了会话，但现在不想让它直接动手。
- **例子**：

```plain text
/plan 帮我分析登录模块怎么重构
```


官方说明 `/plan [description]` 会直接进入 plan mode，还可以顺手把任务一起给它。([Claude API Docs](https://docs.anthropic.com/en/docs/claude-code/commands))


### 11. `/permissions`

- **用途**：管理 allow / ask / deny 权限规则。
- **大白话**：就是“控制它哪些操作可以直接干，哪些操作必须先问你”。
- **什么时候用**：你想更稳一点，不想它随便执行命令或改文件。
- **例子**：

```plain text
/permissions
```


官方说明 `/permissions` 会打开权限管理界面，让你管理规则和最近的自动拒绝记录。([Claude API Docs](https://docs.anthropic.com/en/docs/claude-code/commands))



## 四、让它看到更多目录，或者把工作隔离开


### 12. `-add-dir`

- **用途**：额外加入可读写目录。
- **大白话**：就是“除了当前项目，再把旁边几个目录也给它看”。
- **什么时候用**：前端项目依赖另一个共享组件库、工具目录、配置目录。
- **例子**：

```bash
claude --add-dir ../shared ../lib
```


官方说明 `--add-dir` 会给 Claude 增加额外 working directories，让它能读写那些目录。([Claude API Docs](https://docs.anthropic.com/en/docs/claude-code/cli-reference))


### 13. `-worktree`

- **用途**：在独立的 git worktree 里启动 Claude。
- **大白话**：就是“给它开一个单独副本去干活，不碰你当前这份工作区”。
- **什么时候用**：你想并行做功能、怕当前目录被改乱、想更安全地试验。
- **例子**：

```bash
claude -w feature-auth
```


官方说明 `--worktree/-w` 会在 `<repo>/.claude/worktrees/<name>` 里开一个隔离的 git worktree。([Claude API Docs](https://docs.anthropic.com/en/docs/claude-code/cli-reference))


### 14. `-tools`

- **用途**：限制 Claude 允许使用哪些内建工具。
- **大白话**：就是“只给它几把工具，别让它啥都能用”。
- **什么时候用**：你想更保守，比如只允许读文件、改文件、跑 bash。
- **例子**：

```bash
claude --tools "Bash,Edit,Read"
```


官方说明 `--tools` 是“限制 Claude 能用哪些 built-in tools”；可以用 `""` 全禁，用 `"default"` 全开，或指定如 `"Bash,Edit,Read"`。([Claude API Docs](https://docs.anthropic.com/en/docs/claude-code/cli-reference))



## 五、不会了先看帮助和状态


### 15. `/help`

- **用途**：显示帮助和可用命令。
- **大白话**：就是“菜单在哪、能干啥，先看这个”。
- **什么时候用**：你忘了命令、想找功能、刚开始学习。
- **例子**：

```plain text
/help
```


官方说明 `/help` 用来显示帮助和可用命令，而且输入 `/` 也能看到当前环境里你能用的命令。([Claude API Docs](https://docs.anthropic.com/en/docs/claude-code/commands))


### 16. `/status`

- **用途**：看版本、模型、账号、连接状态。
- **大白话**：就是“看看现在 Claude Code 处于什么状态”。
- **什么时候用**：你怀疑没登录、模型不对、连接有问题。
- **例子**：

```plain text
/status
```


官方说明 `/status` 会打开状态页，显示版本、模型、账号和连接状态。([Claude API Docs](https://docs.anthropic.com/en/docs/claude-code/commands))



## 六、看它到底改了什么，花了多少


### 17. `/diff`

- **用途**：打开交互式 diff 查看器。
- **大白话**：就是“看看它到底动了哪些文件、改了哪些代码”。
- **什么时候用**：它改完一波后，你想检查结果。
- **例子**：

```plain text
/diff
```


官方说明 `/diff` 会显示未提交改动和每轮 Claude 的 diff，还能在文件之间切换。([Claude API Docs](https://docs.anthropic.com/en/docs/claude-code/commands))


### 18. `/cost`

- **用途**：查看 token 使用统计。
- **大白话**：就是“看看这次大概用了多少额度”。
- **什么时候用**：你怕花太多，或者只是想知道消耗。
- **例子**：

```plain text
/cost
```


官方命令表把 `/cost` 定义为显示 token 使用统计。([Claude API Docs](https://docs.anthropic.com/en/docs/claude-code/commands))


### 19. `/clear`

- **用途**：清空当前对话历史。
- **大白话**：就是“重新开聊，但不用退出 Claude”。
- **什么时候用**：现在这段聊天已经很乱，想从头开始。
- **例子**：

```plain text
/clear
```


官方说明 `/clear` 会清空 conversation history，别名还有 `/reset` 和 `/new`。([Claude API Docs](https://docs.anthropic.com/en/docs/claude-code/commands))



## 七、让它反复帮你盯着某件事


### 20. `/loop`

- **用途**：重复运行一个 prompt，只要会话开着就持续跑。
- **大白话**：就是“每隔几分钟帮我再看一眼这件事”。
- **什么时候用**：盯部署、盯日志、盯 CI、盯某个服务有没有恢复。
- **例子**：

```plain text
/loop 5m check if the deploy finished
```


官方说明 `/loop [interval] [prompt]` 会重复运行一个 prompt；不写 interval 时 Claude 会自己决定节奏，不写 prompt 时会跑自主维护检查或 `.claude/loop.md` 里的提示。([Claude API Docs](https://docs.anthropic.com/en/docs/claude-code/commands))



## 你作为前端小白，最建议先学的顺序


先只学这 8 个就够了：


```bash
claude
claude -c
claude -p "解释这个报错"
claude --permission-mode plan
```


```plain text
/help
/plan
/diff
/model
```


这 8 个已经够你完成这些事：


**打开 Claude、继续上次工作、临时问一句、先只看方案、不会就看帮助、检查改动、切模型。** 这些都在官方 CLI 和命令文档里有定义。([Claude API Docs](https://docs.anthropic.com/en/docs/claude-code/cli-reference))


## 给你一个最简单的实际工作流


你是前端小白时，最稳的用法可以是：

1. 进项目后先运行：

```bash
claude --permission-mode plan
```

1. 进会话后说：

```plain text
/plan 帮我看这个 React 登录页为什么状态管理这么乱
```

1. 想让它真的开始改时，再继续跟它说具体要求。
2. 改完后立刻看：

```plain text
/diff
```

1. 如果聊乱了：

```plain text
/clear
```

1. 明天继续这个项目：

```bash
claude -c
```


这套流程本质上就是：**先方案，后动手；动手后先看 diff；第二天用** **`-c`** **接着干。** 它对应的命令和行为都来自官方文档。([Claude API Docs](https://docs.anthropic.com/en/docs/claude-code/cli-reference))


你要的话，我下一条可以继续给你做一个 **“前端小白专用 Claude Code 入门剧本”**，比如“改一个按钮样式”“修一个接口报错”“重构一个组件”这三种场景该怎么跟 Claude 说。