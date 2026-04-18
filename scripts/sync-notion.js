// 运行命令
// cd D:\xuexi\qiuqiumao.blog\scripts
// node sync-notion.js

const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '../.env') })
const { Client } = require('@notionhq/client')
const { NotionToMarkdown } = require('notion-to-md')
const fs = require('fs')
const https = require('https')
const http = require('http')
const crypto = require('crypto')

// 初始化 Notion 客户端
const notion = new Client({
  auth: process.env.NOTION_TOKEN
})

const n2m = new NotionToMarkdown({ notionClient: notion })

const DATABASE_ID = process.env.NOTION_DATABASE_ID

// 下载图片到本地
async function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http
    const file = fs.createWriteStream(filepath)

    protocol
      .get(url, (response) => {
        if (response.statusCode !== 200) {
          reject(new Error(`Failed to download: ${response.statusCode}`))
          return
        }
        response.pipe(file)
        file.on('finish', () => {
          file.close()
          resolve()
        })
      })
      .on('error', (err) => {
        fs.unlink(filepath, () => {})
        reject(err)
      })
  })
}

// 处理 Markdown 中的图片
async function processImages(markdown, articleTitle) {
  const imageRegex = /!\[([^\]]*)\]\(([^)]+)\)/g
  let match
  let processedMarkdown = markdown
  const matches = []

  // 收集所有图片
  while ((match = imageRegex.exec(markdown)) !== null) {
    matches.push(match)
  }

  // 处理每张图片
  let imageIndex = 0
  for (const match of matches) {
    const [fullMatch, alt, imageUrl] = match

    // 只处理 Notion 图片（包含 notion 或 amazonaws）
    if (imageUrl.includes('notion') || imageUrl.includes('amazonaws')) {
      try {
        // 使用文章标题+图片索引生成稳定的文件名
        const hash = crypto.createHash('md5').update(`${articleTitle}-${imageIndex}`).digest('hex').substring(0, 8)
        const ext = imageUrl.split('.').pop().split('?')[0] || 'png'
        imageIndex++
        const filename = `${articleTitle.replace(/[\/\\:*?"<>|]/g, '-')}-${hash}.${ext}`
        const imagePath = path.join(__dirname, '../Article/public/images/notion', filename)

        // 如果图片已存在，跳过下载
        if (!fs.existsSync(imagePath)) {
          console.log(`  📥 下载图片: ${filename}`)
          await downloadImage(imageUrl, imagePath)
        } else {
          console.log(`  ✓ 图片已存在: ${filename}`)
        }

        // 替换为本地路径
        const localUrl = `/images/notion/${filename}`
        processedMarkdown = processedMarkdown.replace(fullMatch, `![${alt}](${localUrl})`)
      } catch (error) {
        console.error(`  ⚠️  图片下载失败: ${imageUrl}`, error.message)
        // 下载失败时保留原 URL
      }
    }
  }

  return processedMarkdown
}

// 主函数
async function syncNotionToMarkdown() {
  console.log('🚀 开始同步 Notion 笔记...')

  try {
    // 1. 查询数据库，筛选"展示"为 true 的文章
    const response = await notion.databases.query({
      database_id: DATABASE_ID,
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

    // 处理图片：下载并替换为本地路径
    markdown = await processImages(markdown, title)

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
