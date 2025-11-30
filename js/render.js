import { getAllPosts, deletePostFromStorage } from "./data.js";

// 渲染首页
export function renderHome(posts) {
  const container = document.getElementById("main-container");

  // 页面标题
  const pageTitle = `
    <div class="flex items-center justify-between mb-6 border-b border-gray-200 dark:border-gray-700 pb-4">
        <h3 class="text-xl font-bold text-gray-800 dark:text-white flex items-center">
            <i class="far fa-newspaper mr-2 text-blue-500"></i> 最新文章
        </h3>
        <span class="text-sm text-gray-500 dark:text-gray-400">共 ${posts.length} 篇</span>
    </div>
  `;

  // 空状态处理
  if (posts.length === 0) {
    container.innerHTML =
      pageTitle +
      `<div class="text-center py-20 text-gray-500 dark:text-gray-400 bg-white dark:bg-dark-card rounded-lg border border-gray-100 dark:border-gray-700">还没有文章，快去写一篇吧！</div>`;
    renderSidebarTags(posts);
    return;
  }

  // 生成文章列表
  let listHtml = "";
  posts.forEach((post) => {
    listHtml += `
          <article class="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition cursor-pointer fade-in group dark:bg-dark-card dark:border-dark-border relative mb-6" onclick="renderPost(${
            post.id
          })">
              ${
                post.cover
                  ? `<div class="h-48 w-full bg-cover bg-center rounded-lg mb-4" style="background-image: url('${post.cover}')"></div>`
                  : ""
              }
              <div class="flex items-center gap-2 text-xs text-gray-500 mb-3 dark:text-gray-400">
                  <span><i class="far fa-calendar-alt mr-1"></i> ${
                    post.date
                  }</span>
                  <span class="text-gray-300 dark:text-gray-600">|</span>
                  ${post.tags
                    .map(
                      (tag) =>
                        `<span class="text-blue-600 font-medium dark:text-blue-400 hover:underline" onclick="event.stopPropagation(); filterByTag('${tag}')">#${tag}</span>`
                    )
                    .join(" ")}
              </div>
              <h2 class="text-2xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition dark:text-white dark:group-hover:text-blue-400 pr-10">${
                post.title
              }</h2>
              <p class="text-gray-600 leading-relaxed mb-4 dark:text-gray-300 line-clamp-2">${
                post.summary
              }</p>
              <div class="flex justify-between items-center">
                  <div class="text-blue-600 font-medium text-sm flex items-center group-hover:translate-x-1 transition-transform dark:text-blue-400">阅读全文 <i class="fas fa-arrow-right ml-2 text-xs"></i></div>
                  <button onclick="deletePost(${
                    post.id
                  }, event)" class="text-gray-400 hover:text-red-500 transition px-2 py-1 rounded hover:bg-red-50 dark:hover:bg-red-900/20" title="删除文章"><i class="fas fa-trash-alt"></i> 删除</button>
              </div>
          </article>`;
  });

  // 最终组装：标题 + 列表
  container.innerHTML = pageTitle + listHtml;

  // 滚动到顶部并刷新侧边栏
  window.scrollTo(0, 0);
  renderSidebarTags(posts);
}

// 渲染列表（搜索/筛选）
export function renderList(data) {
  const container = document.getElementById("main-container");
  if (data.length === 0) {
    container.innerHTML = `<div class="text-center py-20 text-gray-500 dark:text-gray-400 bg-white dark:bg-dark-card rounded-lg">没有找到相关文章 ¯\\_(ツ)_/¯</div>`;
    return;
  }
  let html = "";
  data.forEach((post) => {
    html += `
          <article class="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition cursor-pointer fade-in group dark:bg-dark-card dark:border-dark-border relative mb-6" onclick="renderPost(${
            post.id
          })">
              ${
                post.cover
                  ? `<div class="h-48 w-full bg-cover bg-center rounded-lg mb-4" style="background-image: url('${post.cover}')"></div>`
                  : ""
              }
              <div class="flex items-center gap-2 text-xs text-gray-500 mb-3 dark:text-gray-400">
                  <span><i class="far fa-calendar-alt mr-1"></i> ${
                    post.date
                  }</span>
                  <span class="text-gray-300 dark:text-gray-600">|</span>
                  ${post.tags
                    .map(
                      (tag) =>
                        `<span class="text-blue-600 font-medium dark:text-blue-400 hover:underline" onclick="event.stopPropagation(); filterByTag('${tag}')">#${tag}</span>`
                    )
                    .join(" ")}
              </div>
              <h2 class="text-2xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition dark:text-white dark:group-hover:text-blue-400 pr-10">${
                post.title
              }</h2>
              <p class="text-gray-600 leading-relaxed mb-4 dark:text-gray-300 line-clamp-2">${
                post.summary
              }</p>
              <div class="flex justify-between items-center">
                  <div class="text-blue-600 font-medium text-sm flex items-center group-hover:translate-x-1 transition-transform dark:text-blue-400">阅读全文 <i class="fas fa-arrow-right ml-2 text-xs"></i></div>
                  <button onclick="deletePost(${
                    post.id
                  }, event)" class="text-gray-400 hover:text-red-500 transition px-2 py-1 rounded hover:bg-red-50 dark:hover:bg-red-900/20" title="删除文章"><i class="fas fa-trash-alt"></i> 删除</button>
              </div>
          </article>`;
  });
  container.innerHTML = html;
  window.scrollTo(0, 0);
}

// 渲染详情页
export function renderPost(id) {
  const posts = getAllPosts();
  const post = posts.find((p) => p.id === id);
  if (!post) return;
  const container = document.getElementById("main-container");
  const contentHTML = marked.parse(post.content);

  container.innerHTML = `
      <div class="bg-white p-8 rounded-lg shadow-sm border border-gray-100 fade-in dark:bg-dark-card dark:border-dark-border">
          <button onclick="navigateTo('home')" class="text-sm text-gray-500 hover:text-blue-600 mb-6 flex items-center transition dark:text-gray-400 dark:hover:text-blue-400">
              <i class="fas fa-arrow-left mr-2"></i> 返回列表
          </button>
          <header class="mb-8 border-b border-gray-100 pb-8 dark:border-gray-700">
              ${
                post.cover
                  ? `<div class="h-64 w-full bg-cover bg-center rounded-lg mb-6 shadow-md" style="background-image: url('${post.cover}')"></div>`
                  : ""
              }
              <h1 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4 dark:text-white">${
                post.title
              }</h1>
              <div class="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                  <span><i class="far fa-calendar-alt mr-1"></i> ${
                    post.date
                  }</span>
                  <div class="flex gap-2">
                       ${post.tags
                         .map(
                           (tag) =>
                             `<span class="bg-gray-100 px-2 py-0.5 rounded text-gray-600 dark:bg-gray-800 dark:text-gray-300">#${tag}</span>`
                         )
                         .join("")}
                  </div>
              </div>
          </header>
          <article class="prose prose-blue max-w-none prose-img:rounded-lg dark:prose-invert">
              ${contentHTML}
          </article>
      </div>`;
  window.scrollTo(0, 0);
  hljs.highlightAll();
}

// 渲染归档页
export function renderArchive(posts) {
  const container = document.getElementById("main-container");
  const groups = {};
  posts.forEach((post) => {
    const year = post.date.split("-")[0];
    if (!groups[year]) groups[year] = [];
    groups[year].push(post);
  });

  let html = `<div class="bg-white p-8 rounded-lg shadow-sm border border-gray-100 fade-in dark:bg-dark-card dark:border-dark-border">
          <h1 class="text-3xl font-bold mb-8 dark:text-white border-b pb-4 border-gray-100 dark:border-gray-700">归档时光机</h1>
          <div class="relative border-l-2 border-gray-200 dark:border-gray-700 ml-3 space-y-8">`;

  Object.keys(groups)
    .sort()
    .reverse()
    .forEach((year) => {
      html += `
          <div class="mb-8">
              <span class="absolute -left-[9px] bg-blue-600 w-4 h-4 rounded-full border-4 border-white dark:border-dark-card"></span>
              <h2 class="ml-6 text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">${year}</h2>
              <div class="ml-6 space-y-3">`;
      groups[year].forEach((post) => {
        html += `
              <div class="group flex items-center justify-between cursor-pointer p-3 rounded hover:bg-gray-50 dark:hover:bg-gray-800 transition" onclick="renderPost(${
                post.id
              })">
                  <span class="text-gray-700 font-medium group-hover:text-blue-600 dark:text-gray-300 dark:group-hover:text-blue-400 transition">${
                    post.title
                  }</span>
                  <span class="text-sm text-gray-400 font-mono">${post.date.substring(
                    5
                  )}</span>
              </div>`;
      });
      html += `</div></div>`;
    });
  html += `</div></div>`;
  container.innerHTML = html;
}

// 渲染写作页
export function renderWritePage() {
  const container = document.getElementById("main-container");
  const today = new Date().toISOString().split("T")[0];

  container.innerHTML = `
      <div class="bg-white p-8 rounded-lg shadow-sm border border-gray-100 fade-in dark:bg-dark-card dark:border-dark-border">
          <h1 class="text-2xl font-bold mb-6 dark:text-white"><i class="fas fa-pen-nib mr-2"></i>写新文章</h1>
          <div class="space-y-4">
              <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">文章封面 (可选)</label>
                  <div class="flex items-center gap-4">
                      <input type="file" id="post-image-file" accept="image/*" onchange="handleImageUpload(this)" class="hidden">
                      <label for="post-image-file" class="cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-600 px-4 py-2 rounded-lg transition dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-300 text-sm"><i class="fas fa-image mr-1"></i> 选择图片</label>
                      <span id="image-file-name" class="text-xs text-gray-400">未选择文件</span>
                  </div>
                  <input type="hidden" id="post-cover-base64">
                  <img id="image-preview" class="mt-3 w-full h-48 object-cover rounded-lg hidden border border-gray-200">
              </div>
              <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">文章标题</label>
                  <input type="text" id="post-title" class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none dark:bg-gray-800 dark:border-gray-700 dark:text-white" placeholder="输入引人注目的标题">
              </div>
              <div class="grid grid-cols-2 gap-4">
                  <div>
                      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">标签 (用逗号分隔)</label>
                      <input type="text" id="post-tags" class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none dark:bg-gray-800 dark:border-gray-700 dark:text-white" placeholder="例如: Web, CSS">
                  </div>
                  <div>
                      <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">日期</label>
                      <input type="date" id="post-date" value="${today}" class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none dark:bg-gray-800 dark:border-gray-700 dark:text-white">
                  </div>
              </div>
              <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">简介</label>
                  <input type="text" id="post-summary" class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none dark:bg-gray-800 dark:border-gray-700 dark:text-white" placeholder="一句话概括文章内容">
              </div>
              <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">内容 (Markdown)</label>
                  <textarea id="post-content" rows="10" class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none font-mono dark:bg-gray-800 dark:border-gray-700 dark:text-white" placeholder="# 开始写作...\n\n你可以使用 Markdown 语法。"></textarea>
              </div>
              <div class="flex justify-end gap-4 pt-4">
                  <button onclick="navigateTo('home')" class="px-6 py-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 transition">取消</button>
                  <button onclick="savePost()" class="px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 shadow-md transition">发布文章</button>
              </div>
          </div>
      </div>`;
}

// 渲染关于页
export function renderAbout() {
  const container = document.getElementById("main-container");
  container.innerHTML = `
      <div class="bg-white p-8 rounded-lg shadow-sm border border-gray-100 fade-in dark:bg-dark-card dark:border-dark-border">
          <div class="text-center mb-10">
              <img src="https://api.dicebear.com/9.x/notionists/svg?seed=Felix" class="w-32 h-32 rounded-full mx-auto mb-6 border-4 border-blue-50 dark:border-gray-700">
              <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">关于 Me</h1>
              <div class="flex justify-center gap-2 mb-6">
               <span class="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm dark:bg-blue-900/30 dark:text-blue-400">软件工程</span>
               <span class="bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-sm dark:bg-purple-900/30 dark:text-purple-400">大三</span>
               <span class="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm dark:bg-green-900/30 dark:text-green-400">CSUST</span>
              </div>
          </div>
          <div class="prose prose-blue max-w-none dark:prose-invert">
              
              <h3>我使用的技术栈</h3>
              <ul><li>HTML5 / CSS3 / JavaScript (ES6+)</li><li>Tailwind CSS (样式原子化)</li></ul>
              <h3>联系我</h3>
              <p>如果你对我的项目感兴趣，欢迎联系我：</p>
              <ul><li>Email: <a href="mailto:example@email.com">example@email.com</a></li><li>GitHub: <a href="https://github.com">@Me</a></li></ul>
              <blockquote><p>Stay hungry, stay foolish.</p></blockquote>
          </div>
      </div>`;
  window.scrollTo(0, 0);
}

// 渲染侧边栏标签
export function renderSidebarTags(posts) {
  const container = document.getElementById("tag-cloud");
  const uniqueTags = [...new Set(posts.flatMap((p) => p.tags))];
  let html = "";
  uniqueTags.forEach((tag) => {
    html += `<span onclick="filterByTag('${tag}')" class="px-3 py-1 bg-blue-50 text-blue-600 text-xs rounded-full cursor-pointer hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400 transition mb-2 mr-2 inline-block">${tag}</span>`;
  });
  container.innerHTML = html;
}
