
---

# 无后端轻量级博客系统 (Serverless Blog)

## 💻 本地运行指南

> 注意：由于项目使用了 **ES Modules (`import/export`)** 特性，必须通过本地服务器运行，**不能直接双击 `index.html`**。

**前提条件：**

- 安装 Node.js 和 Git

### 方式一：使用 VS Code Live Server（推荐）

1. 在 VS Code 中安装 **Live Server** 扩展
2. 打开项目文件夹
3. 右键点击 `index.html` → 选择 **Open with Live Server**
4. 项目将在 `http://127.0.0.1:5500` 等地址运行

### 方式二：使用 Node.js HTTP-Server（通用）

1. **安装服务器**：全局安装轻量级静态服务器

   ```bash
   npm install -g http-server
   ```

2. **启动服务**：在项目根目录下执行

   ```bash
   http-server
   ```

3. **访问项目**：浏览器打开命令行显示的地址（通常是 `http://127.0.0.1:8080`）

---

## 项目简介

本项目是 Web 开发课程的期末大作业，旨在 **不依赖任何后端数据库或现代框架（如 React/Vue）** 的前提下，实现一个功能完整的 **单页内容管理系统 (CMS)**。
系统核心聚焦于 **原生 JavaScript (ES6+) 的应用、客户端数据持久化和前端模块化设计**。

---

## 核心特性

- **单页应用 (SPA)**：页面切换无刷新，通过 History API 模拟路由
- **客户端数据持久化**：文章数据存储于浏览器 LocalStorage，支持增删改查 (CRUD)
- **内容管理**：支持 Markdown 格式撰写文章，并集成 Marked.js 实时渲染
- **搜索与筛选**：

  - 支持关键词搜索文章标题和摘要
  - 支持标签云 (Tag Cloud) 筛选功能

- **主题切换**：支持深色模式 (Dark Mode) 和浅色模式切换
- **数据安全**：提供 JSON 格式文章数据备份 (Export) 与恢复 (Import)

---

## 技术栈 (Tech Stack)

| 模块         | 技术                      | 备注                                      |
| :----------- | :------------------------ | :---------------------------------------- |
| **核心语言** | Vanilla JavaScript (ES6+) | 采用 ES Modules 规范进行模块化管理        |
| **样式框架** | Tailwind CSS              | Utility-First CSS，用于快速构建响应式界面 |
| **数据存储** | HTML5 LocalStorage        | 模拟后端数据库，实现数据持久化            |
| **内容渲染** | Marked.js                 | Markdown 解析器                           |
| **代码高亮** | Highlight.js              | 美化文章中的代码块                        |

---

## 架构设计

项目遵循 **关注点分离 (Separation of Concerns)** 原则，代码结构参考简化的 **MVC (Model-View-Controller)** 模式：

1. **Model (`data.js`)**：负责 LocalStorage 的读写、文章序列化与反序列化
2. **View (`render.js`)**：负责根据数据生成和更新 DOM 元素（HTML 字符串）
3. **Controller (`app.js`, `router.js`)**：负责业务逻辑、事件监听和路由控制

---

## 📝 许可证 (License)

本项目遵循 **MIT 许可证**

---


