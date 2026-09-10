import { Link } from 'react-router-dom'
import posts from '../data/posts.json'
import './Home.css'

// 模拟文章配图（实际项目中可以从 posts.json 添加 image 字段）
const postImages = {
  'hello-world': 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=600&h=400&fit=crop',
  'why-minimal-blog': 'https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?w=600&h=400&fit=crop',
  'learning-react': 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=400&fit=crop'
}

export default function Home() {
  const sortedPosts = [...posts].sort((a, b) => new Date(b.date) - new Date(a.date))
  const featuredPost = sortedPosts[0]
  const recentPosts = sortedPosts.slice(1, 4)
  const allTags = [...new Set(posts.flatMap(p => p.tags))]

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="container-narrow">
          <h1 className="hero-title">把日子过成一篇长文</h1>
          <p className="hero-subtitle">
            记录思考、实践与日常，分享那些让生活变得更辽阔的微小瞬间。
          </p>
          <div className="hero-cta">
            <Link to={`/post/${featuredPost?.slug}`} className="read-more-link">
              阅读最新文章 →
            </Link>
          </div>
        </div>
      </section>

      <div className="container">
        {/* Featured Post */}
        {featuredPost && (
          <Link to={`/post/${featuredPost.slug}`} className="featured-link">
            <div className="featured">
              <div className="featured-content">
                <span className="featured-badge">置顶</span>
                <h2 className="featured-title">{featuredPost.title}</h2>
                <p className="featured-excerpt">{featuredPost.excerpt}</p>
                <div className="featured-meta">
                  <span>{featuredPost.readingTime} 分钟阅读</span>
                </div>
              </div>
              <div className="featured-image">
                <img src={postImages[featuredPost.slug]} alt={featuredPost.title} />
              </div>
            </div>
          </Link>
        )}

        {/* Recent Posts */}
        <div className="section-header">
          <h2 className="section-title">最新文章</h2>
          <Link to="/posts" className="section-link">查看全部 →</Link>
        </div>
        
        <div className="post-list">
          {recentPosts.map(post => (
            <Link to={`/post/${post.slug}`} key={post.id} className="post-item">
              <div className="post-thumb">
                <img src={postImages[post.slug]} alt={post.title} />
              </div>
              <div className="post-content">
                <h3 className="post-title">{post.title}</h3>
                <p className="post-excerpt">{post.excerpt}</p>
                <div className="post-meta">
                  <span className="post-date">{post.date}</span>
                  <span className="post-category">{post.category}</span>
                  <span className="reading-time">{post.readingTime} 分钟阅读</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Tags */}
        <div className="tags-section">
          <div className="section-header">
            <h2 className="section-title">热门标签</h2>
            <Link to="/tags" className="section-link">浏览更多 →</Link>
          </div>
          <div className="tags-cloud">
            {allTags.map(tag => (
              <Link to={`/search?q=${tag}`} key={tag} className="tag">
                #{tag}
              </Link>
            ))}
          </div>
        </div>

        {/* Subscribe */}
        <div className="subscribe-section">
          <div className="subscribe-text">
            <h3>订阅 MORI 的每周文章</h3>
            <p>每周一封信，分享思考与生活的灵感。</p>
          </div>
          <button className="subscribe-btn">立即订阅</button>
        </div>
      </div>
    </div>
  )
}
