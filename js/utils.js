// js/utils.js

// 更新侧边栏统计
export function updateStats(posts) {
  const articleCount = posts.length;
  const uniqueTags = new Set(posts.flatMap((p) => p.tags));
  const tagCount = uniqueTags.size;

  const articleEl = document.getElementById("stat-article-count");
  const tagEl = document.getElementById("stat-tag-count");

  if (articleEl) articleEl.innerText = articleCount;
  if (tagEl) tagEl.innerText = tagCount;
}

// 切换主题
export function toggleTheme() {
  const html = document.documentElement;
  const icon = document.getElementById("theme-icon");

  if (html.classList.contains("dark")) {
    html.classList.remove("dark");
    icon.classList.replace("fa-sun", "fa-moon");
    localStorage.setItem("theme", "light");
  } else {
    html.classList.add("dark");
    icon.classList.replace("fa-moon", "fa-sun");
    localStorage.setItem("theme", "dark");
  }
}

// 导出文章数据
export function exportData() {
  const data = localStorage.getItem("my_blog_posts");
  if (!data || data === "[]") {
    alert("还没有文章可备份");
    return;
  }
  const blob = new Blob([data], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  const date = new Date().toISOString().split("T")[0];
  a.download = `blog-backup-${date}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// 导入文章数据
export function importData(input) {
  const file = input.files[0];
  if (!file) return;

  if (!confirm("恢复备份会覆盖当前所有文章！\n确定继续吗？")) {
    input.value = "";
    return;
  }

  const reader = new FileReader();
  reader.onload = function (e) {
    try {
      const json = e.target.result;
      const posts = JSON.parse(json);
      if (
        !Array.isArray(posts) ||
        (posts.length > 0 && (!posts[0].id || !posts[0].title))
      ) {
        throw new Error("格式错误");
      }
      localStorage.setItem("my_blog_posts", json);
      alert(`成功恢复 ${posts.length} 篇文章，页面即将刷新。`);
      location.reload();
    } catch (err) {
      alert("导入失败，文件格式不正确。");
      console.error(err);
    }
  };
  reader.readAsText(file);
}

// 图片上传并转换 Base64
export function handleImageUpload(input) {
  const file = input.files[0];
  if (!file) return;

  if (file.size > 2 * 1024 * 1024) {
    alert("图片太大，请上传 2MB 以内。");
    input.value = "";
    return;
  }

  const reader = new FileReader();
  reader.onload = function (e) {
    const base64String = e.target.result;
    const preview = document.getElementById("image-preview");
    if (preview) {
      preview.src = base64String;
      preview.classList.remove("hidden");
    }
    const hiddenInput = document.getElementById("post-cover-base64");
    if (hiddenInput) hiddenInput.value = base64String;

    const fileName = document.getElementById("image-file-name");
    if (fileName) fileName.innerText = file.name;
  };
  reader.readAsDataURL(file);
}
