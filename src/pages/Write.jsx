import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { addPost } from '../utils/posts'
import './Write.css'

export default function Write() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    title: '',
    category: '随笔',
    tags: '',
    content: ''
  })
  const [success, setSuccess] = useState(false)

  const categories = ['随笔', '技术', '设计', '生活', '阅读']
  const existingTags = ['生活', '记录', '设计', '极简', '博客', 'React', '前端', '学习', '思考', '旅行', '摄影']

  useEffect(() => {
    // 从 localStorage 加载已保存的草稿
    const saved = localStorage.getItem('blog-draft')
    if (saved) {
      setFormData(JSON.parse(saved))
    }
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSaveDraft = () => {
    localStorage.setItem('blog-draft', JSON.stringify(formData))
    alert('草稿已保存！')
  }

  const handleClearDraft = () => {
    localStorage.removeItem('blog-draft')
    setFormData({ title: '', category: '随笔', tags: '', content: '' })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.title.trim() || !formData.content.trim()) {
      alert('请填写标题和内容')
      return
    }

    // 计算阅读时间（每200字约1分钟）
    const readingTime = Math.max(1, Math.ceil(formData.content.length / 200))
    
    // 生成 slug
    const slug = formData.title
      .toLowerCase()
      .replace(/[^\u4e00-\u9fa5a-z0-9]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '')

    // 生成新文章
    const newPost = {
      id: Date.now(),
      title: formData.title,
      slug: slug || `post-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      excerpt: formData.content.substring(0, 100) + (formData.content.length > 100 ? '...' : ''),
      content: formData.content,
      category: formData.category,
      tags: formData.tags ? formData.tags.split(',').map(t => t.trim()).filter(Boolean) : [],
      readingTime: readingTime
    }

    // 保存文章
    addPost(newPost)
    
    // 清除草稿
    localStorage.removeItem('blog-draft')

    setSuccess(true)
    
    // 3秒后跳转到文章页面
    setTimeout(() => {
      navigate(`/post/${newPost.slug}`)
    }, 1500)
  }

  return (
    <div className="container">
      <div className="write-page">
        <div className="write-header">
          <h1 className="write-title">写日志</h1>
          <p className="write-subtitle">记录生活，分享思考</p>
        </div>

        {success ? (
          <div className="write-success">
            <div className="success-icon">✓</div>
            <h2>文章已发布</h2>
            <p>正在跳转到文章页面...</p>
          </div>
        ) : (
          <form className="write-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="title">标题</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="请输入文章标题"
                className="form-input"
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="category">分类</label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="form-select"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="tags">标签</label>
                <input
                  type="text"
                  id="tags"
                  name="tags"
                  value={formData.tags}
                  onChange={handleChange}
                  placeholder="多个标签用逗号分隔"
                  className="form-input"
                />
                <div className="tag-suggestions">
                  {existingTags.slice(0, 6).map(tag => (
                    <button
                      type="button"
                      key={tag}
                      className="tag-suggestion"
                      onClick={() => {
                        const currentTags = formData.tags ? formData.tags.split(',').map(t => t.trim()) : []
                        if (!currentTags.includes(tag)) {
                          handleChange({ target: { name: 'tags', value: currentTags.length ? currentTags.join(',') + ',' + tag : tag } })
                        }
                      }}
                    >
                      #{tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="content">内容</label>
              <textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleChange}
                placeholder="开始你的写作..."
                className="form-textarea"
                rows={15}
                required
              ></textarea>
              <div className="content-stats">
                <span>{formData.content.length} 字</span>
                <span>·</span>
                <span>约 {Math.max(1, Math.ceil(formData.content.length / 200))} 分钟阅读</span>
              </div>
            </div>

            <div className="form-actions">
              <button type="button" className="btn-secondary" onClick={handleSaveDraft}>
                保存草稿
              </button>
              <button type="button" className="btn-text" onClick={handleClearDraft}>
                清空
              </button>
              <button type="submit" className="btn-primary">
                发布文章
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
