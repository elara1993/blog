import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useState } from 'react'
import './Header.css'

export default function Header() {
  const [searchQuery, setSearchQuery] = useState('')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`)
    }
  }

  const isActive = (path) => location.pathname === path

  return (
    <header className="header">
      <div className="container">
        <div className="header-inner">
          <Link to="/" className="logo">
            MORI
            <span className="logo-sub">文字与生活</span>
          </Link>
          
          <nav className={`nav ${mobileMenuOpen ? 'open' : ''}`}>
            <Link to="/" className={isActive('/') ? 'active' : ''}>首页</Link>
            <Link to="/posts" className={isActive('/posts') ? 'active' : ''}>文章</Link>
            <Link to="/about" className={isActive('/about') ? 'active' : ''}>关于</Link>
            <form onSubmit={handleSearch} className="search-form">
              <input
                type="text"
                placeholder="搜索..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
            </form>
            <Link to="/" className="subscribe-btn">订阅更新</Link>
          </nav>

          <div className="mobile-menu-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    </header>
  )
}
