import posts from './posts.json'

// 从 localStorage 加载用户发布的新文章
export function loadPosts() {
  const saved = localStorage.getItem('blog-posts')
  const localPosts = saved ? JSON.parse(saved) : []
  
  // 合并 posts.json 和 localStorage 中的文章
  // 确保不重复（通过 id 或 slug）
  const existingSlugs = new Set(posts.map(p => p.slug))
  const newPosts = localPosts.filter(p => !existingSlugs.has(p.slug))
  
  return [...posts, ...newPosts]
}

// 获取所有文章（按日期降序）
export function getAllPosts() {
  const allPosts = loadPosts()
  return allPosts.sort((a, b) => new Date(b.date) - new Date(a.date))
}

// 根据 slug 查找文章
export function getPostBySlug(slug) {
  const allPosts = loadPosts()
  return allPosts.find(p => p.slug === slug)
}

// 获取指定分类的文章
export function getPostsByCategory(category) {
  const allPosts = getAllPosts()
  return allPosts.filter(p => p.category === category)
}

// 搜索文章
export function searchPosts(query) {
  const allPosts = getAllPosts()
  if (!query.trim()) return allPosts
  
  const q = query.toLowerCase()
  return allPosts.filter(p => 
    p.title.toLowerCase().includes(q) ||
    p.content.toLowerCase().includes(q) ||
    p.tags.some(tag => tag.toLowerCase().includes(q)) ||
    p.category.toLowerCase().includes(q)
  )
}

// 获取所有标签
export function getAllTags() {
  const allPosts = getAllPosts()
  const tags = new Set()
  allPosts.forEach(p => p.tags.forEach(tag => tags.add(tag)))
  return Array.from(tags)
}

// 添加新文章（保存 localStorage）
export function addPost(post) {
  const saved = localStorage.getItem('blog-posts')
  const localPosts = saved ? JSON.parse(saved) : []
  localPosts.push(post)
  localStorage.setItem('blog-posts', JSON.stringify(localPosts))
  return post
}
