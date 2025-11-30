// js/app.js

// 导入模块
import {
  getAllPosts,
  savePostToStorage,
  deletePostFromStorage,
} from "./data.js";
import { renderList, renderPost } from "./render.js";
import { navigateTo } from "./router.js";
import {
  toggleTheme,
  exportData,
  importData,
  handleImageUpload,
} from "./utils.js";

// 保存文章
function savePost() {
  const title = document.getElementById("post-title").value;
  const tagsStr = document.getElementById("post-tags").value;
  const date = document.getElementById("post-date").value;
  const summary = document.getElementById("post-summary").value;
  const content = document.getElementById("post-content").value;
  const coverImage = document.getElementById("post-cover-base64").value;

  if (!title || !content) {
    alert("标题和内容不能为空！");
    return;
  }

  const newPost = {
    id: Date.now(),
    title,
    date,
    summary,
    content,
    cover: coverImage,
    tags: tagsStr
      .split(/[,，]/)
      .map((t) => t.trim())
      .filter(Boolean),
  };

  savePostToStorage(newPost);
  alert("发布成功！");
  navigateTo("home");
}

// 删除文章
function deletePost(id, event) {
  event.stopPropagation();
  if (!confirm("确定要删除？(不可撤销)")) return;

  const ok = deletePostFromStorage(id);
  if (!ok) {
    alert("内置示例文章不允许删除。");
    return;
  }

  alert("删除成功！");
  navigateTo("home");
}

// 搜索文章
function handleSearch(e) {
  const keyword = e.target.value.toLowerCase().trim();
  const posts = getAllPosts();

  if (!keyword) {
    navigateTo("home");
    return;
  }

  const filtered = posts.filter(
    (p) =>
      p.title.toLowerCase().includes(keyword) ||
      p.summary.toLowerCase().includes(keyword)
  );

  // 显示搜索状态
  document.getElementById("filter-status").classList.remove("hidden");
  document.getElementById(
    "filter-text"
  ).innerText = `搜索 "${keyword}" - ${filtered.length} 篇`;
  renderList(filtered);
}

// 根据标签筛选
function filterByTag(tag) {
  const posts = getAllPosts();
  const filtered = posts.filter((p) => p.tags.includes(tag));

  // 显示筛选状态
  document.getElementById("filter-status").classList.remove("hidden");
  document.getElementById(
    "filter-text"
  ).innerText = `标签 "#${tag}" - ${filtered.length} 篇`;
  renderList(filtered);
}

// 挂载全局函数
window.navigateTo = navigateTo;
window.toggleTheme = toggleTheme;
window.savePost = savePost;
window.deletePost = deletePost;
window.handleSearch = handleSearch;
window.filterByTag = filterByTag;
window.exportData = exportData;
window.importData = importData;
window.handleImageUpload = handleImageUpload;
window.renderPost = renderPost;

// 页面加载后初始化
document.addEventListener("DOMContentLoaded", () => {
  // 主题初始化
  const saved = localStorage.getItem("theme");
  const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  if (saved === "dark" || (!saved && systemDark)) {
    document.documentElement.classList.add("dark");
    const icon = document.getElementById("theme-icon");
    if (icon) icon.classList.replace("fa-moon", "fa-sun");
  }

  // 默认跳转首页
  navigateTo("home");
});
