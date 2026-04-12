---
title: Notion 同步到博客方案设计
date: 2026-04-12T13:32:00.000Z
updated: 2026-04-12T14:34:00.000Z
---

# Notion 同步到博客方案设计


💡 **适合人群**：会一些 Python 和前端的小白  
⏱️ **总耗时**：约 35 分钟  
🎯 **最终效果**：在 Notion 勾选框 → 博客自动更新



## 📚 第一部分：理解整个流程（5分钟阅读）


### 🤔 你现在的问题是什么？

- ✍️ 在 Notion 写笔记很舒服（格式好看、功能强大）
- 😫 但想让笔记显示在博客上很麻烦（要复制粘贴、转格式）
- 🔄 每次更新文章都要重复操作

### 💡 解决方案是什么？


**用大白话说**：

1. 在 Notion 数据库里加个"是否展示"的勾选框
2. 勾选后，GitHub 会自动帮你把 Notion 内容转成 Markdown
3. 然后自动放到你的博客里

**就像**：


```plain text
你在 Notion 勾个框
    ↓
机器人自动搬运（GitHub Actions）
    ↓
博客自动更新
```


### 🔄 自动化是怎么工作的？


```plain text
【每天凌晨 2 点】
    ↓
GitHub 自动醒来："该干活了！"
    ↓
GitHub 问 Notion："哪些文章勾选了'是否展示'？"
    ↓
Notion 回答："这 5 篇勾选了"
    ↓
GitHub 把这 5 篇转成 Markdown 格式
    ↓
GitHub 自动提交到你的博客仓库
    ↓
博客自动部署，用户看到新文章 🎉
```


### 📋 需求分析


**目标**：将 Notion 笔记自动同步到 VitePress 博客


**核心需求**：

1. 在 Notion 中添加"是否展示"属性（Checkbox）
2. 勾选后自动同步到博客
3. 保持 Notion 的编辑体验
4. 博客自动更新


## 🎯 方案选择


### 方案对比


| 方案                                   | 优点      | 缺点   | 推荐度   |
| ------------------------------------ | ------- | ---- | ----- |
| **方案 A：Notion API + GitHub Actions** | 全自动化，免费 | 需要配置 | ⭐⭐⭐⭐⭐ |
| 方案 B：手动导出                            | 简单      | 太麻烦  | ⭐⭐☆☆☆ |
| 方案 C：第三方工具（如 Notion2MD）              | 开箱即用    | 可能收费 | ⭐⭐⭐☆☆ |


**推荐方案 A**：使用 Notion API + GitHub Actions 实现自动同步



## 🏗️ 方案 A：自动化同步架构


### 架构图


```plain text
Notion 数据库
    ↓
Notion API（读取勾选的文章）
    ↓
转换脚本（Notion → Markdown）
    ↓
GitHub Actions（定时执行）
    ↓
提交到 Git 仓库
    ↓
自动部署到博客
```



## 📝 实施步骤


### 第一步：配置 Notion 数据库


### 1.1 创建 Notion 数据库


在 Notion 中创建一个数据库，包含以下属性：


| 属性名      | 类型               | 说明              |
| -------- | ---------------- | --------------- |
| **标题**   | Title            | 文章标题            |
| **是否展示** | Checkbox         | ✅ 勾选后同步到博客      |
| **分类**   | Select           | 文章分类（前端/后端/算法等） |
| **标签**   | Multi-select     | 文章标签            |
| **创建时间** | Created time     | 自动生成            |
| **更新时间** | Last edited time | 自动生成            |
| **状态**   | Select           | 草稿/已发布          |


![bdf2fe13-c4db-471b-a6a4-3f1094081814.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/8170a486-c3e7-811a-9ea1-00037f488e6b/73b18f8e-3219-4733-b7d2-9915e346f4f1/bdf2fe13-c4db-471b-a6a4-3f1094081814.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XHLWQZLM%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T145859Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIBg3QJbBuzzP83gzV0fTnisejCDHRumVTpz83Wc6cQ%2FaAiEArGKMcj4t5%2B3vcCxGqBg9G%2FuoYFWA7yYXgj9ryRjAUS8q%2FwMIYBAAGgw2Mzc0MjMxODM4MDUiDKyAjJsou5ipFdP9NSrcA9hI9neFaP5UA8ieUoWEFsjDSlZkHT51Lyv0jtNzWad35dZ1cPrRcl4D0twxoSuDXy1El5XIib43SwayHbYoiEfvllaU3AGZVLdzLTIRE0np2nVqMZyecREuOS9MBdyU1oJ4ikezvW4aWb5OETSJCEdjQc3Wj2OD%2B%2F%2B8T2ADURFsebBFwed3bx2Oh8SU0KGO3Njd6QIujezivclg2mel1SYcHeunyXIjsx%2FR%2FxtLZDx8V9qrhH3Q4jqaH9Tp9%2BI%2FOtQwO4fCsPruGalA%2FEQ0yqRMmghqaZOzjoMn4AS%2F83gRWqMf3AFJ8hwvoSETZ7%2BF8Y0OkqLoQH%2FbzIHjjTeRdBzCSSXo4wkLigRyBtcIBoZXV2%2BF0elj1o1aIg4OIxKnjLbA8gDraQtxVK0HOygGp%2BdfdwbWn%2Bi%2BTZUPxZCoi82xx1w9fJuo2%2F1BOmDM%2BhpMVjyhgQ%2FaJtUSiwufnh8SSiKp7xh3DDrw%2FRlJbfCtw9vTz3GpavkDJIxdopoLm%2BdQNTJD1qQHzHzn39fAS%2BZfpc19h%2F3xABZ99W5nz%2BTeWNWMrzjoVKNC19IuH33GJT8dQ7ieMf9UcAXF2ieVfxinotDy4%2FuJo3GHQwD%2FtdnEFni%2FnzXn0rNfh3mUNYg6MMjX7s4GOqUBpozZn%2F6Wt746P4iI4k57ENOzZkBaDBat9UTy7enDQW%2FhIdXy4%2F0%2Fwf9Gs0RFp9FeEJERLtGvf0yPOpRhTpQHo3BJ7cNKQJDQzbpXFzWyCc0MhKMrFODk19K%2FQWnMH2k6AfaIGkez8r6MsvKF596TGxrVI4ivESUahhzhGwj7Cb34QsMEQCNkJ6cE8K3HOPHcfef9o%2F1o7A2MTiHf6r4zd7tz3CU8&X-Amz-Signature=c973a6abb2cb6e7bf55f8600f5a001a6603e977d413357adfd306177ad8e7f01&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


### 1.2 获取 Notion 集成密钥

1. 访问 [https://www.notion.so/my-integrations](https://www.notion.so/my-integrations)
2. 点击"New integration"
3. 填写信息：
    - Name: `博客同步`
    - Associated workspace: 选择你的工作区
    - Capabilities: 勾选 `Read content`
4. 点击"Submit"，复制 `Internal Integration Token`

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/8170a486-c3e7-811a-9ea1-00037f488e6b/ccaf6679-1833-4e88-8b38-e1e35045cdef/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SDCJWC5D%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T145905Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCraQoQS14Y75l8OqS2sjPZIzgmpg5B1I2TU0YjYCJ6SgIgQG2XJOp5vxxbHOHOPANdnu09IH4fM8yUUlkTWE65vVwq%2FwMIXRAAGgw2Mzc0MjMxODM4MDUiDLgej8QChUcXlu17ZSrcA03FJgyesjdfT9D5bHyihxpegWY%2BgMuPrGzRb2deDuGuI5u10bOyZ7IH%2Fs2jqKoEJFcRWEGGgKDaYwelw5pY%2FxXkhrATyoLnnCF%2FlDvsc%2F0AYCHGFAQSVimSLncYRNqksjI9vW4siqgYCpQ%2BwqZ%2BrjwnQsNE%2Bzs53HrUljCrswvIgdMiYRGqJxHojjm5DxN7jZckM%2BIqC4O7%2F2Xn7VC8NbMxyvDBTu6y5x2GfmZA1I%2BPSHdK5Au2i1fpEbiTCllgerUN127ufIYOvVMBH82%2Fm0X3TcMDIzz0C5wS3TDhJPIX8NnEyYnyIHI135Uug2rkMEGl%2FQ37WIcKj1aBhFlfKTsufp2sI4TSvr9CwclyyVwJVmwvoaL%2F2tRW0qGtBScrjB%2B8CgG6YYDWACb9RWx2owS9dAgW7DqK9UBqAfBSUvQ0sNoLi%2FvLg7rxPzFbmA%2FbLDABmFGvFJ5DNRYu%2FiN7QBQg9gXZ8VNwJqyfa4okZZ1mJjTnAgJf%2FXian7SpYDKQWeDCyfxXHWAfgTRSx0lP3WOufQBr56j9BmZJ0sQ5%2FrXGTQSD4sSyKoG3WXbaO1mBVye0R3uRn2OGK7EXYi3IO5p3xvqusdpyqxXWVkBLu8AqskJW1OHKEVV1QS0xMNiW7s4GOqUBl3grEh%2FWvTLiKNwZEjIEq8aKDfGBFD6oPaSOPoEqimu%2FrifstwiP3zMtGwN7Kf%2BZcSFworyA7qihC6qP9hkWxgNa06FiyCChIeZHGk6w%2F8tK9zoumdN83ndDOGtR%2BqAcEiiL%2BBd7JNJfCiqgOabePIbFX4Qwv8zxwKIqvG8uz4RbRdgu4t1lc7W6KxAJjvBdqo8Og6yrkry7LwldWCLef%2BEu%2FSCW&X-Amz-Signature=a1912952138ce690742fab232766e581a5295bf27ee5ab8f9f3578ccdcb30c52&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/8170a486-c3e7-811a-9ea1-00037f488e6b/d7de203c-d798-4df0-a320-b3902646c18f/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663X4UORT2%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T145905Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQC7s%2BCSpFWJkyLXE7msdtyxDpZbByudZo9iEPSH%2FD7hrQIhAPLpZZTVoGVpZEPSnsPJlH%2B0xJaebUiYuaedFove2jIlKv8DCF0QABoMNjM3NDIzMTgzODA1IgyxbjT4S8jBW%2FZXA90q3AOcEKS2xQMZqmGsTIYnT247FVd%2Bl8lC5xRuDNS0NxV5gVXa5qx31vWtz%2FF7dPEAI3lSxkZDid876zU3jXvl4mroVzBDucIDqCjISIsAW%2FWhZz7ZzrIbClGOR0YXnIcPFDymMKieTl6LK%2F7sMA2unBg8DjYMGKrwv1ZNh6YkldI%2B1qglbxNahmxX3z8WdKOxivxG3YEVVW0ruHa5AAxh585YhUX4dS%2B4buQeHZ4wF51SayJztJ7QLrg8AW8ykbS12bDCTVNWVpbgNDP52%2BS9geQYXm4aPn9on7LbQkadbkXKP4kloloobwpm0AhZ2HVI0XQZglC0RC9DzCN0FvfYHC0xlhQgTSgUsQjMhukeDLXi0rl7N0Ggx7uVak8Gf3xXJKoH%2BpcKVTbmLbfO83kH91aiqkfe%2B3QqB%2BEJJh3F88EQtHwKstaNMCH8FBQ97qiDPzyaP6IsuqKsA4WxsIoi8RBs%2F%2FOF793sW%2Bdm3aeTNFWmMDJ05Wz1wIDCKn2qxGt6%2B3S5RKELJ6KqIazoCgR9C5BonW%2FPLJY%2BDPjjys5JcWsBhBxLSJVvQi45QbO15dUk3IhXz68AWoEkvtaTmCPejiRMfgcDjaTRx347XpAGtkLY48pahGZz4OfPpm4MbjDeku7OBjqkAf%2BDHCGy%2BRyaAlvPIsjceVJvp0QeRovkagJLxAmerQ%2BMJ%2FqzuzKCpl7mJMhOX3indpt7fPKKBT2%2BzbDY1BS1OtaWHChUKihrVHaYiEOyaYzHxzCWOYnkagV%2Fo6ybEkkdiCAZ8tS2iOhSx%2FOYas3woghyRsJcCh2DB%2FEDP9zBGkaGf%2FRzCANyFJBgNn54LIXJHX1QlbtpLgkW3X5QXBZ%2FY0m%2BSvzM&X-Amz-Signature=b9f80266f04d6638f5d9bad2c435624d34465bacd65e3e4c3b3c383a123a8512&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


### 1.3 连接数据库到集成

1. 打开你的 Notion 数据库页面
2. 点击右上角 `...` → `Connections` → `Connect to`
3. 选择刚创建的"博客同步"集成
4. 复制数据库 URL 中的 Database ID
    - 格式：`https://notion.so/xxxxx?v=yyyyy\`
    - Database ID 就是 `xxxxx` 部分

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/8170a486-c3e7-811a-9ea1-00037f488e6b/10b248ff-3644-4d34-aee6-e874c520ef0d/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XHLWQZLM%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T145859Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIBg3QJbBuzzP83gzV0fTnisejCDHRumVTpz83Wc6cQ%2FaAiEArGKMcj4t5%2B3vcCxGqBg9G%2FuoYFWA7yYXgj9ryRjAUS8q%2FwMIYBAAGgw2Mzc0MjMxODM4MDUiDKyAjJsou5ipFdP9NSrcA9hI9neFaP5UA8ieUoWEFsjDSlZkHT51Lyv0jtNzWad35dZ1cPrRcl4D0twxoSuDXy1El5XIib43SwayHbYoiEfvllaU3AGZVLdzLTIRE0np2nVqMZyecREuOS9MBdyU1oJ4ikezvW4aWb5OETSJCEdjQc3Wj2OD%2B%2F%2B8T2ADURFsebBFwed3bx2Oh8SU0KGO3Njd6QIujezivclg2mel1SYcHeunyXIjsx%2FR%2FxtLZDx8V9qrhH3Q4jqaH9Tp9%2BI%2FOtQwO4fCsPruGalA%2FEQ0yqRMmghqaZOzjoMn4AS%2F83gRWqMf3AFJ8hwvoSETZ7%2BF8Y0OkqLoQH%2FbzIHjjTeRdBzCSSXo4wkLigRyBtcIBoZXV2%2BF0elj1o1aIg4OIxKnjLbA8gDraQtxVK0HOygGp%2BdfdwbWn%2Bi%2BTZUPxZCoi82xx1w9fJuo2%2F1BOmDM%2BhpMVjyhgQ%2FaJtUSiwufnh8SSiKp7xh3DDrw%2FRlJbfCtw9vTz3GpavkDJIxdopoLm%2BdQNTJD1qQHzHzn39fAS%2BZfpc19h%2F3xABZ99W5nz%2BTeWNWMrzjoVKNC19IuH33GJT8dQ7ieMf9UcAXF2ieVfxinotDy4%2FuJo3GHQwD%2FtdnEFni%2FnzXn0rNfh3mUNYg6MMjX7s4GOqUBpozZn%2F6Wt746P4iI4k57ENOzZkBaDBat9UTy7enDQW%2FhIdXy4%2F0%2Fwf9Gs0RFp9FeEJERLtGvf0yPOpRhTpQHo3BJ7cNKQJDQzbpXFzWyCc0MhKMrFODk19K%2FQWnMH2k6AfaIGkez8r6MsvKF596TGxrVI4ivESUahhzhGwj7Cb34QsMEQCNkJ6cE8K3HOPHcfef9o%2F1o7A2MTiHf6r4zd7tz3CU8&X-Amz-Signature=f708ea841803fcf70599a6a6858c90fbb2415d6188bebc5a82a61287572c3de1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![Database ID=7c70a486-c3e7-826e-a2e7-87c7e164facb](https://prod-files-secure.s3.us-west-2.amazonaws.com/8170a486-c3e7-811a-9ea1-00037f488e6b/bcf036d7-f725-4795-b090-917b814cf6b5/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XHLWQZLM%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T145859Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIBg3QJbBuzzP83gzV0fTnisejCDHRumVTpz83Wc6cQ%2FaAiEArGKMcj4t5%2B3vcCxGqBg9G%2FuoYFWA7yYXgj9ryRjAUS8q%2FwMIYBAAGgw2Mzc0MjMxODM4MDUiDKyAjJsou5ipFdP9NSrcA9hI9neFaP5UA8ieUoWEFsjDSlZkHT51Lyv0jtNzWad35dZ1cPrRcl4D0twxoSuDXy1El5XIib43SwayHbYoiEfvllaU3AGZVLdzLTIRE0np2nVqMZyecREuOS9MBdyU1oJ4ikezvW4aWb5OETSJCEdjQc3Wj2OD%2B%2F%2B8T2ADURFsebBFwed3bx2Oh8SU0KGO3Njd6QIujezivclg2mel1SYcHeunyXIjsx%2FR%2FxtLZDx8V9qrhH3Q4jqaH9Tp9%2BI%2FOtQwO4fCsPruGalA%2FEQ0yqRMmghqaZOzjoMn4AS%2F83gRWqMf3AFJ8hwvoSETZ7%2BF8Y0OkqLoQH%2FbzIHjjTeRdBzCSSXo4wkLigRyBtcIBoZXV2%2BF0elj1o1aIg4OIxKnjLbA8gDraQtxVK0HOygGp%2BdfdwbWn%2Bi%2BTZUPxZCoi82xx1w9fJuo2%2F1BOmDM%2BhpMVjyhgQ%2FaJtUSiwufnh8SSiKp7xh3DDrw%2FRlJbfCtw9vTz3GpavkDJIxdopoLm%2BdQNTJD1qQHzHzn39fAS%2BZfpc19h%2F3xABZ99W5nz%2BTeWNWMrzjoVKNC19IuH33GJT8dQ7ieMf9UcAXF2ieVfxinotDy4%2FuJo3GHQwD%2FtdnEFni%2FnzXn0rNfh3mUNYg6MMjX7s4GOqUBpozZn%2F6Wt746P4iI4k57ENOzZkBaDBat9UTy7enDQW%2FhIdXy4%2F0%2Fwf9Gs0RFp9FeEJERLtGvf0yPOpRhTpQHo3BJ7cNKQJDQzbpXFzWyCc0MhKMrFODk19K%2FQWnMH2k6AfaIGkez8r6MsvKF596TGxrVI4ivESUahhzhGwj7Cb34QsMEQCNkJ6cE8K3HOPHcfef9o%2F1o7A2MTiHf6r4zd7tz3CU8&X-Amz-Signature=6932fdf7ff1ba7c0db202b876207e7eaf87ff71ced299e6ce24a776f0e7c7931&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![NOTION_TOKEN](https://prod-files-secure.s3.us-west-2.amazonaws.com/8170a486-c3e7-811a-9ea1-00037f488e6b/c05a0458-8985-4759-befb-b7cb1aed521a/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XHLWQZLM%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T145859Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIBg3QJbBuzzP83gzV0fTnisejCDHRumVTpz83Wc6cQ%2FaAiEArGKMcj4t5%2B3vcCxGqBg9G%2FuoYFWA7yYXgj9ryRjAUS8q%2FwMIYBAAGgw2Mzc0MjMxODM4MDUiDKyAjJsou5ipFdP9NSrcA9hI9neFaP5UA8ieUoWEFsjDSlZkHT51Lyv0jtNzWad35dZ1cPrRcl4D0twxoSuDXy1El5XIib43SwayHbYoiEfvllaU3AGZVLdzLTIRE0np2nVqMZyecREuOS9MBdyU1oJ4ikezvW4aWb5OETSJCEdjQc3Wj2OD%2B%2F%2B8T2ADURFsebBFwed3bx2Oh8SU0KGO3Njd6QIujezivclg2mel1SYcHeunyXIjsx%2FR%2FxtLZDx8V9qrhH3Q4jqaH9Tp9%2BI%2FOtQwO4fCsPruGalA%2FEQ0yqRMmghqaZOzjoMn4AS%2F83gRWqMf3AFJ8hwvoSETZ7%2BF8Y0OkqLoQH%2FbzIHjjTeRdBzCSSXo4wkLigRyBtcIBoZXV2%2BF0elj1o1aIg4OIxKnjLbA8gDraQtxVK0HOygGp%2BdfdwbWn%2Bi%2BTZUPxZCoi82xx1w9fJuo2%2F1BOmDM%2BhpMVjyhgQ%2FaJtUSiwufnh8SSiKp7xh3DDrw%2FRlJbfCtw9vTz3GpavkDJIxdopoLm%2BdQNTJD1qQHzHzn39fAS%2BZfpc19h%2F3xABZ99W5nz%2BTeWNWMrzjoVKNC19IuH33GJT8dQ7ieMf9UcAXF2ieVfxinotDy4%2FuJo3GHQwD%2FtdnEFni%2FnzXn0rNfh3mUNYg6MMjX7s4GOqUBpozZn%2F6Wt746P4iI4k57ENOzZkBaDBat9UTy7enDQW%2FhIdXy4%2F0%2Fwf9Gs0RFp9FeEJERLtGvf0yPOpRhTpQHo3BJ7cNKQJDQzbpXFzWyCc0MhKMrFODk19K%2FQWnMH2k6AfaIGkez8r6MsvKF596TGxrVI4ivESUahhzhGwj7Cb34QsMEQCNkJ6cE8K3HOPHcfef9o%2F1o7A2MTiHf6r4zd7tz3CU8&X-Amz-Signature=f98b6eac78d43920b742771cb29e17805f5adec09697780ac6049307102c88fe&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



第二步：创建同步脚本


### 2.1 安装依赖


```powershell
cd D:\xuexi\qiuqiumao.blog

npm install @notionhq/client notion-to-md dotenv

# 淘宝镜像
npm install --registry=https://registry.npmmirror.com @notionhq/client notion-to-md dotenv
```


### 2.2 创建同步脚本


创建 `scripts/sync-notion.js`：


```javascript
require('dotenv').config()
const { Client } = require('@notionhq/client')
const { NotionToMarkdown } = require('notion-to-md')
const fs = require('fs')
const path = require('path')

// 初始化 Notion 客户端
const notion = new Client({
  auth: process.env.NOTION_TOKEN
})

const n2m = new NotionToMarkdown({ notionClient: notion })

const DATABASE_ID = process.env.NOTION_DATABASE_ID

// 主函数
async function syncNotionToMarkdown() {
  console.log('🚀 开始同步 Notion 笔记...')

  try {
    // 1. 查询数据库，筛选"展示"为 true 的文章
    const response = await notion.dataSources.query({
      data_source_id: DATABASE_ID,
      filter: {
        property: '展示',
        checkbox: {
          equals: true
        }
      },
      sorts: [
        {
          property: '最后编辑',
          direction: 'descending'
        }
      ]
    })

    console.log(`📚 找到 ${response.results.length} 篇需要同步的文章`)

    // 2. 遍历每篇文章
    for (const page of response.results) {
      await syncPage(page)
    }

    console.log('✅ 同步完成！')
  } catch (error) {
    console.error('❌ 同步失败:', error.message)
    process.exit(1)
  }
}

// 同步单篇文章
async function syncPage(page) {
  const pageId = page.id

  // 获取文章属性
  const titleObj = page.properties['名称']?.title[0]?.plain_text?.trim()

  // 跳过没有标题的文章
  if (!titleObj) {
    console.log('⚠️  跳过：文章标题为空')
    return
  }

  const title = titleObj
  const createdTime = page.properties['创建时间']?.created_time
  const updatedTime = page.properties['最后编辑']?.last_edited_time

  console.log(`📝 同步文章: ${title}`)

  try {
    // 转换为 Markdown
    const mdblocks = await n2m.pageToMarkdown(pageId)
    const mdString = n2m.toMarkdownString(mdblocks)

    // 生成 frontmatter（文章头部信息）
    const frontmatter = `---
title: ${title}
date: ${createdTime}
updated: ${updatedTime}

`

    const content = frontmatter + mdString.parent

    // 保存到文件
    const fileName = `${title.replace(/[\/\\:*?"<>|]/g, '-')}.md`
    const filePath = path.join(__dirname, '../Article/note', fileName)

    fs.writeFileSync(filePath, content, 'utf-8')
    console.log(`✅ 已保存: ${fileName}`)
  } catch (error) {
    console.error(`❌ 同步文章 "${title}" 失败:`, error.message)
  }
}

// 执行同步
syncNotionToMarkdown()
```


### 2.3 创建环境变量文件


创建 `.env`（不要提交到 Git）：


```plain text
NOTION_TOKEN=your_notion_integration_token
NOTION_DATABASE_ID=your_database_id
```


![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/8170a486-c3e7-811a-9ea1-00037f488e6b/0f2fd162-e8d1-445e-90f2-12b89d891cba/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XHLWQZLM%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T145859Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIBg3QJbBuzzP83gzV0fTnisejCDHRumVTpz83Wc6cQ%2FaAiEArGKMcj4t5%2B3vcCxGqBg9G%2FuoYFWA7yYXgj9ryRjAUS8q%2FwMIYBAAGgw2Mzc0MjMxODM4MDUiDKyAjJsou5ipFdP9NSrcA9hI9neFaP5UA8ieUoWEFsjDSlZkHT51Lyv0jtNzWad35dZ1cPrRcl4D0twxoSuDXy1El5XIib43SwayHbYoiEfvllaU3AGZVLdzLTIRE0np2nVqMZyecREuOS9MBdyU1oJ4ikezvW4aWb5OETSJCEdjQc3Wj2OD%2B%2F%2B8T2ADURFsebBFwed3bx2Oh8SU0KGO3Njd6QIujezivclg2mel1SYcHeunyXIjsx%2FR%2FxtLZDx8V9qrhH3Q4jqaH9Tp9%2BI%2FOtQwO4fCsPruGalA%2FEQ0yqRMmghqaZOzjoMn4AS%2F83gRWqMf3AFJ8hwvoSETZ7%2BF8Y0OkqLoQH%2FbzIHjjTeRdBzCSSXo4wkLigRyBtcIBoZXV2%2BF0elj1o1aIg4OIxKnjLbA8gDraQtxVK0HOygGp%2BdfdwbWn%2Bi%2BTZUPxZCoi82xx1w9fJuo2%2F1BOmDM%2BhpMVjyhgQ%2FaJtUSiwufnh8SSiKp7xh3DDrw%2FRlJbfCtw9vTz3GpavkDJIxdopoLm%2BdQNTJD1qQHzHzn39fAS%2BZfpc19h%2F3xABZ99W5nz%2BTeWNWMrzjoVKNC19IuH33GJT8dQ7ieMf9UcAXF2ieVfxinotDy4%2FuJo3GHQwD%2FtdnEFni%2FnzXn0rNfh3mUNYg6MMjX7s4GOqUBpozZn%2F6Wt746P4iI4k57ENOzZkBaDBat9UTy7enDQW%2FhIdXy4%2F0%2Fwf9Gs0RFp9FeEJERLtGvf0yPOpRhTpQHo3BJ7cNKQJDQzbpXFzWyCc0MhKMrFODk19K%2FQWnMH2k6AfaIGkez8r6MsvKF596TGxrVI4ivESUahhzhGwj7Cb34QsMEQCNkJ6cE8K3HOPHcfef9o%2F1o7A2MTiHf6r4zd7tz3CU8&X-Amz-Signature=de4de23f1088c4a46eddc76a2a2cf7f25aef8e2c3e39d154ffdec3fca670bc7e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/8170a486-c3e7-811a-9ea1-00037f488e6b/58466407-8bac-464e-b28c-ecf2b5fb28a9/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XHLWQZLM%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T145859Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIBg3QJbBuzzP83gzV0fTnisejCDHRumVTpz83Wc6cQ%2FaAiEArGKMcj4t5%2B3vcCxGqBg9G%2FuoYFWA7yYXgj9ryRjAUS8q%2FwMIYBAAGgw2Mzc0MjMxODM4MDUiDKyAjJsou5ipFdP9NSrcA9hI9neFaP5UA8ieUoWEFsjDSlZkHT51Lyv0jtNzWad35dZ1cPrRcl4D0twxoSuDXy1El5XIib43SwayHbYoiEfvllaU3AGZVLdzLTIRE0np2nVqMZyecREuOS9MBdyU1oJ4ikezvW4aWb5OETSJCEdjQc3Wj2OD%2B%2F%2B8T2ADURFsebBFwed3bx2Oh8SU0KGO3Njd6QIujezivclg2mel1SYcHeunyXIjsx%2FR%2FxtLZDx8V9qrhH3Q4jqaH9Tp9%2BI%2FOtQwO4fCsPruGalA%2FEQ0yqRMmghqaZOzjoMn4AS%2F83gRWqMf3AFJ8hwvoSETZ7%2BF8Y0OkqLoQH%2FbzIHjjTeRdBzCSSXo4wkLigRyBtcIBoZXV2%2BF0elj1o1aIg4OIxKnjLbA8gDraQtxVK0HOygGp%2BdfdwbWn%2Bi%2BTZUPxZCoi82xx1w9fJuo2%2F1BOmDM%2BhpMVjyhgQ%2FaJtUSiwufnh8SSiKp7xh3DDrw%2FRlJbfCtw9vTz3GpavkDJIxdopoLm%2BdQNTJD1qQHzHzn39fAS%2BZfpc19h%2F3xABZ99W5nz%2BTeWNWMrzjoVKNC19IuH33GJT8dQ7ieMf9UcAXF2ieVfxinotDy4%2FuJo3GHQwD%2FtdnEFni%2FnzXn0rNfh3mUNYg6MMjX7s4GOqUBpozZn%2F6Wt746P4iI4k57ENOzZkBaDBat9UTy7enDQW%2FhIdXy4%2F0%2Fwf9Gs0RFp9FeEJERLtGvf0yPOpRhTpQHo3BJ7cNKQJDQzbpXFzWyCc0MhKMrFODk19K%2FQWnMH2k6AfaIGkez8r6MsvKF596TGxrVI4ivESUahhzhGwj7Cb34QsMEQCNkJ6cE8K3HOPHcfef9o%2F1o7A2MTiHf6r4zd7tz3CU8&X-Amz-Signature=6ba2a6b61e5f3d3ef37b5a3844223308d51578d615384dd62f6d6f99caf5596c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### 第三步：配置 GitHub Actions


### 3.1 添加 GitHub Secrets


在 GitHub 仓库中：

1. 进入 `Settings` → `Secrets and variables` → `Actions`
2. 点击 `New repository secret`
3. 添加两个 secret：
    - `NOTION_TOKEN`: 你的 Notion 集成密钥
    - `NOTION_DATABASE_ID`: 你的数据库 ID

### 3.2 创建 GitHub Actions 工作流


创建 `.github/workflows/sync-notion.yml`：


```plain text
name: Sync Notion to Blog

on:
  # 每天凌晨 2 点自动执行
  schedule:
    - cron: '0 18 * * *'  # UTC 18:00 = 北京时间 02:00

  # 手动触发
  workflow_dispatch:

  # 推送到 main 分支时触发（可选）
  push:
    branches:
      - main
    paths:
      - 'scripts/sync-notion.js'

jobs:
  sync:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout 代码
        uses: actions/checkout@v3

      - name: 设置 Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: 安装依赖
        run: npm install

      - name: 同步 Notion 笔记
        env:
          NOTION_TOKEN: ${{ secrets.NOTION_TOKEN }}
          NOTION_DATABASE_ID: ${{ secrets.NOTION_DATABASE_ID }}
        run: node scripts/sync-notion.js

      - name: 提交更改
        run: |
          git config --local user.email "github-actions[bot]@users.noreply.github.com"
          git config --local user.name "github-actions[bot]"
          git add Article/note/*.md
          git diff --quiet && git diff --staged --quiet || (git commit -m "🔄 自动同步 Notion 笔记 $(date +'%Y-%m-%d %H:%M:%S')" && git push)
```



### 第四步：测试同步


### 4.1 本地测试


```plain text
# 安装依赖
npm install @notionhq/client notion-to-md dotenv

# 创建 .env 文件并填入密钥

# 运行同步脚本
node scripts/sync-notion.js
```


### 4.2 检查结果


查看 `Article/note/` 目录，应该能看到从 Notion 同步的 Markdown 文件。


### 4.3 GitHub Actions 测试

1. 提交代码到 GitHub
2. 进入 `Actions` 标签页
3. 点击 `Sync Notion to Blog` 工作流
4. 点击 `Run workflow` 手动触发
5. 查看执行日志


## 🎨 优化建议


### 1. 图片处理


Notion 中的图片需要特殊处理：


```plain text
// 在 sync-notion.js 中添加图片下载功能
async function downloadImage(url, fileName) {
  const response = await fetch(url)
  const buffer = await response.buffer()
  const imagePath = path.join(__dirname, '../Article/public/images', fileName)
  fs.writeFileSync(imagePath, buffer)
  return `/images/${fileName}`
}
```


### 2. 增量同步


只同步更新的文章：


```plain text
// 记录上次同步时间
const lastSyncTime = fs.existsSync('.last-sync')
  ? fs.readFileSync('.last-sync', 'utf-8')
  : new Date(0).toISOString()

// 查询时添加时间过滤
filter: {
  and: [
    {
      property: '是否展示',
      checkbox: { equals: true }
    },
    {
      property: '更新时间',
      last_edited_time: { after: lastSyncTime }
    }
  ]
}

// 同步完成后更新时间
fs.writeFileSync('.last-sync', new Date().toISOString())
```


### 3. 删除处理


处理取消勾选的文章：


```plain text
// 查询所有文章（包括未勾选的）
const allPages = await notion.databases.query({
  database_id: DATABASE_ID
})

// 找出需要删除的文章
const publishedPages = allPages.results.filter(
  p => p.properties['是否展示']?.checkbox === true
)

const publishedTitles = publishedPages.map(
  p => p.properties['标题']?.title[0]?.plain_text
)

// 删除本地不在发布列表中的文件
const localFiles = fs.readdirSync('Article/note')
localFiles.forEach(file => {
  const title = file.replace('.md', '')
  if (!publishedTitles.includes(title)) {
    fs.unlinkSync(path.join('Article/note', file))
    console.log(`🗑️ 删除文章: ${file}`)
  }
})
```


### 4. 添加同步状态通知


使用 GitHub Actions 发送通知：


```plain text
- name: 发送通知（可选）
  if: success()
  run: |
    echo "✅ Notion 同步成功！"
    # 可以集成 Telegram/钉钉/企业微信通知
```



## 📊 使用流程


### 日常使用

1. **在 Notion 中写笔记**
    - 正常在 Notion 中编辑文章
    - 使用 Notion 的所有功能（表格、代码块、图片等）
2. **发布到博客**
    - 勾选"是否展示"复选框
    - 等待自动同步（每天凌晨 2 点）
    - 或手动触发 GitHub Actions
3. **取消发布**
    - 取消勾选"是否展示"
    - 下次同步时自动删除
4. **更新文章**
    - 直接在 Notion 中编辑
    - 自动同步最新内容


## 🔧 故障排查


### 问题 1：同步失败


**检查清单**：

- [ ] Notion Token 是否正确
- [ ] Database ID 是否正确
- [ ] 数据库是否连接到集成
- [ ] GitHub Secrets 是否配置正确

### 问题 2：图片无法显示


**解决方案**：

- Notion 图片链接有时效性，需要下载到本地
- 使用上面的图片下载功能

### 问题 3：格式转换问题


**解决方案**：

- 某些 Notion 特殊块可能转换不完美
- 可以使用 `notion-to-md` 的自定义转换器


## 💡 进阶功能


### 1. 多数据库支持


```plain text
const DATABASES = [
  { id: 'xxx', folder: 'note' },
  { id: 'yyy', folder: 'blog' }
]

for (const db of DATABASES) {
  await syncDatabase(db.id, db.folder)
}
```


### 2. 自动生成目录


```plain text
// 根据分类自动创建子目录
const categoryFolder = path.join('Article/note', category)
if (!fs.existsSync(categoryFolder)) {
  fs.mkdirSync(categoryFolder, { recursive: true })
}
```


### 3. SEO 优化


```plain text
// 在 frontmatter 中添加 SEO 信息
const frontmatter = `---
title: ${title}
description: ${excerpt}
keywords: ${tags.join(', ')}
date: ${createdTime}

`
```



## 📋 完整文件清单


需要创建的文件：


```plain text
qiuqiumao.blog/
├── scripts/
│   └── sync-notion.js          # 同步脚本
├── .github/
│   └── workflows/
│       └── sync-notion.yml     # GitHub Actions 配置
├── .env                        # 环境变量（不提交）
├── .gitignore                  # 添加 .env
└── package.json                # 添加依赖
```



## ✅ 实施检查清单

- [ ] 创建 Notion 数据库并配置属性
- [ ] 获取 Notion 集成密钥
- [ ] 连接数据库到集成
- [ ] 安装 npm 依赖
- [ ] 创建同步脚本
- [ ] 本地测试同步
- [ ] 配置 GitHub Secrets
- [ ] 创建 GitHub Actions 工作流
- [ ] 测试自动同步
- [ ] 优化图片处理
- [ ] 添加增量同步
- [ ] 测试删除功能


## 🎯 预期效果


完成后，你的工作流将是：

1. 📝 在 Notion 中写笔记（舒适的编辑体验）
2. ✅ 勾选"是否展示"（一键发布）
3. ⏰ 等待自动同步（每天凌晨 2 点）
4. 🌐 博客自动更新（无需手动操作）
5. 🔄 修改 Notion 内容自动同步到博客


**需要我帮你实施这个方案吗？我可以：**

1. 创建同步脚本
2. 配置 GitHub Actions
3. 测试整个流程