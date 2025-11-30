// js/data.js

// 默认数据 (种子数据)
export const defaultPosts = [
  {
    id: 1732920000005,
    title: "系统架构设计说明",
    date: "2025-11-30",
    tags: ["架构", "SPA"],
    cover: "",
    summary:
      "本项目是一个基于原生 JavaScript 构建的轻量级单页应用 (SPA)。本文档旨在阐述系统的核心架构设计与技术选型。",
    content: `
## 项目概述

本项目旨在构建一个无后端依赖的内容管理系统 (CMS)。为了深入理解 Web 标准与底层原理，项目摒弃了 React/Vue 等现代前端框架，完全采用原生 JavaScript (ES6+) 进行开发。

## 核心架构

系统采用 **MVC (Model-View-Controller)** 的设计思想进行分层：

1.  **数据层 (Model)**: 负责数据的持久化存储与读取，直接与 LocalStorage 交互。
2.  **视图层 (View)**: 负责 DOM 元素的动态生成与渲染，实现数据可视化。
3.  **控制层 (Controller)**: 负责业务逻辑处理、路由分发及用户交互事件的响应。

## 技术栈

-   **核心语言**: JavaScript (ES6 Modules)
-   **样式框架**: Tailwind CSS (Utility-First)
-   **数据存储**: HTML5 LocalStorage
-   **文本渲染**: Marked.js (Markdown 解析)
    `,
  },
  {
    id: 1732833600004,
    title: "客户端数据持久化方案",
    date: "2025-11-29",
    tags: ["数据存储", "LocalStorage"],
    summary:
      "分析在无后端环境下，如何利用浏览器本地存储实现数据的增删改查 (CRUD) 功能。",
    content: `
## 背景

由于项目运行环境的限制（无后端服务器），数据的持久化存储成为核心挑战。传统的静态 JSON 文件无法满足动态写入的需求。

## 解决方案

系统采用 HTML5 标准提供的 **LocalStorage** 接口作为本地数据库。

### 实现逻辑

1.  **序列化**: 利用 \`JSON.stringify()\` 将文章对象数组转换为字符串格式进行存储。
2.  **反序列化**: 读取时通过 \`JSON.parse()\` 还原为 JavaScript 对象。
3.  **图片处理**: 采用 Base64 编码技术，将图片文件转换为字符串形式一同存入 LocalStorage。

### 技术限制与应对

LocalStorage 存在约 5MB 的存储容量限制。为此，系统在图片上传模块增加了文件大小校验机制，建议仅存储 2MB 以下的图片文件，以保证系统的稳定性。
    `,
  },
  {
    id: 1732747200003,
    title: "原子化 CSS 与响应式设计",
    date: "2025-11-28",
    tags: ["UI设计", "Tailwind"],
    summary: "探讨 Utility-First CSS 方法论在快速构建响应式界面中的应用优势。",
    content: `
## 样式方案选型

项目引入 **Tailwind CSS** 作为核心样式库。与传统的语义化 CSS 相比，原子化 CSS (Atomic CSS) 具有以下优势：

1.  **开发效率**: 通过组合预定义的类名直接在 HTML 中构建界面，减少了在文件间切换的上下文开销。
2.  **一致性**: 强制使用标准化的间距、颜色与排版系统，确保了 UI 风格的高度统一。

## 深色模式 (Dark Mode) 实现

系统基于 Tailwind 的 \`dark:\` 变体实现了深色模式支持。

通过 JavaScript 检测系统偏好或用户手动切换，动态修改 HTML 根元素的 class 属性，从而触发相应的样式规则，实现了页面风格的实时切换。
    `,
  },
  {
    id: 1732660800002,
    title: "模块化开发与代码重构",
    date: "2025-11-27",
    tags: ["工程化", "ES Modules"],
    summary:
      "记录从单文件脚本向模块化工程演进的过程，体现关注点分离的设计原则。",
    content: `
## 早期问题

在项目初期，逻辑代码高度耦合于单一文件中，导致了以下问题：
-   全局变量污染风险高。
-   代码可读性差，维护成本随代码量线性增长。
-   功能模块间界限模糊。

## 模块化重构

引入 **ES Modules** 标准对代码进行了拆分与重构：

-   \`data.js\`: 封装数据操作接口。
-   \`render.js\`: 纯函数组件，负责 HTML 字符串拼接。
-   \`router.js\`: 处理路由导航状态。
-   \`utils.js\`: 包含通用工具函数。

通过 \`import\` / \`export\` 关键字管理依赖，显著提升了代码的可维护性与复用性。
    `,
  },
  {
    id: 1732574400001,
    title: "后续优化路线图 (Roadmap)",
    date: "2025-11-26",
    tags: ["规划"],
    summary: "针对当前版本存在的局限性，制定的功能扩展与性能优化计划。",
    content: `
## 已知局限性

1.  **存储性能**: Base64 图片存储方案占用了大量 LocalStorage 空间，且读写性能随数据量增加而下降。
2.  **编辑体验**: 当前仅支持基础 Markdown 语法，缺乏所见即所得 (WYSIWYG) 的交互体验。

## 优化计划

### 短期目标
-   引入 IndexedDB 以突破 5MB 的存储限制。
-   优化移动端布局，提升响应式体验。

### 长期规划
-   集成第三方对象存储服务 (OSS) 以解决图片托管问题。
-   引入 PWA (Progressive Web App) 技术，支持离线访问。
    `,
  },
];

// 获取所有文章
export function getAllPosts() {
  const localPosts = JSON.parse(localStorage.getItem("my_blog_posts") || "[]");
  // 合并本地数据和默认数据
  const allPosts = [...localPosts, ...defaultPosts];
  // 按照时间倒序排列（最新的在最前面）
  return allPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
}

// 保存文章
export function savePostToStorage(newPost) {
  const localPosts = JSON.parse(localStorage.getItem("my_blog_posts") || "[]");
  localPosts.unshift(newPost);
  localStorage.setItem("my_blog_posts", JSON.stringify(localPosts));
}

// 删除文章
export function deletePostFromStorage(id) {
  const localPosts = JSON.parse(localStorage.getItem("my_blog_posts") || "[]");
  const newPosts = localPosts.filter((post) => post.id !== id);

  // 检查是否是默认文章（默认文章不在 localPosts 里，所以无法从 storage 删除）
  if (localPosts.length === newPosts.length) {
    return false;
  }

  localStorage.setItem("my_blog_posts", JSON.stringify(newPosts));
  return true;
}
