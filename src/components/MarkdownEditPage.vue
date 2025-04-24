<script setup>
import { ref, onMounted, computed } from "vue";

defineProps({
  msg: String,
});

// 使用 localStorage 存储编辑器内容
const text = ref(`
<h1 align="center">基于Web的Markdown协作编辑器</h1>
<p align="center">
  <a href="https://npmcharts.com/compare/@kangc/v-md-editor?minimal=true"><img src="https://img.shields.io/npm/dm/@kangc/v-md-editor.svg?sanitize=true" alt="Downloads"></a>
  <a href="https://www.npmjs.com/package/@kangc/v-md-editor"><img src="https://img.shields.io/npm/v/@kangc/v-md-editor.svg?sanitize=true" alt="Version"></a>
  <a href="https://www.npmjs.com/package/@kangc/v-md-editor"><img src="https://img.shields.io/npm/l/@kangc/v-md-editor.svg?sanitize=true" alt="License"></a>
</p>

## Markdown 语言 😊

Markdown 是一种轻量级标记语言，创始人为约翰·格鲁伯（John Gruber）。它允许人们使用易读易写的纯文本格式编写文档，然后转换成有效的 HTML 文档。Markdown 语法简洁明了，适合书写各种技术文档、笔记、博客等。
![Description](https://camo.githubusercontent.com/a55b5f9d5b808391587d75dd0c59139e1f588aacd48397a49976528cefb65ba5/68747470733a2f2f636172676f2e64757374696e6375727469732e636f6d2f70726f6a656374732f6d61726b646f776e2f6d61726b646f776e2d6d61726b2d6865616465722d757064617465642d323032312e706e673f36)

## 安装 🗳
\`\`\`bash
# use npm
npm i @kangc/v-md-editor -S

# use yarn
yarn add @kangc/v-md-editor

# use pnpm
pnpm add @kangc/v-md-editor
\`\`\`

## Katex
$$\sum_{i=1}^n a_i=0$$

$$\int_{a}^{b} f(x) dx = F(b) - F(a)$$

## Mermaid
\`\`\`mermaid
graph TD
    A[Markdown 编辑器] --> B[编辑模块]
    A --> C[预览模块]
    A --> D[协作模块]
    A --> E[存储模块]
    A --> F[实时同步模块]

    B --> G[Markdown 语法解析]
    B --> H[内容编辑器（如v-md-editor）]
    C --> I[实时预览]
    D --> J[协作同步]
    D --> K[用户光标指示]
    E --> L[浏览器存储（localStorage/IndexedDB）]
    F --> M[WebRTC/P2P]
    F --> N[实时同步库（如Yjs）]
\`\`\`

## Usege
\`\`\`html
<template>
  <v-md-editor v-model="text" height="400px"></v-md-editor>
</template>
\`\`\`
\`\`\`css
:root {
  /* font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif; */
  line-height: 1.5;
  font-weight: 400;
  color-scheme: light dark;
  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
\`\`\`
\`\`\`js
import Vue from 'vue';
import VueMarkdownEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
VueMarkdownEditor.use(vuepressTheme);
Vue.use(VueMarkdownEditor);
\`\`\`
## TodoList
- [x] Todolist
- [ ] Todolist
## 示例
::: tip
你可以点击 toolbar 中的 tip 来快速插入
:::

::: warning
这是一段警告
:::

::: danger
这是一个危险警告
:::

::: details
这是一个详情块，在 IE / Edge 中不生效
:::

::: tip 自定义标题
你也可以自定义块中的标题
:::

::: danger STOP
危险区域，禁止通行
:::



`);

// 主题切换
const theme = ref(localStorage.getItem("theme") || "light");

const updateBodyTheme = (newTheme) => {
  if (newTheme === "dark") {
    document.body.classList.add("dark");
    document.body.classList.remove("light");
  } else {
    document.body.classList.add("light");
    document.body.classList.remove("dark");
  }
};

const toggleTheme = () => {
  theme.value = theme.value === "light" ? "dark" : "light";
  localStorage.setItem("theme", theme.value);
  console.log(theme.value);
  updateBodyTheme(theme.value);
};

onMounted(() => {
  updateBodyTheme(theme.value);
});

// Logo
const logoStyle = computed(() => {
  return {
    filter: theme.value === "dark" ? "invert(1)" : "none",
  };
});
</script>

<template>
  <span title="主题切换" id="themeSwitchBtn" @click="toggleTheme">
    {{ theme === "light" ? "🌞" : "🌒" }}
  </span>
  <a
    title="yaozongbin0828@v3-markdown-editor"
    :style="logoStyle"
    id="logo"
    class="fade-effect"
    href="https://github.com/Yaozongbin0828/v3-markdown-editor"
    target="_blank"
  >
    <img src="@/assets/github.svg" alt="Github" />
  </a>
  <div id="app">
    <h1 id="title">Vue3 Web Markdown Editor</h1>
    <v-md-editor v-model="text" height="600px"></v-md-editor>
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}

</style>
