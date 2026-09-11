import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { addPost } from '../utils/posts'
import './Write.css'

export default function Write() {
  const navigate = useNavigate()
  const fileInputRef = useRef(null)
  const [formData, setFormData] = useState({
    title: '',
    category: '随笔',
    tags: '',
    content: ''
  })
  const [success, setSuccess] = useState(false)
  const [imagePreview, setImagePreview] = useState(null)
  const [imageUrl, setImageUrl] = useState('')
  const [showImageModal, setShowImageModal] = useState(false)

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
    localStorage.removeItem('blog-images')
    setFormData({ title: '', category: '随笔', tags: '', content: '' })
    setImagePreview(null)
    setImageUrl('')
  }

  // 处理图片上传
  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (!file) return

    // 检查文件类型
    if (!file.type.startsWith('image/')) {
      alert('请选择图片文件')
      return
    }

    // 检查文件大小（限制 5MB）
    if (file.size > 5 * 1024 * 1024) {
      alert('图片大小不能超过 5MB')
      return
    }

    const reader = new FileReader()
    reader.onload = (event) => {
      setImagePreview(event.target.result)
      setImageUrl(event.target.result)
    }
    reader.readAsDataURL(file)
  }

  // 插入图片到内容
  const insertImage = () => {
    if (imageUrl) {
      const imgTag = `\n\n![图片描述](${imageUrl})\n\n`
      handleChange({
        target: {
          name: 'content',
          value: formData.content + imgTag
        }
      })
      setImageUrl('')
      setImagePreview(null)
      setShowImageModal(false)
    }
  }

  // 处理图片 URL 输入
  const handleImageUrlChange = (e) => {
    setImageUrl(e.target.value)
    if (e.target.value) {
      setImagePreview(e.target.value)
    }
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
              <div className="form-label-row">
                <label htmlFor="content">内容</label>
                <button
                  type="button"
                  className="btn-insert-image"
                  onClick={() => setShowImageModal(true)}
                >
                  插入图片
                </button>
              </div>
              <textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleChange}
                placeholder="开始你的写作... 可以使用 Markdown 格式，例如：![图片描述](图片URL)"
                className="form-textarea"
                rows={15}
                required
              ></textarea>
              <div className="content-stats">
                <span>{formData.content.length} 字</span>
                <span>·</span>
                <span>约 {Math.max(1, Math.ceil(formData.content.length / 200))} 分钟阅读</span>
              </div>
              <div className="image-hint">
                💡 提示：点击"插入图片"可上传本地图片或粘贴图片 URL
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

        {/* 图片插入模态框 */}
        {showImageModal && (
          <div className="image-modal-overlay" onClick={() => setShowImageModal(false)}>
            <div className="image-modal" onClick={(e) => e.stopPropagation()}>
              <div className="image-modal-header">
                <h3>插入图片</h3>
                <button className="modal-close" onClick={() => setShowImageModal(false)}>×</button>
              </div>
              
              <div className="image-modal-content">
                {/* 上传图片 */}
                <div className="upload-section">
                  <label htmlFor="image-upload" className="upload-label">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                      <polyline points="17 8 12 3 7 8"></polyline>
                      <line x1="12" y1="3" x2="12" y2="15"></line>
                    </svg>
                    <span>上传本地图片</span>
                  </label>
                  <input
                    type="file"
                    id="image-upload"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden-input"
                    ref={fileInputRef}
                  />
                </div>

                {/* 或粘贴 URL */}
                <div className="divider">
                  <span>或</span>
                </div>

                <div className="url-section">
                  <input
                    type="text"
                    placeholder="粘贴图片 URL..."
                    value={imageUrl}
                    onChange={handleImageUrlChange}
                    className="url-input"
                  />
                </div>

                {/* 图片预览 */}
                {imagePreview && (
                  <div className="preview-section">
                    <p className="preview-label">图片预览：</p>
                    <div className="preview-container">
                      <img src={imagePreview} alt="预览" className="preview-image" />
                    </div>
                    <p className="markdown-hint">
                      已插入 Markdown 格式：<code>![图片描述]({imagePreview.substring(0, 50)}...)</code>
                    </p>
                  </div>
                )}
              </div>

              <div className="image-modal-footer">
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => setShowImageModal(false)}
                >
                  取消
                </button>
                <button
                  type="button"
                  className="btn-primary"
                  onClick={insertImage}
                  disabled={!imageUrl}
                >
                  插入图片
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
