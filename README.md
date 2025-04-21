## v3-markdown-editor

基于vue3的Markdown协作编辑器的设计与实现

## 特性

* **Vue3**：采用 Vue3 + script setup 最新的 Vue3 组合式 API
* **Vite**：现代前端构建工具，真的很快
* **v-md-editor**：基于 Vue 3 的 Markdown 编辑器
* **ESlint**：代码校验
* **Prettier**：代码格式化

## 项目结构

```bash
.
├── README.md
├── index.html
├── node_modules
│   ├── @kangc
│   │   └── v-md-editor
│   ├── @vitejs
│   │   └── plugin-vue
│   ├── prismjs
│   │   ├── CHANGELOG.md
│   │   ├── LICENSE
│   │   ├── README.md
│   │   ├── components
│   │   ├── components.js
│   │   ├── components.json
│   │   ├── dependencies.js
│   │   ├── package.json
│   │   ├── plugins
│   │   ├── prism.js
│   │   └── themes
│   ├── vite
│   │   ├── LICENSE.md
│   │   ├── README.md
│   │   ├── bin
│   │   ├── client.d.ts
│   │   ├── dist
│   │   ├── index.cjs
│   │   ├── index.d.cts
│   │   ├── node_modules
│   │   ├── package.json
│   │   └── types
│   └── vue
│       ├── LICENSE
│       ├── README.md
│       ├── compiler-sfc
│       ├── dist
│       ├── index.js
│       ├── index.mjs
│       ├── jsx-runtime
│       ├── jsx.d.ts
│       ├── package.json
│       └── server-renderer
├── package.json
├── pnpm-lock.yaml
├── public
│   └── vite.svg
├── src
│   ├── App.vue
│   ├── assets
│   │   └── vue.svg
│   ├── components
│   │   └── MarkdownEditPage.vue
│   ├── main.js
│   └── style.css
└── vite.config.js

```

## 项目启动

```bash
# 配置
1.node版本 16+
2.pnpm 版本 8.x

# 克隆项目
git clone https://github.com/Yaozongbin0828/v3-markdown-editor.git

# 进入项目目录
cd v3-markdown-editor

# 安装依赖
npm i 或者 pnpm i(推荐)

# 启动服务
npm run dev 或者 pnpm dev

```

## License

Copyright (c) 2024-present [Yaozongbin0828](https://github.com/Yaozongbin0828)
