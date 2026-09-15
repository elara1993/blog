import { useParams, Link } from 'react-router-dom'
import { getPostBySlug } from '../utils/posts'
import './Post.css'

// 解析 Markdown 内容，渲染图片等元素
function renderContent(content) {
  const paragraphs = content.split('\n\n')
  return paragraphs.map((paragraph, index) => {
    // 处理图片 Markdown: ![alt](url)
    const imgRegex = /!\[([^\]]*)\]\(([^)]+)\)/g
    const parts = []
    let lastIndex = 0
    let match
    
    while ((match = imgRegex.exec(paragraph)) !== null) {
      // 添加图片前的文本
      if (match.index > lastIndex) {
        parts.push(
          <p key={`${index}-${lastIndex}`}>
            {renderInlineMarkdown(paragraph.substring(lastIndex, match.index))}
          </p>
        )
      }
      // 添加图片
      parts.push(
        <div key={`img-${index}-${match.index}`} className="post-image">
          <img src={match[2]} alt={match[1] || '图片'} />
          {match[1] && <p className="image-caption">{match[1]}</p>}
        </div>
      )
      lastIndex = match.index + match[0].length
    }
    
    // 添加剩余文本
    if (lastIndex < paragraph.length) {
      parts.push(
        <p key={`${index}-${lastIndex}`}>
          {renderInlineMarkdown(paragraph.substring(lastIndex))}
        </p>
      )
    }
    
    // 如果没有图片，直接渲染文本
    if (parts.length === 0) {
      return <p key={index}>{renderInlineMarkdown(paragraph)}</p>
    }
    
    return parts
  }).flat()
}

// 渲染行内 Markdown（粗体、斜体、链接等）
function renderInlineMarkdown(text) {
  // 处理链接 [text](url)
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g
  const parts = []
  let lastIndex = 0
  let match
  
  while ((match = linkRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index))
    }
    parts.push(
      <Link to={match[2]} key={`link-${match.index}`} className="inline-link">
        {match[1]}
      </Link>
    )
    lastIndex = match.index + match[0].length
  }
  
  if (lastIndex === 0) return text
  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex))
  }
  
  return parts.length > 0 ? parts : text
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

            <div className="post-content">
              {renderContent(post.content)}
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
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
