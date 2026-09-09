import { Link } from 'react-router-dom'
import posts from '../data/posts.json'
import './Home.css'

export default function Home() {
  const sortedPosts = [...posts].sort((a, b) => new Date(b.date) - new Date(a.date))

  return (
    <div className="home">
      <div className="section-title">最新文章</div>
      <div className="post-list">
        {sortedPosts.map(post => (
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
    </div>
  )
}
