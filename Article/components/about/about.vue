<script setup>
  const goBack = () => {
    window.history.back()
  }
</script>

<template>
  <div class="about-container">
    <div class="top">
      <button @click="goBack">← 返回</button>
    </div>

    <div class="about-header">
      <div class="avatar-wrapper">
        <img src="../../public/logo.png" alt="我的头像" class="profile-pic" />
        <div class="avatar-glow"></div>
      </div>
      <h1>你好，我是 Q qiuqiuqiumao</h1>
      <br />
      <p>前端实习生 | 热衷于 Web 开发与 AI 技术</p>
    </div>

    <div class="about-content">
      <h2>🎯 我的学习路线</h2>
      <ol>
        <li>
          <strong>HTML & CSS 基础</strong>
          ：掌握网页布局、Flex/Grid、响应式设计。
        </li>
        <li>
          <strong>JavaScript 核心</strong>
          ：深入理解变量作用域、闭包、事件机制和异步编程。
        </li>
        <li>
          <strong>Vue 3 & Pinia</strong>
          ：组合式 API、组件化开发、状态管理。
        </li>
        <li>
          <strong>前端构建工具</strong>
          ：Vite、Webpack、模块化开发、代码优化。
        </li>
        <li>
          <strong>项目实战</strong>
          ：独立完成 Web + AI 项目，用于实习展示。
        </li>
      </ol>

      <h2>💡 技能亮点</h2>
      <ul>
        <li>熟悉 Vue3 + Composition API + Pinia</li>
        <li>掌握 VitePress 文档系统与 Markdown 美化</li>
        <li>了解 Node.js 后端基础与接口交互</li>
        <li>热衷于 AI 前端交互与数据可视化</li>
      </ul>

      <h2>🚀 项目展示</h2>
      <div class="projects">
        <div class="project-card">
          <h3>移动端智慧管理系统</h3>
          <p>
            基于 Vue2 + Node.js
            实现的移动端智慧管理系统，支持用户登录、数据可视化。
          </p>
          <a href="https://hm-shopping-rho.vercel.app/#/home" target="_blank">
            访问项目
          </a>
        </div>
        <div class="project-card">
          <h3>个人任务管理器</h3>
          <p>
            使用 Vue3 + Pinia 实现的前端任务管理应用，可展示每日任务与进度。
          </p>
          <a href="https://your-task-app.vercel.app" target="_blank">
            访问项目
          </a>
        </div>
      </div>

      <h2>📫 联系我</h2>
      <p>
        邮箱:
        <a href="mailto:your-email@example.com">your-email@example.com</a>
        GitHub:
        <a href="https://github.com/qiuqiuqiumao" target="_blank">
          qiuqiuqiumao
        </a>
      </p>
    </div>
  </div>
</template>

<style scoped>
  /* 顶部返回按钮 */
  .top {
    display: flex;
    justify-content: flex-start;
    margin-bottom: 25px;
  }
  .top button {
    background: linear-gradient(135deg, #4f46e5, #7c3aed);
    border: none;
    color: #fff;
    font-weight: bold;
    padding: 6px 14px;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
  .top button:hover {
    background: linear-gradient(135deg, #7c3aed, #4f46e5);
    transform: translateY(-2px);
  }

  /* 容器 */
  .about-container {
    max-width: 950px;
    margin: 40px auto;
    padding: 35px;
    background: #fdfdff;
    border-radius: 20px;
    box-shadow: 0 12px 36px rgba(0, 0, 0, 0.12);
    font-family: 'Segoe UI', 'Helvetica Neue', sans-serif;
    color: #333;
    line-height: 1.7;
  }

  /* 头像 & header */
  .about-header {
    text-align: center;
    margin-bottom: 50px;
    position: relative;
  }
  .avatar-wrapper {
    position: relative;
    display: inline-block;
  }
  .avatar-glow {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 140px;
    height: 140px;
    border-radius: 50%;
    background: radial-gradient(
      circle,
      rgba(79, 70, 229, 0.3) 0%,
      rgba(124, 58, 237, 0) 70%
    );
    z-index: -1;
  }
  .profile-pic {
    width: 130px;
    height: 130px;
    border-radius: 50%;
    object-fit: cover;
    border: 4px solid #4f46e5;
    transition:
      transform 0.3s,
      box-shadow 0.3s;
  }
  .profile-pic:hover {
    transform: scale(1.08);
    box-shadow: 0 0 25px rgba(79, 70, 229, 0.5);
  }
  .about-header h1 {
    font-size: 2.3rem;
    color: #4f46e5;
    margin-top: 15px;
  }
  .about-header p {
    font-size: 1rem;
    color: #666;
  }

  /* 标题样式 */
  .about-content h2 {
    font-size: 1.6rem;
    color: #4f46e5;
    margin-top: 30px;
    margin-bottom: 15px;
    border-bottom: 3px solid #e0e0ff;
    padding-bottom: 6px;
  }

  /* 列表 */
  .about-content ol,
  .about-content ul {
    margin-left: 25px;
  }
  .about-content li {
    margin-bottom: 14px;
    font-size: 1.05rem;
  }

  /* 链接 */
  .about-content a {
    color: #7c3aed;
    text-decoration: none;
  }
  .about-content a:hover {
    text-decoration: underline;
  }

  /* 项目卡片 */
  .projects {
    display: flex;
    flex-wrap: wrap;
    gap: 22px;
    margin-top: 18px;
  }
  .project-card {
    flex: 1 1 300px;
    background: linear-gradient(135deg, #f9f9ff, #f5f5ff);
    border-radius: 14px;
    padding: 20px;
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
    transition:
      transform 0.35s,
      box-shadow 0.35s;
  }
  .project-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 28px rgba(0, 0, 0, 0.15);
  }
  .project-card h3 {
    margin-top: 0;
    color: #4f46e5;
    font-size: 1.2rem;
  }
  .project-card p {
    font-size: 0.95rem;
    color: #555;
    margin: 8px 0;
  }
  .project-card a {
    display: inline-block;
    margin-top: 10px;
    font-weight: bold;
  }
</style>
