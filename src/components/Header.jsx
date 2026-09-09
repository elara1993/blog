import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import './Header.css'

export default function Header() {
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`)
    }
  }

  return (
    <header className="header">
      <div className="container">
        <div className="header-inner">
          <Link to="/" className="logo">胖虎日记</Link>
          <nav className="nav">
            <Link to="/">首页</Link>
            <Link to="/about">关于</Link>
            <form onSubmit={handleSearch} className="search-form">
              <input
                type="text"
                placeholder="搜索..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
            </form>
          </nav>
        </div>
      </div>
    </header>
  )
}
