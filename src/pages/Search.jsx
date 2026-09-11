import { useSearchParams, Link } from 'react-router-dom'
import { searchPosts } from '../utils/posts'
import './Search.css'

export default function Search() {
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q') || ''
  
  const sortedResults = searchPosts(query)

  return (
    <div className="container">
      <div className="search-page">
        <div className="search-header">
          <h1 className="search-title">
            {query ? `搜索"${query}"的结果` : '搜索文章'}
          </h1>
          {query && (
            <p className="search-result-count">
              找到 {sortedResults.length} 篇文章
            </p>
          )}
        </div>

        <div className="post-list">
          {sortedResults.map(post => (
            <Link to={`/post/${post.slug}`} key={post.id} className="post-item">
              <div className="post-content">
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
              </div>
            </Link>
          ))}
        </div>

        {query && sortedResults.length === 0 && (
          <div className="empty">没有找到相关文章</div>
        )}

        <Link to="/" className="back-link">← 返回首页</Link>
      </div>
    </div>
  )
}
