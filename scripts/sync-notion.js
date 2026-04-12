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

    // 移除 Markdown 分割线（避免与主题自带分割线重复）
    let markdown = mdString.parent.replace(/^---\s*$/gm, '').trim()

    // 生成 frontmatter（文章头部信息）
    const frontmatter = `---
title: ${title}
date: ${createdTime}
updated: ${updatedTime}
---

`

    const content = frontmatter + markdown

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
