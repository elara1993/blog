import { useParams, Link } from 'react-router-dom'
import posts from '../data/posts.json'
import './Post.css'

export default function Post() {
  const { slug } = useParams()
  const post = posts.find(p => p.slug === slug)

  if (!post) {
    return (
      <div className="not-found">
        <p>文章不存在</p>
        <Link to="/">返回首页</Link>
      </div>
    )
  }

  return (
    <article className="post">
      <header className="post-header">
        <div className="post-meta">
          <span className="post-date">{post.date}</span>
          <span className="post-category">{post.category}</span>
          <span className="reading-time">{post.readingTime} 分钟阅读</span>
        </div>
        <h1 className="post-title">{post.title}</h1>
      </header>
      <div className="post-content">
        {post.content.split('\n\n').map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
      <footer className="post-footer">
        <div className="post-tags">
          {post.tags.map(tag => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>
        <Link to="/" className="back-link">← 返回首页</Link>
      </footer>
    </article>
  )
}
