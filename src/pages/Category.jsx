import { useParams, Link } from 'react-router-dom'
import posts from '../data/posts.json'
import './Category.css'

export default function Category() {
  const { name } = useParams()
  const categoryPosts = posts.filter(p => p.category === name)
  const sortedPosts = [...categoryPosts].sort((a, b) => new Date(b.date) - new Date(a.date))

  return (
    <div className="category">
      <div className="category-header">
        <span className="category-label">分类</span>
        <h1 className="category-name">{name}</h1>
        <span className="category-count">{sortedPosts.length} 篇文章</span>
      </div>
      <div className="post-list">
        {sortedPosts.map(post => (
          <article key={post.id} className="post-card">
            <Link to={`/post/${post.slug}`} className="post-link">
              <div className="post-meta">
                <span className="post-date">{post.date}</span>
              </div>
              <h2 className="post-title">{post.title}</h2>
              <p className="post-excerpt">{post.excerpt}</p>
            </Link>
          </article>
        ))}
      </div>
      {sortedPosts.length === 0 && (
        <p className="empty">该分类下暂无文章</p>
      )}
      <Link to="/" className="back-link">← 返回首页</Link>
    </div>
  )
}
