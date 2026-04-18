---
title: 最强 VSCode 配置与插件推荐
date: 2026-04-18T16:40:00.000Z
updated: 2026-04-18T16:46:00.000Z
---

# 提升开发效率：最强 VSCode 配置与插件推荐


作为全栈开发工程师，合理配置 VSCode 编辑器对于提升工作效率至关重要。本文将为你介绍一套高效的 VSCode 配置，以及适合全栈开发和 Markdown 编写的插件列表，帮助你提高编码和写作效率。


## 📍 一、VSCode 配置（`settings.json`）


### 基本配置


以下是为全栈开发和 Markdown 编写量身定制的 `settings.json` 配置。你只需将其复制到 VSCode 的设置文件中（在 **文件** -> **首选项** -> **设置** 中找到 `settings.json`）。


```json
{
    "claudeCode.preferredLocation": "panel",  // 设置 ClaudeCode 插件偏好显示位置为面板
    "git.autofetch": true,  // 启用 Git 自动拉取功能，确保本地仓库与远程仓库同步
    "gitlens.ai.model": "gitkraken",  // 设置 GitLens 的 AI 模型为 GitKraken
    "gitlens.ai.gitkraken.model": "gemini:gemini-2.5-flash",  // 设置 GitKraken 使用 Gemini 模型
    "workbench.secondarySideBar.defaultVisibility": "hidden",  // 默认隐藏二级侧边栏

    "editor.formatOnSave": true,  // 保存时自动格式化代码，保持代码整洁
    "editor.tabSize": 2,  // 设置每个 tab 为 2 个空格
    "editor.wordWrap": "on",  // 启用自动换行功能，适合编写长文本文件
    "editor.minimap.enabled": true,  // 启用代码小地图，便于快速跳转
    "editor.renderWhitespace": "boundary",  // 显示空白符号，如空格和制表符，帮助调试
    "editor.rulers": [80],  // 设置代码行最大长度为 80 个字符，提醒开发者保持代码行长度合理
    "files.autoSave": "onWindowChange",  // 当窗口切换时自动保存文件，减少丢失未保存数据的风险
    "files.trimTrailingWhitespace": true,  // 保存时自动删除文件末尾的空格，保持代码整洁
    "files.insertFinalNewline": true,  // 保存时自动在文件末尾插入换行符，符合许多编程语言的最佳实践

    "eslint.enable": true,  // 启用 ESLint 进行代码静态检查
    "eslint.validate": ["javascript", "javascriptreact", "vue", "typescript", "typescriptreact"],  // 配置 ESLint 校验的文件类型

    "prettier.requireConfig": true,  // 强制要求有 Prettier 配置文件，否则无法格式化代码
    "prettier.disableLanguages": ["vue"],  // 禁用 Prettier 对 Vue 文件的格式化，因为有时 Vue 文件需要自定义格式化规则

    "markdown.preview.scrollPreviewWithEditor": true,  // 启用编辑器和预览的滚动同步，方便实时查看 Markdown 预览效果
    "markdown.preview.breaks": true,  // 启用 Markdown 自动换行，使得文本能够适应屏幕宽度
    "markdown.preview.showMath": true,  // 启用数学公式渲染，适用于包含数学公式的文档
    "markdown.extension.toc.insertToc": true,  // 启用自动插入目录，方便大篇幅 Markdown 文件的导航
    "markdown.extension.toc.updateOnSave": true,  // 每次保存时自动更新目录，确保目录内容始终与文档一致

    "git.confirmSync": false,  // 禁用 Git 同步前的确认弹窗，直接同步
    "workbench.colorTheme": "One Dark Pro",  // 设置开发环境的主题为 One Dark Pro，提供舒适的编码体验
    "workbench.iconTheme": "vscode-icons",  // 设置文件图标主题为 vscode-icons，使文件浏览更具可视性

    "gitlens.advanced.gitCommands": true,  // 启用 GitLens 中的高级 Git 命令功能
    "gitlens.advanced.fileHistory": true,  // 启用 GitLens 中的文件历史功能，可以查看文件的修改历史
    "gitlens.keymap": "none",  // 禁用 GitLens 的默认快捷键，以防与其他插件冲突
    "gitlens.showQuickCommit": "default",  // 设置 GitLens 显示快速提交按钮为默认
    "markdownlint.enabled": true,  // 启用 Markdown 语法检查，确保文件符合标准

    "terminal.integrated.shell.windows": "C:\\Windows\\System32\\cmd.exe",  // 设置 Windows 下使用 CMD 作为集成终端
    "terminal.integrated.fontSize": 14  // 设置终端字体大小为 14，确保字体适中，便于阅读
}
```


### 配置说明：

- **代码格式化与规范**：启用了 `prettier` 和 `eslint`，确保代码自动格式化并符合规范。
- **Markdown 支持**：增强了数学公式、表格、图表等渲染功能，适合文档写作与编写论文。
- **Git 集成**：自动拉取更新，简化团队协作。
- **UI 与主题**：选用了 `One Dark Pro` 主题和 `vscode-icons` 文件图标，增强了界面的美观性和易用性。


## 📍 二、必备插件推荐


根据全栈开发与 Markdown 使用需求，以下是你必装的插件列表：


### 🔥 核心插件

1. **GitLens**
    - 功能：可视化 Git 提交历史，查看每一行代码的修改者、提交记录等。适用于团队协作和代码历史追溯。
2. **Prettier - Code formatter**
    - 功能：自动格式化代码，确保代码的一致性，支持多种语言（如 JavaScript、TypeScript、HTML、CSS 等）。
3. **ESLint**
    - 功能：进行代码静态检查，帮助保持代码规范。支持 JavaScript、React、Vue 和 TypeScript。
4. **Thunder Client**
    - 功能：类似 Postman 的 API 测试工具，集成在 VSCode 中，轻松进行 API 请求和测试。
5. **Path Intellisense**
    - 功能：为文件路径提供智能补全，避免路径错误。
6. **Auto Rename Tag**
    - 功能：当修改 HTML/XML/JSX 标签名时，自动同步修改配对标签，避免手动修改重复工作。


### 🧾 Markdown 相关插件

1. **Markdown All in One**
    - 功能：集合了多种 Markdown 功能，包括目录生成、快速跳转、语法高亮等。
2. **Markdown Preview Enhanced**
    - 功能：支持高级渲染，如数学公式、图表、PDF 导出等，完美提升写作体验。
3. **Markdownlint**
    - 功能：对 Markdown 文件进行语法检查，确保格式统一，符合规范。
4. **Paste Image**
    - 功能：支持直接粘贴图片到 Markdown 文件中，方便文档插图。
5. **Markdown Preview Mermaid Support**
    - 功能：支持渲染 Mermaid 图表，适合画流程图、序列图等。


### 🌱 开发工具插件

1. **ES7+ React/Redux Snippets**
    - 功能：快速生成 React 和 Redux 代码片段，提升开发效率。
2. **Vue (Official)**
    - 功能：专为 Vue 3 开发的插件，支持类型检查、代码补全等。
3. **Docker**
    - 功能：集成 Docker 工具，帮助构建和管理容器化应用。
4. **SQLTools**
    - 功能：数据库查询工具，支持 MySQL、PostgreSQL、SQLite 等数据库。


### 🚀 AI 增强插件

1. **GitHub Copilot**
    - 功能：AI 代码补全插件，能够根据上下文自动生成代码，提高编程效率。
2. **Tabnine**
    - 功能：另一款 AI 代码补全插件，支持多种语言，增强编程体验。


## 📍 三、开发体验提升插件


### 1️⃣ UI 与视觉优化

- **vscode-icons**

    为文件添加图标，增强文件类型识别，帮助更好地浏览项目结构。

- **One Dark Pro / Material Theme**

    高颜值主题，适合长时间编程使用，提升视觉体验。


### 2️⃣ 效率提升插件

- **Todo Tree**

    高亮显示 TODO/FIXME 标签，帮助你轻松追踪待办事项。

- **WakaTime**

    自动记录编码时间，统计工作效率，帮助优化开发时间。



## 📍 四、推荐配置组合


如果你不想浪费时间挑选插件，以下是我为你准备的“最强组合”：


### 💻 全栈开发组合

- **GitLens**
- **Prettier** + **ESLint**
- **Thunder Client**
- **Path Intellisense**
- **Auto Rename Tag**

### 🧾 Markdown写作组合

- **Markdown All in One**
- **Markdown Preview Enhanced**
- **Markdownlint**
- **Paste Image**

### 🤖 AI增强

- **GitHub Copilot**（主力）
- **Tabnine**（备选）


## 🎯 最后总结


VSCode 的强大之处不仅在于其本身的功能，还在于它的插件生态。通过合理的插件选择和配置，你可以将 VSCode 打造成一个集编码、文档编写、API 测试、AI 编程辅助于一体的超级开发环境。


最重要的是，**插件并不是越多越好**，而是要**“少而精 + 有体系”**，合理的配置能极大提升你的开发效率和舒适度。


希望这篇文章能帮助你更好地配置 VSCode，提高工作效率。如果你有任何问题或建议，欢迎在评论区留言讨论！



### 你还可以参考：

- [VSCode 官方文档](https://code.visualstudio.com/docs)
- [Prettier 插件文档](https://prettier.io/docs/en/)