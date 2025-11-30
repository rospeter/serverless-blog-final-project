// js/router.js
import { getAllPosts } from "./data.js";
import {
  renderHome,
  renderArchive,
  renderWritePage,
  renderAbout,
} from "./render.js";
import { updateStats } from "./utils.js";

// 页面导航
export function navigateTo(page) {
  // 顶部导航高亮
  document.querySelectorAll(".nav-link").forEach((btn) => {
    btn.classList.remove("text-blue-600", "font-bold", "dark:text-blue-400");
    btn.classList.add("text-gray-500", "dark:text-gray-400");
  });
  const activeBtn = document.getElementById(`nav-${page}`);
  if (activeBtn) {
    activeBtn.classList.add("text-blue-600", "font-bold", "dark:text-blue-400");
    activeBtn.classList.remove("text-gray-500", "dark:text-gray-400");
  }

  // 重置搜索状态
  const filterStatus = document.getElementById("filter-status");
  const searchInput = document.getElementById("search-input");
  if (filterStatus) filterStatus.classList.add("hidden");
  if (searchInput) searchInput.value = "";

  // 获取文章并更新侧边栏统计
  const posts = getAllPosts();
  updateStats(posts);

  // 渲染对应页面
  if (page === "home") renderHome(posts);
  else if (page === "archive") renderArchive(posts);
  else if (page === "write") renderWritePage();
  else if (page === "about") renderAbout();
}
