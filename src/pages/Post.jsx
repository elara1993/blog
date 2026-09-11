import { useParams, Link } from 'react-router-dom'
import { getPostBySlug } from '../utils/posts'
import './Post.css'

// 模拟文章配图（使用随机图片）
const getRandomImage = (seed) => {
  return `https://images.unsplash.com/photo-${seed}?w=1200&h=600&fit=crop`
}

export default function Post() {
  const { slug } = useParams()
  const post = getPostBySlug(slug)

  if (!post) {
    return (
      <div className="not-found">
        <p>文章不存在</p>
        <Link to="/">返回首页</Link>
      </div>
    )
  }

  // 生成目录（根据标题段落）
  const paragraphs = post.content.split('\n\n')
  const tocItems = paragraphs
    .filter(p => p.startsWith('#'))
    .map((p, i) => ({
      id: `section-${i}`,
      title: p.replace(/^#+\s*/, ''),
      level: p.match(/^#+/)?.[0].length || 1
    }))

  // 获取相关文章（同分类，排除当前）
  const allPosts = [getPostBySlug(slug), ...[]] // 简化处理
  const relatedPosts = allPosts
    .filter(p => p.category === post.category && p.id !== post.id)
    .slice(0, 3)

  return (
    <div className="container">
      <div className="post-layout">
        {/* Main Content */}
        <main className="post-main">
          <article className="post">
            <header className="post-header">
              <div className="post-breadcrumb">
                <Link to="/">首页</Link>
                <span className="separator">/</span>
                <Link to={`/category/${post.category}`} className="post-category-label">
                  {post.category}
                </Link>
              </div>
              <h1 className="post-title">{post.title}</h1>
              <div className="post-meta">
                <span className="post-date">{post.date}</span>
                <span className="dot"></span>
                <span className="reading-time">{post.readingTime} min read</span>
              </div>
            </header>

            {/* 文章配图 */}
            <div className="post-featured-image">
              <img src={getRandomImage(post.title)} alt={post.title} />
            </div>

            <div className="post-content">
              {post.content.split('\n\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            <footer className="post-footer">
              <div className="post-tags">
                {post.tags.map(tag => (
                  <Link to={`/search?q=${tag}`} key={tag} className="post-tag">
                    #{tag}
                  </Link>
                ))}
              </div>
              <Link to="/" className="back-link">← 返回首页</Link>
            </footer>
          </article>
        </main>

        {/* Sidebar */}
        <aside className="sidebar">
          {/* Table of Contents */}
          {tocItems.length > 0 && (
            <div className="sidebar-section">
              <h3 className="sidebar-title">目录</h3>
              <ul className="toc-list">
                {tocItems.map((item, index) => (
                  <li key={index}>
                    <a href={`#section-${index}`}>{item.title}</a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Author Card */}
          <div className="sidebar-section">
            <div className="author-card">
              <div className="author-avatar">
                <img src="https://api.dicebear.com/7.x/initials/svg?seed=PH&backgroundColor=e8d5c4" alt="作者" />
              </div>
              <div className="author-info">
                <h4>MORI</h4>
                <p>写字的人，也是生活的观察者。</p>
                <Link to="/about" className="about-link">关于我 →</Link>
                <div className="author-social">
                  <a href="https://weibo.com" title="微博">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M10.098 20.323c-3.97.427-7.414-1.406-7.672-4.086-.259-2.681 2.746-5.175 6.715-5.603 3.97-.427 7.414 1.407 7.672 4.087.259 2.68-2.746 5.175-6.715 5.602zM9.05 17.51c-2.046.342-4.003-.656-4.37-2.165-.367-1.51.793-2.968 2.84-3.314 2.046-.345 4.003.656 4.37 2.165.367 1.51-.793 2.968-2.84 3.314zm1.096-2.243c-.637.113-1.248-.283-1.366-.883-.117-.599.296-1.186.933-1.3.638-.112 1.248.284 1.366.883.117.599-.296 1.186-.933 1.3zm1.078-1.725c-.225.043-.396-.113-.381-.346.015-.233.195-.405.423-.449.225-.043.396.113.381.346-.015.233-.195.405-.423.449zM20.645 7.84c-.835-1.894-2.887-3.005-4.976-3.078-.33-.009-.656.016-.972.074-.152-1.447-1.137-2.673-2.537-3.036-.207-.049-.383-.049-.523.016-.14.065-.252.206-.324.407-.293.808-.978 1.406-1.834 1.607-.147.035-.286.093-.413.172-.625-.524-1.458-.845-2.37-.845-1.728 0-3.127 1.398-3.127 3.127 0.0.16.012.317.036.471C2.586 8.744 1.5 10.244 1.5 12c0 2.063 2.308 3.738 5.156 3.738.273 0 .541-.016.806-.047.586 1.176 1.78 1.985 3.162 1.985 1.96 0 3.555-1.595 3.555-3.555 0-.222-.02-.44-.06-.652 1.22-.466 2.066-1.56 2.066-2.856 0-1.598-1.296-2.894-2.894-2.894-.192 0-.38.015-.564.044z"/></svg>
                  </a>
                  <a href="https://twitter.com" title="Twitter">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
                  </a>
                  <a href="mailto:hello@panghu.blog" title="邮件">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
