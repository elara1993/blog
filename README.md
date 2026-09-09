# 胖虎日记 - 个人博客

极简风格的个人博客，基于 React + Vite 构建。

## 功能

- 文章列表（首页）
- 文章详情
- 关于我页面
- 分类浏览
- 搜索功能
- 极简暖白米色设计

## 技术栈

- React 18
- Vite 5
- React Router DOM 6
- JSON 数据管理

## 开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建
npm run build

# 预览构建结果
npm run preview
```

## 部署到 GitHub Pages

```bash
# 部署
npm run deploy
```

部署前需要修改：
1. `package.json` 中的 `homepage` 字段
2. `scripts/generate-sitemap.js` 中的实际 GitHub Pages 域名

## 添加新文章

编辑 `src/data/posts.json`，按照现有格式添加新文章。

## 自定义内容

- 文章数据：`src/data/posts.json`
- 关于信息：`src/data/about.json`
- 标签数据：`src/data/tags.json`
