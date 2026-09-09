import { useSearchParams, Link } from 'react-router-dom'
import posts from '../data/posts.json'
import './Search.css'

export default function Search() {
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q') || ''
  
  const results = query.trim()
    ? posts.filter(p => 
        p.title.toLowerCase().includes(query.toLowerCase()) ||
        p.content.toLowerCase().includes(query.toLowerCase()) ||
        p.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
      )
    : []

  const sortedResults = [...results].sort((a, b) => new Date(b.date) - new Date(a.date))

  return (
    <div className="search">
      <div className="search-header">
        <h1 className="search-title">
          {query ? `搜索"${query}"的结果` : '搜索文章'}
        </h1>
      </div>
      {query && (
        <p className="search-result-count">
          找到 {sortedResults.length} 篇文章
        </p>
      )}
      <div className="post-list">
        {sortedResults.map(post => (
          <article key={post.id} className="post-card">
            <Link to={`/post/${post.slug}`} className="post-link">
              <div className="post-meta">
                <span className="post-date">{post.date}</span>
                <span className="post-category">{post.category}</span>
              </div>
              <h2 className="post-title">{post.title}</h2>
              <p className="post-excerpt">{post.excerpt}</p>
              <div className="post-tags">
                {post.tags.map(tag => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>
            </Link>
          </article>
        ))}
      </div>
      {query && sortedResults.length === 0 && (
        <p className="empty">没有找到相关文章</p>
      )}
      <Link to="/" className="back-link">← 返回首页</Link>
    </div>
  )
}
