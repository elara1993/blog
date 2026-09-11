import { useParams, Link } from 'react-router-dom'
import { getPostsByCategory } from '../utils/posts'
import './Category.css'

export default function Category() {
  const { name } = useParams()
  const sortedPosts = getPostsByCategory(name)

  return (
    <div className="container">
      <div className="category-page">
        <div className="category-header">
          <div className="post-breadcrumb">
            <Link to="/">首页</Link>
            <span className="separator">/</span>
            <span className="post-category-label">{name}</span>
          </div>
          <h1 className="category-name">{name}</h1>
          <span className="category-count">{sortedPosts.length} 篇文章</span>
        </div>

        <div className="post-list">
          {sortedPosts.map(post => (
            <Link to={`/post/${post.slug}`} key={post.id} className="post-item">
              <div className="post-content">
                <div className="post-meta">
                  <span className="post-date">{post.date}</span>
                  <span className="post-category">{post.category}</span>
                </div>
                <h2 className="post-title">{post.title}</h2>
                <p className="post-excerpt">{post.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>

        {sortedPosts.length === 0 && (
          <div className="empty">该分类下暂无文章</div>
        )}

        <Link to="/" className="back-link">← 返回首页</Link>
      </div>
    </div>
  )
}
